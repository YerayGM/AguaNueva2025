import { Test, TestingModule } from '@nestjs/testing';
import { DatosExpedientesService } from './datos_expedientes.service';

describe('DatosExpedientesService', () => {
  let service: DatosExpedientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosExpedientesService],
    }).compile();

    service = module.get<DatosExpedientesService>(DatosExpedientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
