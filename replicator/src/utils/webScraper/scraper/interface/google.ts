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