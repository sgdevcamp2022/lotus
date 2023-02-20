import { Module } from '@nestjs/common';
import { PartysService } from './partys.service';
import { PartysController } from './partys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channels } from '../entities/Channels';
import { ChannelMembers } from '../entities/ChannelMembers';
import { Parties } from '../entities/Parties';
import { PartyMembers } from '../entities/PartyMembers';
import { Users } from '../entities/Users';
import { PartyChats } from '../entities/PartyChats';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from '../auth/auth.service';
import { EventModule } from '../event/event.module';

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
    EventModule,
  ],
  controllers: [PartysController],
  providers: [PartysService, AuthService],
})
export class PartysModule {}
