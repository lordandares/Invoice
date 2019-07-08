import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/classes/product';
import {DomSanitizer} from '@angular/platform-browser';
import { ProductImage } from './product-fake.image';
@Component({
  selector: 'app-product-viwer',
  templateUrl: './product-viwer.component.html',
  styleUrls: ['./product-viwer.component.css']
})
export class ProductViwerComponent implements OnInit {

  @Input() product: Product;
  productImg: string;
  constructor(private sanitizer: DomSanitizer) {
    this.productImg = ProductImage.Image;
   }

  ngOnInit() {
    if (this.product.name === undefined){
      this.initCard();
    }
  }

  initCard() {
      this.product = new Product();
      this.product.cod = 'Codigo';
      this.product.image = this.productImg;
      this.product.description = 'Descripcion del Producto';
      this.product.name = 'Producto';
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
