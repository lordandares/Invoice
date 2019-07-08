import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClientSelectionComponent } from '../helpers/client-selection/client-selection.component';
import { Client } from '../models/classes/client';
import { Detail } from '../models/classes/detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductSelectionComponent } from '../helpers/product-selection/product-selection.component';
import { InvoiceViewerComponent } from '../helpers/invoice-viewer/invoice-viewer.component';
import { Header } from '../models/classes/header';
@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  Client = new Client();
  Detail = new Detail();
  Header = new Header();

  DetailGrid: Array<Detail> = [];
  cabeceraTitle = 'Datos Cabecera';
  ProductosTitle = 'Productos';
  totalItems = 0;
  totalToPay = 0;
  opened = true;

  @Input() clientSelectionComponent: ClientSelectionComponent;

  @ViewChild(ProductSelectionComponent)
  private productSelection: ProductSelectionComponent;
  
  @ViewChild(InvoiceViewerComponent)
  private invoiceViewer: InvoiceViewerComponent;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onAddItem() {
    const Detailcopy = Object.assign({}, this.Detail);
    if (Detailcopy.Product.name !== undefined) {
      const index = this.DetailGrid.findIndex(x => x.Product.cod === Detailcopy.Product.cod);
      if (index > -1) {
        this.DetailGrid[index].Cantidad = this.DetailGrid[index].Cantidad + Detailcopy.Cantidad;
        this.DetailGrid[index].SubTotal = this.DetailGrid[index].SubTotal + Detailcopy.SubTotal;
      } else {
        this.DetailGrid.push(Detailcopy);
      }
      this.totalItems = this.ObjectLength(this.DetailGrid);
      this.totalToPay = this.TotalPrice(this.DetailGrid);
      this.Header.montoTotal = this.totalToPay;
      this.productSelection.cleanProduct();
      this.ProductosTitle = this.totalItems + ' Producto con un Total de ' + this.totalToPay + 'Bs.';
      this.invoiceViewer.updateGrid();
    }
  }

 
  private ObjectLength( object ) {
    let length = 0;
    for ( let key in object ) {
        if ( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
  };

  private TotalPrice(  obj: Detail[] ) {
    let total = 0;
    obj.forEach(object=> {
      total = total + object.SubTotal;
   })
    return total;
  }

  exposedClient($event) {
    this.Client = $event;
    this.cabeceraTitle = 'NIT: ' + this.Client.nit + '     |     NOMBRE: ' + this.Client.name;
    this.Header.montoTotal = this.totalToPay;
    this.Header.nombreRazonSocial = this.Client.name;
    this.Header.numeroDocumento = this.Client.nit;
    this.Header.fechaEmision = new Date();
  }

  exposedDetail($event) {
    this.Detail = $event;
  }

  exposedAddItemGrid(DdtailSelected: Detail) {
    this.Detail = DdtailSelected;
    this.onAddItem();
  }


}
