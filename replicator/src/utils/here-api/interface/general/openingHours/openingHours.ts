import { Structured, Category } from '../../../app';

export interface OpeningHours {
    categories: Category[];
    text: string[];
    isOpen: boolean;
    structured: Structured[];
}
