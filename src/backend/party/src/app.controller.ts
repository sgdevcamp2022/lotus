import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { MyInfoDto } from './common/dto/my-info.dto';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { User } from './common/decorators/user.decorator';
import { TokenAuthGuard } from './auth/token-auth.guard';

@Controller()
@UseGuards(TokenAuthGuard)
@ApiHeader({
  name: 'Authorization',
  example: 'Bearer {accessToken}',
  required: true,
  description: '발급받은 엑세스 토큰을 삽입하세요',
})
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({
    description: '테스트용',
  })
  @Get('/hello')
  getHello(@User() myInfoDto: MyInfoDto): string {
    console.log(myInfoDto);
    // console.log(this.configService.get<string>('DATABASE_USER'));
    return this.appService.getHello();
  }
}
