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
import { Parties } from './Parties';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';

@Index('ChannelId', ['partyId'], {})
@Index('UserId', ['userId'], {})
@Entity('partychats')
export class PartyChats {
  @ApiProperty({
    example: 13125,
    description: '파티 내 chat id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'this is example text',
    description: '보낸 chat 내용',
  })
  @Column('text', { name: 'content' })
  content: string;

  @ApiProperty({
    example: new Date(),
    description: '채팅이 생성된 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '파티 채팅이 업데이트 된 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: 5123123,
    description: '속해있는 채널',
  })
  @Column('int', { name: 'ChannelId', nullable: true })
  partyId: number | null;

  @ApiProperty({
    example: 12312,
    description: '채팅을 보낸 유저 id',
  })
  @Column('int', { name: 'UserId', nullable: true })
  userId: number | null;

  @ManyToOne(() => Parties, (parties) => parties.PartyChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Party: Parties;

  @ManyToOne(() => Users, (users) => users.PartyChats, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
