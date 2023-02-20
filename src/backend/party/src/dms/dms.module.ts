import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';

@Module({
  controllers: [DmsController],
  providers: [DmsService]
})
export class DmsModule {}
