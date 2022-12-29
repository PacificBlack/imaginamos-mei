import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NO_CREAR, NO_EXISTE, REGEX } from 'src/common/globales.enum';
import { DeleteResult, Repository } from 'typeorm';
import { DTOTipoServicio } from '../../dto';
import { TipoServicio } from '../../entities';
import { TipoServicioInterface } from '../../interfaces';

@Injectable()
export class TipoServicioService {
  constructor(
    @InjectRepository(TipoServicio)
    private readonly tipo_servicio_repository: Repository<TipoServicio>,
  ) {}

  async SeedTipoServicio() {
    const servicios: TipoServicioInterface[] = [
      { id: 1, nombre: 'Instalación de soporte' },
      { id: 2, nombre: 'Mantenimiento' },
    ];
    return await this.tipo_servicio_repository.save(servicios).catch((e) => {
      throw `${e} en el SeedTipoServicio`;
    });
  }

  async obtenerTiposServicios(): Promise<TipoServicio[]> {
    return await this.tipo_servicio_repository.find({ order: { id: 'ASC' } });
  }

  async obtenerTipoServicio(id: number): Promise<TipoServicio> {
    return await this.tipo_servicio_repository
      .findOne({ where: { id: id } })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            'No existe lel Tipo de Servicio',
            HttpStatus.CREATED,
          );
        }
      });
  }

  async crearTipoServicio(
    tipo_servicio: DTOTipoServicio,
  ): Promise<TipoServicio> {
    return await this.tipo_servicio_repository
      .findOne({
        where: { id: tipo_servicio.id },
      })
      .then(async (value) => {
        if (!value) {
          return await this.tipo_servicio_repository
            .save(tipo_servicio)
            .catch((e) => {
              throw new Error(
                `El campo ${
                  REGEX.exec(e.detail)[0]
                } ya se esta usando, por favor intente con otro`,
              );
            });
        } else {
          throw new HttpException(NO_CREAR, HttpStatus.ACCEPTED);
        }
      });
  }

  async modificarTipoServicio(
    tipo_servicio: DTOTipoServicio,
  ): Promise<TipoServicio> {
    return await this.tipo_servicio_repository
      .findOne({
        where: { id: tipo_servicio.id },
      })
      .then(async (value) => {
        if (value) {
          const tipo_servicio_nuevo = Object.assign(value, tipo_servicio);
          return await this.tipo_servicio_repository
            .save(tipo_servicio_nuevo)
            .catch((e) => {
              throw new Error(
                `El campo ${
                  REGEX.exec(e.detail)[0]
                } ya se esta usando, por favor intente con otro`,
              );
            });
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.ACCEPTED);
        }
      });
  }

  async eliminarTipoServicio(id: number): Promise<DeleteResult> {
    return await this.tipo_servicio_repository
      .findOne({ where: { id: id } })
      .then(async (value) => {
        if (value) {
          return await this.tipo_servicio_repository.delete(id);
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
