export const REGEX = /\(([^)]+)\)/;
export const CREADO = 'Creado exitosamente';
export const ACTUALIZADO = 'Actualizado con exito';
export const ELIMINADO = 'Eliminado exitosamente';
export const NO_CREAR = 'Lastimosamente no se pudo crear';
export const NO_SE_PUEDE_ELIMINAR = 'Lastimosamente no se puede eliminar';
export const NO_EXISTE =
  'Lo que está buscando no se encuentra en nuestro sistema';

export interface Respuesta {
  status: number;
  message: string;
}
