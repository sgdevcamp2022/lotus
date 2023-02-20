import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channels } from './Channels';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';

@Index('ChannelId', ['channelId'], {})
@Index('SenderId', ['senderId'], {})
@Index('ReceiverId', ['receiverId'], {})
@Entity('dms')
export class Dms {
  @ApiProperty({
    example: 1215123,
    description: '1:1 챗 id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'hi this is an example content of chat',
    description: '채팅 내역',
  })
  @Column('text', { name: 'content' })
  content: string;

  @ApiProperty({
    example: new Date(),
    description: '채팅이 만들어진 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '채팅이 업데이트 된 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: 123124,
    description: '속해 있는 채널 id',
  })
  @Column('int', { name: 'ChannelId', nullable: true })
  channelId: number | null;

  @ApiProperty({
    example: 123124,
    description: '보낸 유저 id',
  })
  @Column('int', { name: 'SenderId', nullable: true })
  senderId: number | null;

  @ApiProperty({
    example: 151232,
    description: '받는 유저 id',
  })
  @Column('int', { name: 'ReceiverId', nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Channels, (channels) => channels.Dms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Channel: Channels;

  @ManyToOne(() => Users, (users) => users.Dms, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SenderId', referencedColumnName: 'id' }])
  Sender: Users;

  @ManyToOne(() => Users, (users) => users.Dms2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ReceiverId', referencedColumnName: 'id' }])
  Receiver: Users;
}
