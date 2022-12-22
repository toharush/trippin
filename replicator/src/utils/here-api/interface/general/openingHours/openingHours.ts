import Category from '../category/category';
import Structured from '../structured/structured';

export default interface OpeningHours {
    categories: Category[];
    text: string[];
    isOpen: boolean;
    structured: Structured[];
}
