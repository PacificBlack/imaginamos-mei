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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  ACTUALIZADO,
  CREADO,
  ELIMINADO,
  Respuesta,
} from 'src/common/globales.enum';
import { DTOZonaAtencion } from '../../dto';
import { ZonaAtencion } from '../../entities';
import { ZonaAtencionService } from '../../services';

@ApiTags('Módulo Tecnicos - Zonas Atención')
@Controller('zona-atencion')
export class ZonaAtencionController {
  constructor(private readonly zona_atencion_service: ZonaAtencionService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerZonasAtencion(): Promise<ZonaAtencion[]> {
    return await this.zona_atencion_service.obtenerZonasAtencion();
  }

  @ApiParam({
    description: 'Obtiene una >ona de atencion dependiendo del id',
    name: 'id',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerZonaAtencion(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ZonaAtencion | Respuesta> {
    return await this.zona_atencion_service.obtenerZonaAtencion(id);
  }

  @ApiBody({
    description: 'Diseñada para crear zonas de atención',
    type: DTOZonaAtencion,
  })
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

  @ApiBody({
    description: 'Diseñada para modificar zonas de atención',
    type: DTOZonaAtencion,
  })
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

  @ApiParam({
    description: 'Elimina una >ona de atencion dependiendo del id',
    name: 'id',
  })
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
