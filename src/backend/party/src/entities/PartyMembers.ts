import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Parties } from './Parties';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';

@Index('UserId', ['userId'], {})
@Entity('partymembers')
export class PartyMembers {
  @ApiProperty({
    example: new Date(),
    description: '파티 멤버가 추가된 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '파티멤버가 업데이트 된 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: 123123,
    description: '파티가 속한 채널 id',
  })
  @Column('int', { primary: true, name: 'ChannelId' })
  partyId: number;

  @ApiProperty({
    example: 123123,
    description: '파티에 속한 유저 id',
  })
  @Column('int', { primary: true, name: 'UserId' })
  userId: number;

  @ManyToOne(() => Parties, (parties) => parties.PartyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ChannelId', referencedColumnName: 'id' }])
  Party: Parties;

  @ManyToOne(() => Users, (users) => users.PartyMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  User: Users;
}
