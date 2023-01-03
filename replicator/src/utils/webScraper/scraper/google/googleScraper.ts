import { Browser } from "puppeteer";
import { GenericScraper } from "../../scraper/genericScraper/genericScraper";
import { GoogleScraper, GoogleScraperUrl } from "../interface/google";
import { SearchTags } from "../../app";
import { Logger } from "winston";
import { upsert_google } from "../../../../controllers/google";
import { Place } from "../../../../interface/place";

export interface GoogleScraperInput {
    browser: Browser;
    type: GoogleScraper;
    searchTags: SearchTags;
}

export class GoogleGenericScraper extends GenericScraper {
    constructor(GoogleScraperInput: GoogleScraperInput, logger: Logger){  
        super(GoogleScraperInput, logger) 
    }

    run = async(items: Partial<Place>[] & {id: string, address_id: number, label: string}[]): Promise<void> => {
        this._logger.info(`stating to replicate (${items.length} items in ${this._type} mode)`);
        let page = await this._browser.newPage();

        await page.goto(GoogleScraperUrl[this._type]);

        for(let index = 0; index < items.length; index++){
            if(this.loadItemPage && await this.loadItemPage(page, items[index])) {
                const res = await this.pageSelector(page);

                await setTimeout(() => {}, 1000);
                await upsert_google(items[index].id, res.rate, res.spend);
            }
        }

        await page.close()
    }
}
