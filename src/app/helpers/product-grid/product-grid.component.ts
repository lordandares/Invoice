import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/classes/product';
import { Detail } from 'src/app/models/classes/detail';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  products: Product[];
  detailSelected = new Detail();
  @Output() detailOutPut = new EventEmitter<Detail>();

  constructor(public productService: ProductService) { }
 
   ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    return this.productService
      .getProducts()
      .subscribe((productData: Product[]) => {
        this.products = productData;
      });
  }

  addItem(event, product: Product){
    this.detailSelected.Product = product;
    this.detailSelected.Cantidad = 1;
    this.detailSelected.Descuento = 0;
    this.detailSelected.SubTotal = product.price;
    this.detailOutPut.emit(this.detailSelected);
  }


}
