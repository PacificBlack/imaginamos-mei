import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NO_EXISTE,
  NO_SE_PUEDE_ELIMINAR,
  REGEX,
} from 'src/common/globales.enum';
import { DeleteResult, Repository } from 'typeorm';
import { DTOClientes } from '../../dto';
import { Clientes } from '../../entities';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientes_repository: Repository<Clientes>,
  ) {}

  async obtenerClientes(): Promise<Clientes[]> {
    return await this.clientes_repository.find({ order: { id: 'ASC' } });
  }

  async obtenerCliente(id: number): Promise<Clientes> {
    return await this.clientes_repository
      .findOne({ where: { id: id } })
      .then((value) => {
        if (value) {
          return value;
        } else {
          throw new HttpException('No existe el cliente', HttpStatus.NOT_FOUND);
        }
      });
  }

  async crearCliente(cliente: DTOClientes): Promise<Clientes> {
    return await this.clientes_repository.save(cliente).catch((e) => {
      throw new Error(
        `El campo ${
          REGEX.exec(e.detail)[0]
        } ya se esta usando, por favor intente con otro`,
      );
    });
  }

  async modificarCliente(cliente: DTOClientes): Promise<Clientes> {
    return await this.clientes_repository
      .findOne({
        where: { id: cliente.id },
      })
      .then(async (value) => {
        if (value) {
          const cliente_nuevo = Object.assign(value, cliente);
          return await this.clientes_repository
            .save(cliente_nuevo)
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

  async eliminarCliente(id: number): Promise<DeleteResult> {
    return await this.clientes_repository
      .findOne({ where: { id: id } })
      .then(async (value) => {
        if (value) {
          return await this.clientes_repository.delete(id).catch((e) => {
            throw new Error(NO_SE_PUEDE_ELIMINAR);
          });
        } else {
          throw new HttpException(NO_EXISTE, HttpStatus.NO_CONTENT);
        }
      });
  }
}
