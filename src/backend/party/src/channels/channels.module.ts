import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { AuthService } from '../auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { Channels } from '../entities/Channels';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Parties } from '../entities/Parties';
import { PartyMembers } from '../entities/PartyMembers';
import { Users } from '../entities/Users';
import { PartyChats } from '../entities/PartyChats';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      Channels,
      ChannelMembers,
      Parties,
      PartyMembers,
      Users,
      PartyChats,
    ]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService, AuthService],
})
export class ChannelsModule {}
