import { Test, TestingModule } from '@nestjs/testing';
import { ZonaAtencionService } from './zona-atencion.service';

describe('ZonaAtencionService', () => {
  let service: ZonaAtencionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZonaAtencionService],
    }).compile();

    service = module.get<ZonaAtencionService>(ZonaAtencionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
