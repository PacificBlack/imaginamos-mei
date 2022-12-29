import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NO_EXISTE, REGEX } from 'src/common/globales.enum';
import { DeleteResult, Repository } from 'typeorm';
import { DTOTecnicos } from '../../dto';
import { Tecnicos } from '../../entities';

@Injectable()
export class TecnicosService {
  constructor(
    @InjectRepository(Tecnicos)
    private readonly tecnicos_repository: Repository<Tecnicos>,
  ) {}

  async obtenerTecnicos(): Promise<Tecnicos[]> {
    return await this.tecnicos_repository.find({
      relations: { zona_atencion: true },
      order: { id: 'ASC' },
    });
  }

  async obtenerTecnico(codigo_tecnico: string): Promise<Tecnicos> {
    return await this.tecnicos_repository
      .findOne({
        relations: { zona_atencion: true },
        where: { codigo_tecnico: codigo_tecnico },
      })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException('No existe el Tecnico', HttpStatus.NOT_FOUND);
        }
      });
  }

  async crearTecnico(tecnico: DTOTecnicos): Promise<Tecnicos> {
    return await this.tecnicos_repository.save(tecnico).catch((e) => {
      throw new Error(
        `El campo ${
          REGEX.exec(e.detail)[0]
        } ya se esta usando, por favor intente con otro`,
      );
    });
  }

  async modificarTecnico(tecnico: DTOTecnicos): Promise<Tecnicos> {
    return await this.tecnicos_repository
      .findOne({
        relations: { zona_atencion: true },
        where: { codigo_tecnico: tecnico.codigo_tecnico },
      })
      .then(async (value) => {
        if (value) {
          const tecnico_nuevo = Object.assign(value, tecnico);
          return await this.tecnicos_repository
            .save(tecnico_nuevo)
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

  async eliminarTecnico(codigo_tecnico: string): Promise<DeleteResult> {
    return await this.tecnicos_repository
      .findOne({ where: { codigo_tecnico: codigo_tecnico } })
      .then(async (value) => {
        if (value) {
          return await this.tecnicos_repository.delete(value.id);
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
