import { Item } from './item.model';

export interface Section {
    id?: number;
    label: string;
    comment: string;
    items: Item[];
}