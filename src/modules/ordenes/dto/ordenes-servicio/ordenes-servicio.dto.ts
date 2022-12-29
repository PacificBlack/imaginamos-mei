export class DTOOrdenesServicio {
  id?: number;
  token?: string;
  fecha_creacion_orden?: Date;
  estado_orden: number;
  clientes: any;
  tecnicos: any;
  tipo_servicio: any;
}
