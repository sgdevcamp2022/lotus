import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Channels } from './Channels';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';

@Index('UserId', ['userId'], {})
@Entity('channelmembers')
export class ChannelMembers {
  @ApiProperty({
    example: new Date(),
    description: '마지막으로 로그인한 시각',
  })
  @Column('datetime', { name: 'loggedInAt', nullable: true })
  loggedInAt: Date | null;

  @ApiProperty({
    example: new Date(),
    description: '멤버가 채널에 생성된 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '채팅을 조회한 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: 121512,
    description: '채널 id',
  })
  @Column('int', { primary: true, name: 'ChannelId' })
  channelId: number;

  @ApiProperty({
    example: 12312512,
    description: '채널에 속한 유저 id',
  })
  @Column('int', { primary: true, name: 'UserId' })
  userId: number;

  @ManyToOne(() => Channels, (channels) => channels.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: Channels;

  @ManyToOne(() => Users, (users) => users.ChannelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
