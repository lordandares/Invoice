import { Component, OnInit, Input } from '@angular/core';
import { Header } from 'src/app/models/classes/header';
import { DetailInvoice } from 'src/app/models/classes/detail-invoice';
import { Detail } from 'src/app/models/classes/detail';
import { Invoice } from 'src/app/models/classes/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pay-invoice',
  templateUrl: './pay-invoice.component.html',
  styleUrls: ['./pay-invoice.component.css']
})
export class PayInvoiceComponent implements OnInit {

  @Input() header: Header;
  @Input() detail: Array<Detail> = [];
  @Input() totalToPay: number;
  
  detailInvoice: Array<DetailInvoice> = [];
  invoice = new Invoice();
  detailItem = new DetailInvoice();
  Cambio = 0;
  Efectivo = 0;
  constructor(public invoiceService: InvoiceService, private sanitizer: DomSanitizer) { }

  detailFactory(){
    for (var i = 0, len = this.detail.length; i < len; i++) {
      this.detailItem = new DetailInvoice()
      this.detailItem.cantidad = this.detail[i].Cantidad;
      this.detailItem.codigoProducto = this.detail[i].Product.cod;
      this.detailItem.montoDescuento = this.detail[i].Descuento;
      this.detailItem.subTotal = this.detail[i].SubTotal;
      this.detailItem.descripcion = this.detail[i].Product.description;
      this.detailItem.precioUnitario = this.detail[i].Product.price.toString();
      this.detailItem.actividadEconomica = 1;
      this.detailItem.codigoProductoSin = 1;
      this.detailItem.numeroImei = 1;
      this.detailItem.numeroSerie = 1;
      this.detailItem.unidadMedida = 'litro';
      this.detailInvoice.push(this.detailItem);
    }
  }

  ngOnInit() {
  }

  onEfectivoChange() {
    this.Cambio = this.Efectivo - this.totalToPay;
  }

  createInvoice() {
    if (this.detailInvoice.length === 0) {
      this.detailFactory();
    }
    this.header.tipoCambio = 1;
    this.header.leyenda = 'todos somos iguales ante la ley';
    this.header.numeroTarjeta = '3454345435345345';
    this.header.tipoCambio = 1;
    this.invoice.header = this.header;
    this.invoice.detail = this.detailInvoice;
    this.invoice.tenatId = '048ae5e4-004e-427a-8a5d-3a4a42c47ee7';
    this.invoice.type = 'Estandar';
    console.log(this.invoice);
    this.createInvoiceService();
  }

     // Get product list
     createInvoiceService() {
      return this.invoiceService
        .createInvoice(this.invoice)
        .subscribe((blob: any) => {
          var fileURL = URL.createObjectURL(blob);
          var a: HTMLAnchorElement = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
        });
    }

    

}
