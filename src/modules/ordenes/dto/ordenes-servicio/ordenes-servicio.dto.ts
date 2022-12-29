import { ApiProperty } from '@nestjs/swagger';
import { DTOClientes } from 'src/modules/clientes/dto';
import { DTOTecnicos } from 'src/modules/tecnicos/dto';
import { DTOTipoServicio } from '../tipo-servicio/tipo-servicio.dto';

export class DTOOrdenesServicio {
  @ApiProperty()
  id?: number;

  @ApiProperty({
    description: 'Token generado aleatoriamente para la orden de servicio',
  })
  token?: string;

  @ApiProperty({
    description: 'Hora actual al momento en el que se creo la orden',
  })
  fecha_creacion_orden?: Date;

  @ApiProperty({
    description:
      'Permite saber si una orden ya fue atendida o no, 0 si no es atendida, 1 si ya fue atendida',
    default: 0,
  })
  estado_orden: number;

  @ApiProperty({
    description: 'Cliente que genero la orden',
    type: DTOClientes,
  })
  clientes: any;

  @ApiProperty({
    description: 'Tecnico que atendera la orden',
    type: DTOTecnicos,
  })
  tecnicos: any;

  @ApiProperty({
    description:
      'Tipo de servicio seleccionado por el cliente (mantenimiento o instalacion)',
    type: DTOTipoServicio,
  })
  tipo_servicio: any;
}
