export interface Article {
    id?: number;
    id_item: number;
    id_submit: any;
    label: string;
    description: string;
    comment: string;
    unit: string;
    minimal_quantity: number;
    price: number;
    percent_workforce: number;
    subcontractable: boolean;
    up_to_date: boolean;
    status: number;
}