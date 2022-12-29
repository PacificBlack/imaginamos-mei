import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnicosModule } from '../tecnicos/tecnicos.module';
import {
  TipoServicioController,
  OrdenesServicioController,
} from './controllers';
import { OrdenesServicio, TipoServicio } from './entities';
import { OrdenesServicioService, TipoServicioService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoServicio, OrdenesServicio]),
    TecnicosModule,
  ],
  controllers: [TipoServicioController, OrdenesServicioController],
  providers: [OrdenesServicioService, TipoServicioService],
  exports: [TipoServicioService],
})
export class OrdenesModule {}
