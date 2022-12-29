import { ApiProperty } from '@nestjs/swagger';

export class DTOZonaAtencion {
  @ApiProperty()
  id: number;
  @ApiProperty()
  ubicacion: string;
}
