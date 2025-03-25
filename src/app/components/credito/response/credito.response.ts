export interface CreditoResponse{
  id_credito: number,
  id_usuario: number,
  user_name:string,
  monto_total: number,
  monto_pagado: number,
  monto_pendiente: number,
  cod_estado: string,
  descripcion_estado: string,
  descripcion: string,
  fecha_vencimiento: Date
}
