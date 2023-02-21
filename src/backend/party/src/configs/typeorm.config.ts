import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import { Dms } from '../entities/Dms';
import { Friend } from '../entities/Friend';
import { Parties } from '../entities/Parties';
import { PartyChats } from '../entities/PartyChats';
import { PartyMembers } from '../entities/PartyMembers';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '15.164.192.183',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'lotus',
  entities: [
    Users,
    ChannelMembers,
    Channels,
    Dms,
    Friend,
    Parties,
    PartyChats,
    PartyMembers,
  ],
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
};
