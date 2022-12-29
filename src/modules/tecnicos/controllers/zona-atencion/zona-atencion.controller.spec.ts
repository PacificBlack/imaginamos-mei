import { Test, TestingModule } from '@nestjs/testing';
import { ZonaAtencionController } from './zona-atencion.controller';

describe('ZonaAtencionController', () => {
  let controller: ZonaAtencionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZonaAtencionController],
    }).compile();

    controller = module.get<ZonaAtencionController>(ZonaAtencionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
