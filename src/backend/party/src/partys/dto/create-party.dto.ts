import { ApiProperty } from '@nestjs/swagger';

export class CreatePartyDto {
  @ApiProperty({
    description: '생성할 파티의 이름입니다.',
    example: 'example',
  })
  name: string;
}
