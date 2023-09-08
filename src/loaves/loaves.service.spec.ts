import { Test, TestingModule } from '@nestjs/testing';
import { LoavesService } from './loaves.service';

describe('LoavesService', () => {
  let service: LoavesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoavesService],
    }).compile();

    service = module.get<LoavesService>(LoavesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
