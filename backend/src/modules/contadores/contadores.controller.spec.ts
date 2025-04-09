import { Test, TestingModule } from '@nestjs/testing';
import { ContadoresController } from './contadores.controller';

describe('ContadoresController', () => {
  let controller: ContadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContadoresController],
    }).compile();

    controller = module.get<ContadoresController>(ContadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
