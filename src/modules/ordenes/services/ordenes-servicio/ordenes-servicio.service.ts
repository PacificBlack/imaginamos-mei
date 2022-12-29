import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NO_EXISTE, REGEX } from 'src/common/globales.enum';
import { TecnicosInterface } from 'src/modules/tecnicos/interfaces';
import { TecnicosService } from 'src/modules/tecnicos/services';
import { DeleteResult, Repository } from 'typeorm';
import { DTOOrdenesServicio } from '../../dto';
import { OrdenesServicio } from '../../entities';

@Injectable()
export class OrdenesServicioService {
  constructor(
    @InjectRepository(OrdenesServicio)
    private readonly ordenes_servicio_repository: Repository<OrdenesServicio>,
    private readonly tecnicos_service: TecnicosService,
  ) {}

  async obtenerOrdenesServicios(): Promise<OrdenesServicio[]> {
    return await this.ordenes_servicio_repository.find({
      relations: {
        tecnicos: { zona_atencion: true },
        tipo_servicio: true,
        clientes: true,
      },
      order: { id: 'ASC' },
    });
  }

  async obtenerOrdenServicioxToken(token: string): Promise<OrdenesServicio> {
    return await this.ordenes_servicio_repository
      .findOne({
        relations: {
          tecnicos: { zona_atencion: true },
          tipo_servicio: true,
          clientes: true,
        },
        where: { token: token },
      })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            'No existe la Orden de Servicio',
            HttpStatus.NOT_FOUND,
          );
        }
      });
  }

  async obtenerOrdenServicioxTecnico(
    codigo_tecnico: string,
  ): Promise<OrdenesServicio[]> {
    return await this.ordenes_servicio_repository
      .find({
        relations: {
          tecnicos: { zona_atencion: true },
          tipo_servicio: true,
          clientes: true,
        },
        where: { tecnicos: { codigo_tecnico: codigo_tecnico } },
      })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            'No existe la Orden de Servicio',
            HttpStatus.NOT_FOUND,
          );
        }
      });
  }

  async crearOrdenServicio(orden_servicio: DTOOrdenesServicio) {
    let tecnico: TecnicosInterface;
    const token: string = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    const fecha = new Date();

    return await this.ordenes_servicio_repository
      .findOne({
        relations: {
          tecnicos: { zona_atencion: true },
          tipo_servicio: true,
          clientes: true,
        },
        where: { clientes: { id: orden_servicio.clientes }, estado_orden: 0 },
      })
      .then(async (value) => {
        if (value) {
          throw new Error(
            `Usted cuenta con una orden de servicio activa con token: ${value.token}`,
          );
        } else {
          return await this.tecnicos_service
            .obtenerTecnicos()
            .then(async (value) => {
              if (value) {
                tecnico = value[Math.floor(Math.random() * value.length)];
                orden_servicio.token = token;
                orden_servicio.tecnicos = tecnico.id;
                orden_servicio.fecha_creacion_orden = fecha;

                return await this.ordenes_servicio_repository
                  .save(orden_servicio)
                  .catch((e) => {
                    throw new Error(
                      `Ocurrio un error al generar su orden, verifique si el cliente,  tecnico o tipo de servicio existen`,
                    );
                  });
              }
            });
        }
      });
  }

  async modificarOrdenServicio(
    orden_servicio: DTOOrdenesServicio,
  ): Promise<OrdenesServicio> {
    return await this.ordenes_servicio_repository
      .findOne({
        relations: {
          tecnicos: { zona_atencion: true },
          tipo_servicio: true,
          clientes: true,
        },
        where: {
          token: orden_servicio.token,
          clientes: { id: orden_servicio.clientes },
        },
      })
      .then(async (value) => {
        if (value) {
          const orden_nueva = Object.assign(value, orden_servicio);
          return await this.ordenes_servicio_repository
            .save(orden_nueva)
            .catch((e) => {
              throw new Error(
                `El campo ${
                  REGEX.exec(e.detail)[0]
                } ya se esta usando o no existe, por favor intente con otro`,
              );
            });
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.ACCEPTED);
        }
      });
  }

  async eliminarOrdenServicio(token: string): Promise<DeleteResult> {
    return await this.ordenes_servicio_repository
      .findOne({
        relations: {
          tecnicos: { zona_atencion: true },
          tipo_servicio: true,
          clientes: true,
        },
        where: { token: token },
      })
      .then(async (value) => {
        if (value) {
          return await this.ordenes_servicio_repository.delete(value.id);
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
