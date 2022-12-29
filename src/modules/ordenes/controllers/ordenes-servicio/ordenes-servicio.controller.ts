import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Respuesta,
  CREADO,
  ACTUALIZADO,
  ELIMINADO,
} from 'src/common/globales.enum';
import { DTOOrdenesServicio } from '../../dto';
import { OrdenesServicio } from '../../entities';
import { OrdenesServicioService } from '../../services';

@ApiTags('Módulo Ordenes - Ordenes Servicio')
@Controller('ordenes-servicio')
export class OrdenesServicioController {
  constructor(
    private readonly ordenes_servicio_service: OrdenesServicioService,
  ) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerOrdenesServicios(): Promise<OrdenesServicio[]> {
    return await this.ordenes_servicio_service.obtenerOrdenesServicios();
  }

  @ApiParam({
    description: 'Obtiene una orden de servicio dependiendo del Token',
    name: 'token',
  })
  @Get('token/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerOrdenServicioxToken(
    @Param('token') token: string,
  ): Promise<OrdenesServicio> {
    return await this.ordenes_servicio_service.obtenerOrdenServicioxToken(
      token,
    );
  }

  @ApiParam({
    description:
      'Obtiene ordenes de servicio dependiendo el codigo del Tecnico',
    name: 'codigo',
  })
  @Get('tecnico/:codigo')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerOrdenServicioxTecnico(
    @Param('codigo') codigo: string,
  ): Promise<OrdenesServicio[]> {
    return await this.ordenes_servicio_service.obtenerOrdenServicioxTecnico(
      codigo,
    );
  }

  @ApiBody({
    description: 'Diseñada para crear ordenes de servicio',
    type: DTOOrdenesServicio,
  })
  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async crearOrderServicio(
    @Body(new ValidationPipe()) orden_servicio: DTOOrdenesServicio,
  ): Promise<Respuesta> {
    return await this.ordenes_servicio_service
      .crearOrdenServicio(orden_servicio)
      .then((value) => {
        console.log(value);
        return {
          status: HttpStatus.CREATED,
          message: `${CREADO} el ticket de su orden es: ${value.token}`,
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
    description: 'Diseñada para modificar ordenes de servicio',
    type: DTOOrdenesServicio,
  })
  @Patch('')
  @HttpCode(HttpStatus.ACCEPTED)
  async modificarOrdenServicio(
    @Body(new ValidationPipe()) orden_servicio: DTOOrdenesServicio,
  ): Promise<Respuesta> {
    return await this.ordenes_servicio_service
      .modificarOrdenServicio(orden_servicio)
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
    description: 'Elimina una orden por su token',
    name: 'token',
  })
  @Delete('/:token')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarOrdenServicio(
    @Param('token') token: string,
  ): Promise<Respuesta> {
    return await this.ordenes_servicio_service
      .eliminarOrdenServicio(token)
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
