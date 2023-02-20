import { HttpException, Injectable } from '@nestjs/common';
import { UpdatePartyDto } from './dto/update-party.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from '../entities/Channels';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Parties } from '../entities/Parties';
import { PartyMembers } from '../entities/PartyMembers';
import { Users } from '../entities/Users';
import { PartyChats } from '../entities/PartyChats';
import { NotFoundError } from 'rxjs';
import { EventGateway } from '../event/event.gateway';
import { Party } from './entities/party.entity';

@Injectable()
export class PartysService {
  constructor(
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(ChannelMembers)
    private channelMemberRepository: Repository<ChannelMembers>,
    @InjectRepository(Parties)
    private partiesRepository: Repository<Parties>,
    @InjectRepository(PartyMembers)
    private partyMembersRepository: Repository<PartyMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(PartyChats)
    private partyChatsRepository: Repository<PartyChats>,
    private eventGateWay: EventGateway,
    private dataSource: DataSource,
  ) {}
  async getAllParties(url: string) {
    return await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channel', 'channel', 'channel.url = :url', { url })
      .getMany()
      .then((res) => ({
        code: 200,
        message: '채널 소속 파티를 불러왔습니다',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async postChat({ url, content, name, myId }) {
    const party = await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channel', 'channel', 'channel.url = :url', { url })
      .where('party.name = :name', { name })
      .getOne();
    if (!party) {
      throw new NotFoundError('파티가 존재하지 않습니다');
    }
    await this.dataSource.transaction(async (manager) => {
      const chats = new PartyChats();
      chats.content = content;
      chats.userId = myId;
      chats.partyId = party.id;
      const savedChat = await manager.save(chats);
      const chatWithUser = await manager.findOne(PartyChats, {
        where: { id: savedChat.id },
        relations: ['User', 'Party'],
      });
      this.eventGateWay.server
        .to(`/ws-${url}-${party.id}`)
        .emit('message', chatWithUser);
    });
  }

  async update(url: string, name: string, updatePartyDto: UpdatePartyDto) {
    const party = await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channel', 'channel', 'channel.url = :url', { url })
      .where('party.name = :name', { name })
      .getOne();

    return await this.dataSource.transaction(async (manager) => {
      manager
        .createQueryBuilder(Party, 'party')
        .update(party)
        .set({ name: updatePartyDto.name })
        .execute()
        .then((res) => ({
          code: 200,
          message: '파티 정보를 업데이트 합니다.',
          data: res,
        }))
        .catch((err) => {
          throw new HttpException(err.message, err.status);
        });
    });
  }

  async remove(url: string, name: string) {
    return await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channels', 'Channels', 'Channels.url = :url', { url })
      .where('party.name = :name', { name })
      .delete()
      .execute()
      .then((res) => ({
        code: 200,
        message: '파티 삭제가 성공했습니다',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
  async createChannelParty(url: string, name: string, ownerId: number) {
    const channel = await this.channelsRepository.findOne({
      where: { url },
    });
    const party = new Parties();
    party.name = name;
    party.channelId = channel.id;
    const partyReturned = await this.partiesRepository.save(party);
    const partyMember = new PartyMembers();
    partyMember.userId = ownerId;
    partyMember.partyId = partyReturned.id;
    return await this.partyMembersRepository
      .save(partyMember)
      .then((res) => ({
        code: 200,
        message: '채널 생성에 성공했습니다.',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
  async createChannelPartyMembers(url, name, email) {
    const party = await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channel', 'Channel', 'Channel.url = :url', { url })
      .where('party.name = :name', { name })
      .getOne();
    console.log(party);
    if (!party) {
      throw new HttpException('파티 정보가 없습니다', 401);
    }
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .innerJoin('user.Channels', 'channel', 'channel.url = :url', {
        url,
      })
      .getOne();
    if (!user) {
      throw new HttpException('유저가 채널에 속하지 않습니다', 401);
    }
    const partyMember = new PartyMembers();
    partyMember.partyId = party.id;
    partyMember.userId = user.id;
    return await this.partyMembersRepository
      .save(partyMember)
      .then((res) => ({
        code: 200,
        message: '파티 추가에 성공했습니다.',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async getChannelPartyMembers(url: string, name: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.Channels', 'channels', 'channels.url = :url', { url })
      .innerJoin('channels.Parties', 'parties', 'parties.name = :name', {
        name,
      })
      .getMany()
      .then((res) => ({
        code: 200,
        message: '파티 멤버를 불러왔습니다',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
  async getChannelPartyChats(
    url: string,
    name: string,
    perPage: number,
    page: number,
  ) {
    return this.partyChatsRepository
      .createQueryBuilder('partyChats')
      .innerJoin('partyChats.Party', 'party', 'party.name = :name', { name })
      .innerJoin('party.Channel', 'channel', 'channel.url = :url', { url })
      .innerJoinAndSelect('partyChats.User', 'user')
      .orderBy('partyChats.createdAt', 'DESC')
      .take(perPage)
      .skip(perPage * (page - 1))
      .getMany()
      .then((res) => ({
        code: 200,
        message: '채팅 불러오기기 성공했습니다',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async getPartyUnreadsCount(url, name, after) {
    const party = await this.partiesRepository
      .createQueryBuilder('party')
      .innerJoin('party.Channel', 'channel', 'channel.url = :url', {
        url,
      })
      .where('party.name = :name', { name })
      .getOne();
    return this.partyChatsRepository
      .count({
        where: {
          partyId: party.id,
          createdAt: MoreThan(new Date(after)),
        },
      })
      .then((res) => ({
        code: 200,
        message: '안 읽은 메시지 불러오기에 성공했습니다.',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
}
