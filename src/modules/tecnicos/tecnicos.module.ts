import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tecnicos } from './entities/tecnicos/tecnicos.entity';
import { ZonaAtencion } from './entities/zona-atencion/zona-atencion.entity';
import { TecnicosService } from './services';
import { ZonaAtencionService } from './services/zona-atencion/zona-atencion.service';
import { ZonaAtencionController } from './controllers/zona-atencion/zona-atencion.controller';
import { TecnicosController } from './controllers/tecnicos/tecnicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ZonaAtencion, Tecnicos])],
  providers: [TecnicosService, ZonaAtencionService],
  controllers: [ZonaAtencionController, TecnicosController],
  exports: [TecnicosService],
})
export class TecnicosModule {}
