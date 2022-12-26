import { Browser } from "puppeteer";
import { GoogleGenericScraper } from "../webScraper/app";
import { DiscoverRequest, DiscoverResponse } from "../here-api/app";
import { GoolgeMapsScraper } from "../../google/maps/maps";
import { GoolgeSearchScraper } from "../../google/search/search";
import { filterData } from "../here-api/utils/filterData/filterData";
import { Logger } from "winston";

export abstract class GenericReplicator extends filterData {
    protected _googleMapsEngine: GoogleGenericScraper;
    protected _googleSearchEngine: GoogleGenericScraper;
    protected _browser: Browser;
    protected _logger: Logger;

    constructor(browser: Browser, logger: Logger){
        super();
        this._browser = browser;
        this._logger = logger;
        this._googleMapsEngine = new GoolgeMapsScraper(this._browser.newPage(), this._logger);
        this._googleSearchEngine = new GoolgeSearchScraper(this._browser.newPage(), this._logger);
    }
    
    protected abstract start(options: DiscoverRequest, requiredParams?: string[]): Promise<void>;
}