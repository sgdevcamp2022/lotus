import { Test, TestingModule } from '@nestjs/testing';
import { PartysController } from './partys.controller';
import { PartysService } from './partys.service';

describe('PartysController', () => {
  let controller: PartysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartysController],
      providers: [PartysService],
    }).compile();

    controller = module.get<PartysController>(PartysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
