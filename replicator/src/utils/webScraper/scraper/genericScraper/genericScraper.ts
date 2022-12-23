import { Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper } from "../../../here-api/app";
import { SearchTags } from "../../app";

export declare class GenericScraper {
    _type: GoogleScraper;
    _searchTags: SearchTags;

    run(items: DiscoverResponse[]): Promise<void>;
    pageSelector(page: Page): Promise<any>;
}