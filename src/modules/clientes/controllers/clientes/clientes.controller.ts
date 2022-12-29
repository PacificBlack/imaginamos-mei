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
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import {
  ACTUALIZADO,
  CREADO,
  ELIMINADO,
  Respuesta,
} from 'src/common/globales.enum';
import { DTOClientes } from '../../dto';
import { Clientes } from '../../entities';
import { ClientesService } from '../../services';

@ApiTags('Módulo Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientes_service: ClientesService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerClientes(): Promise<Clientes[]> {
    return await this.clientes_service.obtenerClientes();
  }

  @ApiParam({
    description: 'Obtiene un cliente por su ID',
    name: 'id',
  })
  @Get('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerCliente(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Clientes | Respuesta> {
    return await this.clientes_service.obtenerCliente(id);
  }

  @ApiBody({ description: 'Diseñada para crear clienes', type: DTOClientes })
  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async crearCliente(
    @Body(new ValidationPipe()) cliente: DTOClientes,
  ): Promise<Respuesta> {
    return await this.clientes_service
      .crearCliente(cliente)
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
    description: 'Diseñada para modificar clienes',
    type: DTOClientes,
  })
  @Patch('')
  @HttpCode(HttpStatus.ACCEPTED)
  async modificarCliente(
    @Body(new ValidationPipe()) cliente: DTOClientes,
  ): Promise<Respuesta> {
    return await this.clientes_service
      .modificarCliente(cliente)
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
    description: 'Elimina un cliente por su ID',
    name: 'id',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarClientes(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Respuesta> {
    return await this.clientes_service
      .eliminarCliente(id)
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
