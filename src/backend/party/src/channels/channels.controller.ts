import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { Channel } from '../common/decorators/channel.decorator';
import { setReturnValue } from '../interceptors/setReturnValue.interceptor';
import { MyInfoDto } from '../common/dto/my-info.dto';

@Controller('api/channels')
@UseGuards(TokenAuthGuard)
@ApiTags('Channels')
@ApiHeader({
  name: 'Authorization',
  example: 'Bearer {accessToken}',
  required: true,
  description: '발급받은 엑세스 토큰을 삽입하세요',
})
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({
    description: '새로운 채널을 생성합니다.',
  })
  @ApiBody({
    type: CreateChannelDto,
  })
  @Post()
  async createChannel(@Channel() createChannelDto, @User() userInfo) {
    return await this.channelsService.create(createChannelDto, userInfo.userId);
  }

  @ApiOperation({
    description: '모든 채널 정보를 불러옵니다.',
  })
  @Get()
  async getAllChannels() {
    return await this.channelsService.getAllChannels();
  }

  @ApiOperation({
    description: '내가 속한 모든 채널 정보를 불러옵니다.',
  })
  @Get('my/:id')
  async findMyChannels(@Param('id') id: number, @User() userInfo) {
    return await this.channelsService.findMyChannels(id, userInfo.userId);
  }

  @ApiOperation({
    description: '채널에 속한 멤버들의 정보를 가져옵니다.',
  })
  @Get(':url/members')
  getChannelMembers(@Param('url') url: string) {
    return this.channelsService.getChannelMembers(url);
  }
  @ApiOperation({
    description: '채널에 속한 유저 정보를 불러옵니다',
  })
  @Get(':url/members/:id')
  getChannelMember(@Param('url') url: string, @Param('id') id: number) {
    return this.channelsService.getChannelMember(url, id);
  }
  @ApiOperation({
    description: '해당 채널에 유저를 추가합니다.',
  })
  @Post(':url/members/:id')
  createChannelMember(@Param('url') url: string, @Param('id') id: number) {
    return this.channelsService.createChannelMember(url, id);
  }

  @ApiOperation({
    description: '현재 채널을 삭제합니다.',
  })
  @Delete(':url')
  async remove(@Param('url') url: string, @User() userInfo: MyInfoDto) {
    return await this.channelsService.remove(url, userInfo.userId);
  }
}
