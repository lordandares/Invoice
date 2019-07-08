import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/classes/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { startWith, map } from 'rxjs/operators';
import { Detail } from '../../models/classes/detail';
import { ProductViwerComponent } from '../product-viwer/product-viwer.component';
@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css'],
})
export class ProductSelectionComponent implements OnInit {
  productContrl = new FormControl();
  productOptions: Product[];
  filteredOptionsProducts: Observable<Product[]>;
  productViwer = new Product();
  detail = new Detail();
  cantidad: number;
  porcentual: number;
  unitario: number;
  subtotal: number;
  productImg: string;
  productList: Product[];

  @Output() detailOutPut = new EventEmitter<Detail>();
  @ViewChild(ProductViwerComponent)
  private productViwerComponent: ProductViwerComponent;
  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
    this.cleanProduct();
  }

  displayFnProdcut(product?: Product): string | undefined {
    return product ? product.cod : undefined;
  }

  private _filterCod(cod: string): Product[] {
    const filterValue = cod.toLowerCase();
    return this.productOptions.filter(
      productOption => productOption.cod.toLowerCase().indexOf(filterValue) === 0
    );
  }

   // Get product list
   loadProducts() {
    return this.productService
      .getProducts()
      .subscribe((productData: Product[]) => {
        this.productOptions = productData;
        this.filteredOptionsProducts = this.productContrl.valueChanges.pipe(
          startWith<string | Product>(''),
          map(value => (typeof value === 'string' ? value : value.cod)),
          map(cod => (cod ? this._filterCod(cod) : this.productOptions.slice()))
        );
      });
  }

  codSelected(objProduct: Product) {
    this.productViwer = objProduct;
    this.detail.Product = this.productViwer;
    this.detail.Cantidad = this.cantidad;
    const price = this.porcentual > 0 ?
    (this.productViwer.price - (this.porcentual * this.productViwer.price) / 100 )
     : this.productViwer.price;
    this.detail.Cantidad = this.cantidad;
    this.detail.SubTotal = (this.cantidad * price) - (this.unitario);
    this.exposeDetail();
  }

  calulateSubTotal() {
    const price = this.porcentual > 0 ?
    (this.productViwer.price - (this.porcentual * this.productViwer.price) / 100 )
     : this.productViwer.price;
    this.detail.Cantidad = this.cantidad;
    this.detail.Descuento = (this.porcentual * this.productViwer.price) / 100 + this.unitario;
    this.subtotal = this.detail.SubTotal = (this.cantidad * price) - (this.unitario);
    this.exposeDetail();
    this.productList = this.productOptions;
  }

  exposeDetail() {
    this.detailOutPut.emit(this.detail);
  }

  onClickCantidad() {
    this.cantidad = null;
  }
  cleanProduct() {
    this.unitario = 0;
    this.detail.Cantidad = this.cantidad = 0;
    this.detail.Descuento = this.porcentual = 0;
    this.detail.SubTotal = this.subtotal = 0;
    this.detail.Product = new Product();
    this.productContrl.setValue('');
    this.productViwerComponent.initCard();
    this.detailOutPut.emit(this.detail);
  }
}
