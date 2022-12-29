import { ApiProperty } from '@nestjs/swagger';

export class DTOTipoServicio {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nombre: string;
}
