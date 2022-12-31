import { Browser } from "puppeteer";
import { Logger } from "winston";
import { get_places, get_places_length } from "../../controllers/here";
import { getBrowser } from "../../utils/browser/browser";
import { GoolgeMapsScraper } from "./maps/maps";
import { GoolgeSearchScraper } from "./search/search";

export class GoogleScraper {
    private _logger: Logger;

    constructor(logger: Logger, limit: number = 20, numberOfWorkers: number = 1) {
        this._logger = logger;
        this.run(limit, numberOfWorkers);
    }


    async run(limit: number,  numberOfWorkers: number) {
        const length = await get_places_length() / numberOfWorkers;
        for(let i =0; i < numberOfWorkers; i++) {
            this.start(limit, i*length, (i+1)*length);
        }
    }

    async start(limit: number, start: number,  end: number) {
        const browser = await getBrowser();
        for(let i = start; (i+1)*limit < end; i++) {
            await this.createScrapers(browser, await get_places(limit, i));
        }
        //await browser.close();
    }

    async createScrapers(browser: Browser, places: any) {
        await Promise.all([new GoolgeMapsScraper(browser, this._logger).run(places), new GoolgeSearchScraper(browser, this._logger).run(places)]);
    }
}