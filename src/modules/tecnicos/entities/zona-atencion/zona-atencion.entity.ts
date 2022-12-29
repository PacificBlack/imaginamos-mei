import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'zona_atencion' })
export class ZonaAtencion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'ubicacion',
    nullable: false,
    unique: true,
  })
  ubicacion: string;
}
