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
import { DTOTipoServicio } from '../../dto';
import { TipoServicio } from '../../entities';
import { TipoServicioService } from '../../services';

@ApiTags('Módulo Ordenes - Tipo Servicio')
@Controller('tipo-servicio')
export class TipoServicioController {
  constructor(private readonly tipo_servicio_service: TipoServicioService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTiposServicios(): Promise<TipoServicio[]> {
    return await this.tipo_servicio_service.obtenerTiposServicios();
  }

  @ApiParam({
    description: 'Obtiene un tipo de servicio dependiendo del id',
    name: 'id',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTipoServicio(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TipoServicio | Respuesta> {
    return await this.tipo_servicio_service.obtenerTipoServicio(id);
  }

  @ApiBody({
    description: 'Diseñada para crear tipos de servicio',
    type: DTOTipoServicio,
  })
  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async crearTipoServicio(
    @Body(new ValidationPipe()) tipo_servicio: DTOTipoServicio,
  ): Promise<Respuesta> {
    return await this.tipo_servicio_service
      .crearTipoServicio(tipo_servicio)
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
    description: 'Diseñada para modificar tipos de servicio',
    type: DTOTipoServicio,
  })
  @Patch('')
  @HttpCode(HttpStatus.ACCEPTED)
  async modificarTipoServicio(
    @Body(new ValidationPipe()) tipo_servicio: DTOTipoServicio,
  ): Promise<Respuesta> {
    return await this.tipo_servicio_service
      .modificarTipoServicio(tipo_servicio)
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
    description: 'Elimina un tipo de servicio dependiendo del id',
    name: 'id',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarTipoServicio(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.tipo_servicio_service
      .eliminarTipoServicio(id)
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
