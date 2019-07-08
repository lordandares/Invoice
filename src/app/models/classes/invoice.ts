import {Header} from '../classes/header';
import {DetailInvoice} from '../classes/detail-invoice';

export class Invoice {
    id: number;
    tenatId: string;
    type: string;
    header: Header;
    detail: DetailInvoice[];

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}

