import { Browser } from "puppeteer";
import { Logger } from "winston";
import { HereTimeLimit } from "../../app";
import { get_places, get_place_count } from "../../controllers/place";
import { sleep } from "../../utils/here-api/app";
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
            const length = await get_place_count();
            for(let i = 0; (i+1)*limit < length; i++) {
                const places = await get_places(limit, i);
                await Promise.all([this._mapsScrapper.run(places), this._searechScrapper.run(places)]);
            }
            if(length == 0) {
                await sleep(HereTimeLimit)
            }
        }
    }
}