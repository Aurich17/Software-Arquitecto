export interface MantCreditoRequest {
  p_accion: string,
  p_id_usuario: number,
  p_monto_total: number,
  p_monto_pagado: number,
  p_cod_estado: string,
  p_descripcion: string,
  p_fecha_vencimiento: Date
}
