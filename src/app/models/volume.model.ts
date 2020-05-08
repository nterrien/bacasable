import { Section } from './section.model';

export interface Volume {
    id?: number;
    label: string;
    comment: string;
    sections: Section[]
}