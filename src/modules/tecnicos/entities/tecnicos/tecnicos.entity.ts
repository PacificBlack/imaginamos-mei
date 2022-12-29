import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ZonaAtencion } from '../zona-atencion/zona-atencion.entity';

@Entity({ name: 'tecnicos' })
export class Tecnicos {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'codigo_tecnico',
    nullable: false,
    unique: true,
  })
  codigo_tecnico: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'nombres',
    nullable: false,
  })
  nombres: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'apellidos',
    nullable: false,
  })
  apellidos: string;

  @ManyToOne((type) => ZonaAtencion, (zona_atencion) => zona_atencion.id)
  @JoinColumn({ name: 'zona_atencion_id' })
  zona_atencion: ZonaAtencion;
}
