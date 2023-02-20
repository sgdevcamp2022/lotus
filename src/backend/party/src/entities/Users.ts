import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartyChats } from './PartyChats';
import { PartyMembers } from './PartyMembers';
import { Dms } from './Dms';
import { ChannelMembers } from './ChannelMembers';
import { Channels } from './Channels';
import { Friend } from './Friend';
import { ApiProperty } from '@nestjs/swagger';

/*@Index('email', ['email'], { unique: true })*/
@Entity('user')
export class Users {
  @ApiProperty({
    example: 123123,
    description: '유저 id',
  })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
  id: number;

  @ApiProperty({
    example: true,
    description: '접속한 여부',
  })
  @Column('bit', { name: 'activated', nullable: true })
  activated: boolean | null;

  @ApiProperty({
    example: 'role_model',
    description: '계정 인증 정보',
  })
  @Column('varchar', { name: 'auth', nullable: true, length: 50 })
  auth: string | null;

  @ApiProperty({
    example: '캐릭터이름은16자까지가능',
    description: '캐릭터 이름',
  })
  @Column('varchar', { name: 'character_name', nullable: true, length: 50 })
  characterName: string | null;

  @ApiProperty({
    example: 'example@example.com',
    description: '유저 email',
  })
  @Column('varchar', { name: 'email', length: 50 })
  email: string;

  @ApiProperty({
    example: 'example',
    description: '유저 닉네임',
  })
  @Column('varchar', { name: 'nickname', nullable: true, length: 50 })
  nickname: string | null;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
  })
  @Column('varchar', { name: 'password', nullable: true, length: 100 })
  password: string | null;

  @ApiProperty({
    example: 'http://ekrnqle/bnlfl/dnvlvq/adf.png',
    description: '프로필 이미지 url, 없으면 이메일 id가 사용된다.',
  })
  @Column('longtext', { name: 'profile_image', nullable: true })
  profileImage: string | null;

  @ApiProperty({
    enum: ['naver', 'localhost', 'kakao', 'google'],
    example: 'naver',
    description: '아이디 제공자',
  })
  @Column('varchar', { name: 'provider', nullable: true, length: 10 })
  provider: string | null;

  @ApiProperty({
    example: 125123,
    description: '스토브 인증을 위한 멤버 id',
  })
  @Column('varchar', { name: 'stove_no', nullable: true, length: 15 })
  stoveNo: string | null;

  @ApiProperty({
    example: new Date(),
    description: '유저 생성 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '정보 업데이트 된 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '유저 삭제 시각',
  })
  @DeleteDateColumn({ name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToOne(() => Friend, (friend) => friend.User)
  Friend: Friend;

  @OneToMany(() => PartyChats, (channelChats) => channelChats.User)
  PartyChats: PartyChats[];

  @OneToMany(() => PartyMembers, (partyMembers) => partyMembers.User)
  PartyMembers: PartyMembers[];

  @OneToMany(() => Dms, (dms) => dms.Sender)
  Dms: Dms[];

  @OneToMany(() => Dms, (dms) => dms.Receiver)
  Dms2: Dms[];

  @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.User)
  ChannelMembers: ChannelMembers[];

  @OneToMany(() => Channels, (channels) => channels.Owner)
  Channels: Channels[];
}
