import { ApiProperty } from '@nestjs/swagger';

export class ChatDto {
  @ApiProperty({
    description: 'Chat content',
    example: 'this is example text',
  })
  content: string;
}
