import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PartysService } from './partys.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatDto } from '../common/dto/chat.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { MyInfoDto } from '../common/dto/my-info.dto';

@Controller('api/channels/:url/parties')
@UseGuards(TokenAuthGuard)
@ApiTags('Party')
@ApiHeader({
  name: 'Authorization',
  example: 'Bearer {accessToken}',
  required: true,
  description: '발급받은 엑세스 토큰을 삽입하세요',
})
export class PartysController {
  constructor(private readonly partysService: PartysService) {}

  @ApiOperation({
    description: '채널 아래에 새로운 파티를 만듭니다.',
  })
  @ApiBody({
    type: CreatePartyDto,
  })
  @Post()
  createParty(
    @Param('url') url: string,
    @Body() createPartyDto: CreatePartyDto,
    @User() userInfo,
  ) {
    return this.partysService.createChannelParty(
      url,
      createPartyDto.name,
      userInfo.userId,
    );
  }

  @ApiOperation({
    description: '파티에 유저를 추가합니다',
  })
  @Post(':name/members')
  async createChannelPartyMember(
    @Param('url') url: string,
    @Param('name') name: string,
    @User() userInfo: MyInfoDto,
  ) {
    return this.partysService.createChannelPartyMembers(
      url,
      name,
      userInfo.email,
    );
  }

  @ApiOperation({
    description: '내가 속한 모든 채널 정보를 불러옵니다.',
  })
  @Get('my/:id')
  async findMyChannels(
    @Param('id') id: number,
    @Param('url') url: string,
    @User() userInfo,
  ) {
    return await this.partysService.findMyParties(url, id, userInfo.userId);
  }

  @ApiOperation({
    description: '현재 채널 아래에 모든 파티 정보를 받아옵니다.',
  })
  @Get()
  getAllParties(@Param('url') url: string) {
    return this.partysService.getAllParties(url);
  }

  @ApiOperation({
    description: '아직 읽지 않은 메시지의 개수를 가져옵니다.',
  })
  @Get(':name/unread')
  getUnreadMessage(
    @Param('url') url: string,
    @Param('name') name: string,
    @User() userInfo,
  ) {
    return this.partysService.getPartyUnreadsCount(
      url,
      name,
      userInfo.updatedAt,
    );
  }

  @ApiOperation({
    description: '현재 파티에 소속된 인원들의 정보를 받아옵니다.',
  })
  @Get(':name/members')
  getPartyMembers(@Param('url') url: string, @Param('name') name: string) {
    return this.partysService.getChannelPartyMembers(url, name);
  }

  @ApiOperation({
    description: '현재 파티에 게시된 채팅 정보를 받아옵니다.',
  })
  @Get(':name/chats')
  getPartyChats(
    @Param('url') url: string,
    @Param('name') name: string,
    @Query('perPage') perPage: number,
    @Query('page') page: number,
  ) {
    return this.partysService.getChannelPartyChats(url, name, perPage, page);
  }

  @Post(':name/chats')
  createPartyChats(
    @Param('name') name: string,
    @Param('url') url: string,
    @Body() chatDto: ChatDto,
    @User() userInfo: MyInfoDto,
  ) {
    return this.partysService.postChat({
      url: url,
      content: chatDto.content,
      name: name,
      myId: userInfo.userId,
    });
  }

  @ApiOperation({
    description: '현재 파티 정보를 수정합니다.',
  })
  @Patch(':name')
  updatePartyInfo(
    @Param('url') url: string,
    @Param('name') name: string,
    @Body() updatePartyDto: UpdatePartyDto,
  ) {
    return this.partysService.update(url, name, updatePartyDto);
  }

  @Delete(':name')
  removeParty(@Param('name') name: string, @Param('url') url: string) {
    return this.partysService.remove(name, url);
  }
}
