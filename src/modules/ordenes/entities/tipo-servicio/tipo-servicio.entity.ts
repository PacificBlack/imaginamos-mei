import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tipo_servicio' })
export class TipoServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'nombre',
    nullable: false,
    unique: true,
  })
  nombre: string;
}
