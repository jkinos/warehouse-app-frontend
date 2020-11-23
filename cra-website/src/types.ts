
export interface Product {
    id: string,
    type: string,
    name: string,
    color: string[]
    price: number,
    manufacturer: string
    availability: InstockValue
}

export enum InstockValue {
    'INSTOCK' = 'INSTOCk',
    'OUTOFSTOCK' = 'OUTOFSTOCK',
    'LESSTHAN10' ='LESSTHAN10'
}