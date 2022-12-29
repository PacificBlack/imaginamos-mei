import { Clientes } from 'src/modules/clientes/entities';
import { Tecnicos } from 'src/modules/tecnicos/entities';
import { TipoServicio } from '../../entities';

export interface OrdenesServicioInterface {
  id?: number;
  token: string;
  fecha_creacion_orden: Date;
  estado_orden: number;
  clientes: Clientes;
  tecnicos: Tecnicos;
  tipo_servicio: TipoServicio;
}
