import { Test, TestingModule } from '@nestjs/testing';
import { DatosExpedienteService } from './datos-expediente.service';

describe('DatosExpedienteService', () => {
  let service: DatosExpedienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosExpedienteService],
    }).compile();

    service = module.get<DatosExpedienteService>(DatosExpedienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
