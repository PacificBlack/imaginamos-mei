import { Clientes } from 'src/modules/clientes/entities';
import { Tecnicos } from 'src/modules/tecnicos/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoServicio } from '../tipo-servicio/tipo-servicio.entity';

@Entity({ name: 'ordenes_servicio' })
export class OrdenesServicio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'token',
    nullable: false,
    unique: true,
  })
  token: string;

  @Column({
    type: 'date',
    name: 'fecha_creacion_orden',
    nullable: false,
  })
  fecha_creacion_orden: Date;

  @Column({
    type: 'int',
    name: 'estado_orden',
    default: 0,
  })
  estado_orden: number;

  @ManyToOne((type) => Clientes, (clientes) => clientes.id)
  @JoinColumn({ name: 'clientes_id' })
  clientes: Clientes;

  @ManyToOne((type) => Tecnicos, (tecnicos) => tecnicos.id)
  @JoinColumn({ name: 'tecnicos_id' })
  tecnicos: Tecnicos;

  @ManyToOne((type) => TipoServicio, (tipo_servicio) => tipo_servicio.id)
  @JoinColumn({ name: 'tipo_servicio_id' })
  tipo_servicio: TipoServicio;
}
