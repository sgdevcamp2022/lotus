import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PartyChats } from './PartyChats';
import { PartyMembers } from './PartyMembers';
import { Channels } from './Channels';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from './Users';

@Index('ChannelId', ['channelId'], {})
@Index('OwnerId', ['ownerId'])
@Entity('parties')
export class Parties {
  @ApiProperty({
    example: 1231241,
    description: '파티 id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'example',
    description: '파티 이름',
  })
  @Column('varchar', { name: 'name', length: 30 })
  name: string;

  @ApiProperty({
    example: true,
    description: '비공개 파티인지 여부',
  })
  @Column('tinyint', {
    name: 'private',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  @ApiProperty({
    example: new Date(),
    description: '파티 생성 시간',
  })
  private: boolean | null;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '파티 업데이트 시간',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: 1231251,
    description: '속해 있는 채널 id',
  })
  @Column('int', { name: 'ChannelId', nullable: true })
  channelId: number | null;

  @ApiProperty({
    example: 12231251,
    description: '파티를 생성한 유저id',
  })
  @Column('int', { name: 'OwnerId', nullable: true })
  ownerId: number | null;

  @OneToMany(() => PartyChats, (partyChats) => partyChats.Party)
  PartyChats: PartyChats[];

  @OneToMany(() => PartyMembers, (partyMembers) => partyMembers.Party)
  PartyMembers: PartyMembers[];

  @ManyToOne(() => Channels, (channels) => channels.Parties, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: Channels;
  @ManyToOne(() => Users, (users) => users.Parties, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: Users;
}
