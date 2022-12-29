import { ApiProperty } from '@nestjs/swagger';

export class DTOClientes {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  nombres: string;
  @ApiProperty()
  apellidos: string;
  @ApiProperty()
  cedula: number;
  @ApiProperty({
    description: 'Dirección del lugar de residencia del cliente',
  })
  direccion: string;
}
