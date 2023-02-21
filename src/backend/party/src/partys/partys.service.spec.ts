import { Test, TestingModule } from '@nestjs/testing';
import { PartysService } from './partys.service';

describe('PartysService', () => {
  let service: PartysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartysService],
    }).compile();

    service = module.get<PartysService>(PartysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
