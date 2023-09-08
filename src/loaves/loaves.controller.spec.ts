import { Test, TestingModule } from '@nestjs/testing';
import { LoavesController } from './loaves.controller';
import { LoavesService } from './loaves.service';

describe('LoavesController', () => {
  let controller: LoavesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoavesController],
      providers: [LoavesService],
    }).compile();

    controller = module.get<LoavesController>(LoavesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
