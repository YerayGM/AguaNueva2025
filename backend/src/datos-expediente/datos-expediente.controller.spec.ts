import { Test, TestingModule } from '@nestjs/testing';
import { DatosExpedienteController } from './datos-expediente.controller';

describe('DatosExpedienteController', () => {
  let controller: DatosExpedienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatosExpedienteController],
    }).compile();

    controller = module.get<DatosExpedienteController>(DatosExpedienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
