import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Users } from './Users';
import { ApiProperty } from '@nestjs/swagger';

@Entity('friend')
export class Friend {
  @ApiProperty({
    example: 123124,
    description: '유저 id',
  })
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('longtext', { name: 'request_time', nullable: true })
  requestTime: string | null;

  @Column('longtext', { name: 'request_list', nullable: true })
  requestList: string | null;

  @Column('longtext', { name: 'friend_list', nullable: true })
  friendList: string | null;

  @Column('longtext', { name: 'black_list', nullable: true })
  blackList: string | null;

  @OneToOne(() => Users, (user) => user.Friend, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  User: Users;
}
