import { Test, TestingModule } from '@nestjs/testing';
import { TipoServicioService } from './tipo-servicio.service';

describe('TipoServicioService', () => {
  let service: TipoServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoServicioService],
    }).compile();

    service = module.get<TipoServicioService>(TipoServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
