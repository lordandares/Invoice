import { Product } from '../classes/product';

export class Detail {
    Product: Product;
    Cantidad: number;
    Descuento: number;
    SubTotal: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}
