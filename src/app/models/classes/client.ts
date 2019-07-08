import { Person } from '../interfaces/person';

export class Client {
    id: number;
    name: string;
    nit: string;
    tenantId: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
      }
}
