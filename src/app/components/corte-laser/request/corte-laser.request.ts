export interface CorteLaserRequest{
  p_id_corte_laser:string
}


export interface MantCorteLaserRequest{
  p_accion: string,
  p_id_corte_laser: number,
  p_nombre: string,
  p_numero_celular: string,
  p_nombre_archivo: string,
  p_link_archivo: string,
  p_comentario: string,
  p_estado: string,
  p_corte_laser: number
}
