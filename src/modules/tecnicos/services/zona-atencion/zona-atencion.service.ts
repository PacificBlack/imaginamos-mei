import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NO_CREAR,
  NO_EXISTE,
  NO_SE_PUEDE_ELIMINAR,
  REGEX,
} from 'src/common/globales.enum';
import { DeleteResult, Repository } from 'typeorm';
import { DTOZonaAtencion } from '../../dto';
import { ZonaAtencion } from '../../entities';
import { ZonaAtencionInterface } from '../../interfaces';

@Injectable()
export class ZonaAtencionService {
  constructor(
    @InjectRepository(ZonaAtencion)
    private readonly zona_atencion_repository: Repository<ZonaAtencion>,
  ) {}

  async SeedZonasAtencion() {
    const zonas: ZonaAtencionInterface[] = [
      { id: 1, ubicacion: 'Sur' },
      { id: 2, ubicacion: 'Norte' },
      { id: 3, ubicacion: 'Oriente' },
      { id: 4, ubicacion: 'Occidente' },
    ];

    return await this.zona_atencion_repository.save(zonas).catch((e) => {
      throw `${e} en el SeedZonasAtencion`;
    });
  }

  async obtenerZonasAtencion(): Promise<ZonaAtencion[]> {
    return await this.zona_atencion_repository.find({ order: { id: 'ASC' } });
  }

  async obtenerZonaAtencion(id: number): Promise<ZonaAtencion> {
    return await this.zona_atencion_repository
      .findOne({ where: { id: id } })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException(
            'No existe la Zona de atencion',
            HttpStatus.CREATED,
          );
        }
      });
  }

  async crearZonaAtencion(
    zona_atencion: DTOZonaAtencion,
  ): Promise<ZonaAtencion> {
    return await this.zona_atencion_repository
      .findOne({
        where: { id: zona_atencion.id },
      })
      .then(async (value) => {
        if (!value) {
          return await this.zona_atencion_repository
            .save(zona_atencion)
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

  async modificarZonaAtencion(
    zona_atencion: DTOZonaAtencion,
  ): Promise<ZonaAtencion> {
    return await this.zona_atencion_repository
      .findOne({
        where: { id: zona_atencion.id },
      })
      .then(async (value) => {
        if (value) {
          const zona_atencion_nueva = Object.assign(value, zona_atencion);
          return await this.zona_atencion_repository
            .save(zona_atencion_nueva)
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

  async eliminarZonaAtencion(id: number): Promise<DeleteResult> {
    return await this.zona_atencion_repository
      .findOne({ where: { id: id } })
      .then(async (value) => {
        if (value) {
          return await this.zona_atencion_repository.delete(id).catch((e) => {
            throw new Error(NO_SE_PUEDE_ELIMINAR);
          });
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
