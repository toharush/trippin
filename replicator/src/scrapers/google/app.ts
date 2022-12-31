import { Browser } from "puppeteer";
import { Logger } from "winston";
import { get_places, get_places_length } from "../../controllers/here";
import { GoolgeMapsScraper } from "./maps/maps";
import { GoolgeSearchScraper } from "./search/search";

export class GoogleScraper {
    private _mapsScrapper: GoolgeMapsScraper;
    private _searechScrapper: GoolgeSearchScraper;

    constructor(browser: Browser, logger: Logger, limit: number = 20) {
        this._mapsScrapper = new GoolgeMapsScraper(browser, logger);
        this._searechScrapper = new GoolgeSearchScraper(browser, logger);
        this.start(limit);
    }

    async start(limit: number) {
        while(true) {
            const length = await get_places_length();
            for(let i = 0; (i+1)*limit < length; i++) {
                const places = await get_places(limit, i);
                await Promise.all([this._mapsScrapper.run(places), this._searechScrapper.run(places)]);
            }
        }
    }
}