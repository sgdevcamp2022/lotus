import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PartysModule } from './partys/partys.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { HttpModule } from '@nestjs/axios';
import { PartysService } from './partys/partys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { AuthService } from './auth/auth.service';
import { ChannelsService } from './channels/channels.service';
import { Users } from './entities/Users';
import { Channels } from './entities/Channels';
import { ChannelMembers } from './entities/ChannelMembers';
import { Parties } from './entities/Parties';
import { PartyMembers } from './entities/PartyMembers';
import { PartyChats } from './entities/PartyChats';
import { EventModule } from './event/event.module';
import { EventGateway } from './event/event.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './envs/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmModule.forFeature([
      Users,
      Channels,
      ChannelMembers,
      Parties,
      PartyMembers,
      PartyChats,
    ]),
    PartysModule,
    ChannelsModule,
    DmsModule,
    HttpModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    PartysService,
    AuthService,
    ChannelsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
