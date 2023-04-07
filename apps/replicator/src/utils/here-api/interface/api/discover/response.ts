import { Address, Category, Payment, Position, Reference, foodType, Contact } from '../../../app';

export interface GoogleResult {
    [GoogleScraper.MAPS]?: any;
    [GoogleScraper.SEARCH]?: any;
    [GoogleScraper.PHOTOS]?: any;
}

export enum GoogleScraper {
    MAPS = "maps",
    SEARCH = "search",
    PHOTOS = "photos"
}

export const GoogleScraperUrl  = {
    [GoogleScraper.MAPS]: "https://maps.google.com",
    [GoogleScraper.SEARCH]: "https://google.com",
    [GoogleScraper.PHOTOS]: "https://google.com/imghp"
}

export interface DiscoverResponse {
    title: string;
    id: string;
    resultType: string;
    position: Position;
    ontologyId?: string;
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
    google?: GoogleResult;
    data_version?: string;
}
