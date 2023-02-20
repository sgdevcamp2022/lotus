import { HttpException, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from '../entities/Channels';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { Parties } from '../entities/Parties';
import { ChannelMembers } from '../entities/ChannelMembers';
import { PartyMembers } from '../entities/PartyMembers';
import { Users } from '../entities/Users';
import { Party } from '../partys/entities/party.entity';
import { PartyChats } from '../entities/PartyChats';

@Injectable()
export class ChannelsService {
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

    private dataSource: DataSource,
  ) {}

  async findMyChannels(myId: number, userId: number) {
    if (myId != userId) {
      throw new HttpException('올바른 유저 정보가 아닙니다.', 401);
    }
    return await this.channelsRepository
      .find({
        where: {
          ChannelMembers: [{ userId: myId }],
        },
      })
      .then((res) => ({
        data: res,
        code: 200,
        message: '채널 조회에 성공했습니다.',
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async create(createChannelDto: CreateChannelDto, ownerId: number) {
    return await this.dataSource
      .transaction(async (manager) => {
        const channel = new Channels();
        channel.url = createChannelDto.url;
        channel.name = createChannelDto.name;
        channel.ownerId = ownerId;
        const channelReturned = await manager.save(channel);

        const channelMember = new ChannelMembers();
        channelMember.channelId = channelReturned.id;
        channelMember.userId = ownerId;
        const party = new Parties();
        party.channelId = channelReturned.id;
        party.name = '전체';

        const [, partyReturned] = await Promise.all([
          await manager.save(channelMember),
          await manager.save(party),
        ]);

        const partyMember = new PartyMembers();
        partyMember.partyId = partyReturned.id;
        partyMember.userId = ownerId;
        await manager.save(partyMember);
      })
      .then(() => ({
        code: 200,
        message: '채널 생성에 성공했습니다.',
        data: null,
      }))
      .catch((err) => {
        throw new HttpException('채널 생성에 실패했습니다.', 401);
      });
  }

  async getChannelMembers(url: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .select([
        'userId',
        'email',
        'nickname',
        'profile_image',
        'character_name',
      ])
      .innerJoin('user.ChannelMembers', 'members')
      .innerJoin('members.Channel', 'channel', 'channel.url = :url', { url })
      .getRawMany()
      .then((res) => ({
        code: 200,
        message: '멤버를 불러오는데 성공했습니다',
        data: res,
      }))
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
  async getChannelMember(url: string, id: number) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.ChannelMembers', 'members')
      .innerJoin('members.Channel', 'channel', 'channel.url = :url', { url })
      .getOne()
      .then((res) => {
        if (!res) {
          throw new HttpException('유저가 등록되어 있지 않습니다', 403);
        }
        return {
          code: 200,
          message: '유저 데이저 조회가 성공했습니다',
          data: res,
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async getAllChannels() {
    return await this.channelsRepository
      .createQueryBuilder('channels')
      .getMany()
      .then((res) => {
        if (!res) {
          throw new HttpException('존재하는 채널이 없습니다.', 400);
        }
        return {
          code: 200,
          message: '채널 조회에 성공했습니다.',
          data: res,
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }

  async createChannelMember(url: string, id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const channel = await this.channelsRepository.findOne({
        where: { url },
        relations: ['Parties'],
      });
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException('존재하지 않는 유저입니다.', 401);
      }
      const channelMember = this.channelMemberRepository.create({
        channelId: channel.id,
        userId: user.id,
      });
      const memberReturned = await this.channelMemberRepository.save(
        channelMember,
      );
      if (!memberReturned) {
        throw new HttpException('멤버 추가가 실패했습니다', 401);
      }

      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
      throw new HttpException('유저 추가에 실패했습니다.', 400);
    } finally {
      await queryRunner.release();
    }
    return {
      code: 200,
      message: '유저 추가에 성공했습니다.',
      data: null,
    };
  }

  async remove(url: string, ownerId: number) {
    const channel = await this.channelsRepository.findOne({
      where: { url, ownerId },
    });
    if (!channel) {
      throw new HttpException('채널을 삭제할 수 없습니다.', 400);
    }

    return this.channelsRepository
      .createQueryBuilder()
      .update(Channels)
      .set({ deletedAt: new Date() })
      .where('url = :url AND ownerId = :ownerId', { url, ownerId })
      .execute()
      .then((res) => {
        return {
          code: 200,
          message: '채널 삭제에 성공했습니다.',
          data: null,
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, err.status);
      });
  }
}
