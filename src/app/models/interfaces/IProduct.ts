export interface IProduct {
    id: number;
    tenantId: string;
    name: string;
    description: string;
    totalAbailable: number;
    image: string;
    price: number;
    cod: string;
    type: string;
    deserialize(input: any): this;
}
