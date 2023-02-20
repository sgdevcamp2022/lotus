import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Parties } from './Parties';
import { Dms } from './Dms';
import { ChannelMembers } from './ChannelMembers';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

@Index('name', ['name'], { unique: true })
@Index('url', ['url'], { unique: true })
@Index('OwnerId', ['ownerId'], {})
@Entity('channels')
export class Channels {
  @ApiProperty({
    example: 1412512,
    description: '채널 id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example: 'example channel',
    description: '채널 이름',
  })
  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @ApiProperty({
    example: 'example',
    description: '채널 주소',
  })
  @IsEmpty()
  @IsString()
  @Column('varchar', { name: 'url', unique: true, length: 30 })
  url: string;

  @ApiProperty({
    example: new Date(),
    description: '채널 생성 시각',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '채널에 변경이 있었던 시각',
  })
  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @ApiProperty({
    example: new Date(),
    description: '채널이 지워진 시각',
  })
  @DeleteDateColumn({ name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @ApiProperty({
    example: 12231251,
    description: '채널을 생성한 유저id',
  })
  @Column('int', { name: 'OwnerId', nullable: true })
  ownerId: number | null;

  @OneToMany(() => Parties, (channels) => channels.Channel)
  Parties: Parties[];

  @OneToMany(() => Dms, (dms) => dms.Channel)
  Dms: Dms[];

  @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel)
  ChannelMembers: ChannelMembers[];

  @ManyToOne(() => Users, (users) => users.Channels, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: Users;
}
