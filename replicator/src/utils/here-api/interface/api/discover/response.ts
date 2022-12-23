import { Address, Category, Payment, Position, Reference, foodType, Contact } from '../../../app';

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

export interface DiscoverResponse {
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
