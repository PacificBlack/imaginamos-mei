import { Controller, Get } from '@nestjs/common';
import { TipoServicioService } from './modules/ordenes/services';

@Controller()
export class AppController {
  constructor(private readonly tipo_servicio_service: TipoServicioService) {
    Promise.all([this.tipo_servicio_service.SeedTipoServicio()]).catch((e) => {
      throw new Error('Error' + e);
    });
  }
}
