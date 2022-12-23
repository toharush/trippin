import { Browser } from "puppeteer";
import { GoogleGenericScraper } from "../webScraper/app";
import { DiscoverRequest, DiscoverResponse } from "../here-api/app";

export declare class GenericReplicator {
    _googleMapsEngine: GoogleGenericScraper;
    _googleSearchEngine: GoogleGenericScraper;
    _browser: Browser;
    
    getInfo(options: DiscoverRequest, requiredParams?: string[]): Promise<DiscoverResponse[]>;
}