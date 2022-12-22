import Address from '../../general/address/address';
import Category from '../../general/category/category';
import Payment from '../../general/payment/payment';
import Position from '../../general/position/position';
import Reference from '../../general/reference/reference';
import foodType from '../../general/food/type';
import Contact from '../../general/contact/contact';

export interface GoogleResult {
    [GoogleScraper.MAPS]?: any;
    [GoogleScraper.SEARCH]?: any;
}

export enum GoogleScraper {
    MAPS = "maps",
    SEARCH = "search"
}

export const GoogleScraperUrl  = {
    [GoogleScraper.MAPS]: "https://maps.google.com",
    [GoogleScraper.SEARCH]: "https://google.com"
}

export default interface DiscoverResponse {
    title: string;
    id: string;
    resultType: string;
    position: Position;
    language?: string;
    address?: Address;
    access?: Position[];
    distance?: number;
    categories?: Category[];
    references?: Reference[];
    foodTypes?: foodType[];
    contacts?: Contact[];
    openingHours?: any[];
    payment?: Payment[];
    chain?: any[];
    google?: GoogleResult
}
