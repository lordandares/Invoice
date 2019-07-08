import {IProduct} from '../interfaces/IProduct';
export class Product implements IProduct {
  id: number;
  tenantId: string;
  name: string;
  description: string;
  totalAbailable: number;
  image: string;
  price: number;
  cod: string;
  type: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}
