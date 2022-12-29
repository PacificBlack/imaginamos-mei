import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'clientes' })
export class Clientes {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @Column({
    type: 'int',
    name: 'cedula',
    nullable: false,
    unique: true,
  })
  cedula: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'direccion',
    nullable: false,
  })
  direccion: string;
}
