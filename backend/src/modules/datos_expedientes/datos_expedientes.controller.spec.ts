import { Test, TestingModule } from '@nestjs/testing';
import { DatosExpedientesController } from './datos_expedientes.controller';

describe('DatosExpedientesController', () => {
  let controller: DatosExpedientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosExpedientesController],
    }).compile();

    controller = module.get<DatosExpedientesController>(DatosExpedientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
