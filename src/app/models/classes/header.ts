import { Client } from '../classes/client';
import { Time } from '@angular/common';

export class Header {
  nitEmisor: string;
  numeroFactura: number;
  cuf: string;
  cufd: string;
  codigoSucursal: number;
  direccion: string; 
  codigoPuntoVenta: number;
  fechaEmision: Date;
  nombreRazonSocial: string;
  codigoTipoDocumentoIdentidad: number;
  numeroDocumento: string;
  complemento: boolean;
  codigoCliente: string;
  codigoMetodoPago: number;
  numeroTarjeta: string;
  montoTotal: number;
  montoDescuento: boolean;
  codigoMoneda: number;
  tipoCambio: number;
  montoTotalMoneda: number;
  leyenda: string;
  usuario: string;
  codigoDocumentoSector: number;
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}
