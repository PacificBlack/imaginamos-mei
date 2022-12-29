import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  ACTUALIZADO,
  CREADO,
  ELIMINADO,
  Respuesta,
} from 'src/common/globales.enum';
import { DTOZonaAtencion } from '../../dto';
import { ZonaAtencion } from '../../entities';
import { ZonaAtencionService } from '../../services';

@Controller('zona-atencion')
export class ZonaAtencionController {
  constructor(private readonly zona_atencion_service: ZonaAtencionService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerZonasAtencion(): Promise<ZonaAtencion[]> {
    return await this.zona_atencion_service.obtenerZonasAtencion();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerZonaAtencion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ZonaAtencion | Respuesta> {
    return await this.zona_atencion_service.obtenerZonaAtencion(id);
  }

  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async crearZonaAtencion(
    @Body(new ValidationPipe()) zona_atencion: DTOZonaAtencion,
  ): Promise<Respuesta> {
    return await this.zona_atencion_service
      .crearZonaAtencion(zona_atencion)
      .then((value) => {
        return {
          status: HttpStatus.CREATED,
          message: CREADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.CONFLICT,
          message: e.toString(),
        };
      });
  }

  @Patch('')
  @HttpCode(HttpStatus.ACCEPTED)
  async modificarZonaAtencion(
    @Body(new ValidationPipe()) zona_atencion: DTOZonaAtencion,
  ): Promise<Respuesta> {
    return await this.zona_atencion_service
      .modificarZonaAtencion(zona_atencion)
      .then((value) => {
        return {
          status: HttpStatus.ACCEPTED,
          message: ACTUALIZADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.CONFLICT,
          message: e.toString(),
        };
      });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarZonaAtencion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.zona_atencion_service
      .eliminarZonaAtencion(id)
      .then((value) => {
        return {
          status: HttpStatus.OK,
          message: ELIMINADO,
        };
      })
      .catch((e) => {
        return {
          status: HttpStatus.NO_CONTENT,
          message: e.toString(),
        };
      });
  }
}
