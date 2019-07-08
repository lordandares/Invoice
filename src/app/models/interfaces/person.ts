export interface Person {
    Id: number;
    Nombre: string;
    Nit: string;
    Ci: string;
    deserialize(input: any): this;
}

