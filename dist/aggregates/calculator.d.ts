import { Models } from '@labshare/services-bus';
export declare class Calculator extends Models.Entities.Aggregate {
    id: string;
    name: string;
    constructor(id?: string);
    sum(a: number, b: number, id: number): Promise<any>;
}
