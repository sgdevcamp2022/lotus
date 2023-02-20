import { Test, TestingModule } from '@nestjs/testing';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

describe('DmsController', () => {
  let controller: DmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DmsController],
      providers: [DmsService],
    }).compile();

    controller = module.get<DmsController>(DmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
