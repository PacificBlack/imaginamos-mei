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
import {
  ACTUALIZADO,
  CREADO,
  ELIMINADO,
  Respuesta,
} from 'src/common/globales.enum';
import { DTOTecnicos } from '../../dto';
import { Tecnicos } from '../../entities';
import { TecnicosService } from '../../services';

@Controller('tecnicos')
export class TecnicosController {
  constructor(private readonly tecnicos_services: TecnicosService) {}

  @Get('all')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTecnicos(): Promise<Tecnicos[]> {
    return await this.tecnicos_services.obtenerTecnicos();
  }

  @Get('/:codigo')
  @HttpCode(HttpStatus.ACCEPTED)
  async obtenerTecnico(
    @Param('codigo') codigo_tecnico: string,
  ): Promise<Tecnicos> {
    return await this.tecnicos_services.obtenerTecnico(codigo_tecnico);
  }

  @Post('')
  @HttpCode(HttpStatus.ACCEPTED)
  async crearTecnico(
    @Body(new ValidationPipe()) tecnico: DTOTecnicos,
  ): Promise<Respuesta> {
    return await this.tecnicos_services
      .crearTecnico(tecnico)
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
  async modificarTecnico(
    @Body(new ValidationPipe()) tecnico: DTOTecnicos,
  ): Promise<Respuesta> {
    return await this.tecnicos_services
      .modificarTecnico(tecnico)
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

  @Delete('/:codigo')
  @HttpCode(HttpStatus.ACCEPTED)
  async eliminarTecnico(
    @Param('codigo') codigo_tecnico: string,
  ): Promise<Respuesta> {
    return await this.tecnicos_services
      .eliminarTecnico(codigo_tecnico)
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
