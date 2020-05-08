import { Article } from './article.model';

export interface Item {
    id?: number;
    label: string;
    comment: string;
    articles: Article[];

}