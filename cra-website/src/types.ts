
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
    'INSTOCK' = 'INSTOCK',
    'OUTOFSTOCK' = 'OUTOFSTOCK',
    'LESSTHAN10' ='LESSTHAN10'
}

export interface FetchResult {
        response: null | {manufacturers: string[], products: Product[]};
        updateTime: null | string; 
        error: null | Error; 
        loading: boolean;
}

export interface ProductProps {
    content: FetchResult
    category: string
}

export interface SelectOption {
    value:string,
    label:string
    }