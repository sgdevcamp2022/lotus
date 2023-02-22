import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DmsService } from './dms.service';
import { UpdateDmDto } from './dto/update-dm.dto';
import { ChatDto } from '../common/dto/chat.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('dms')
@ApiTags('dms')
export class DmsController {
  constructor(private readonly dmsService: DmsService) {}

  @ApiOperation({
    description: 'receiverId에 해당하는 유저에게 메시지를 보냅니다.',
  })
  @Post(':receiverId')
  createChat(
    @Param('receiverId') receiverId: string,
    @Body() chatDto: ChatDto,
  ) {
    return this.dmsService.create(chatDto);
  }

  @ApiOperation({
    description: '채팅이 진행중인 인원들의 리스트를 불러옵니다.',
  })
  @Get()
  getChatLists() {
    return;
  }

  @ApiOperation({
    description: 'receiverId에게 수신한 채팅들을 불러옵니다.',
  })
  @Get(':receiverId')
  getChats(
    @Query('page') page: number,
    @Param('receiverId') receiverId: string,
  ) {
    return this.dmsService.findAll();
  }

  @ApiOperation({
    description: 'receiverId에게 보낸 메시지를 모두 삭제합니다.',
  })
  @Delete(':receiverId')
  removeChats(@Param('receiverId') receiverId: string) {
    return this.dmsService.remove(+receiverId);
  }
}
