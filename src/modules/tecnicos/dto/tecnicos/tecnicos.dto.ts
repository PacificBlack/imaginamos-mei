import { ApiProperty } from '@nestjs/swagger';
import { DTOZonaAtencion } from '../zona-atencion/zona-atencion.dto';

export class DTOTecnicos {
  @ApiProperty()
  id?: number;
  @ApiProperty({ description: 'Codigo unico que identifica a un tecnico' })
  codigo_tecnico: string;
  @ApiProperty()
  nombres: string;
  @ApiProperty()
  apellidos: string;
  @ApiProperty({
    description: 'Zona de atención donde labora el tecnico',
    type: DTOZonaAtencion,
  })
  zona_atencion: any;
}
