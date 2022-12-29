import { ZonaAtencion } from '../../entities';

export interface TecnicosInterface {
  id?: number;
  codigo_tecnico: string;
  nombres: string;
  apellidos: string;
  zona_atencion: ZonaAtencion;
}
