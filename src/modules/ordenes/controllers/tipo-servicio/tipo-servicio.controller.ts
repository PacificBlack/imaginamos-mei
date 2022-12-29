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
import { DTOTipoServicio } from '../../dto';
import { TipoServicio } from '../../entities';
import { TipoServicioService } from '../../services';

@Controller('tipo-servicio')
export class TipoServicioController {
  constructor(private readonly tipo_servicio_service: TipoServicioService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTiposServicios(): Promise<TipoServicio[]> {
    return await this.tipo_servicio_service.obtenerTiposServicios();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTipoServicio(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TipoServicio | Respuesta> {
    return await this.tipo_servicio_service.obtenerTipoServicio(id);
  }

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
