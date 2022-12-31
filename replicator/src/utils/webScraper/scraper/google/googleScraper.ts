import { Browser } from "puppeteer";
import { GenericScraper } from "../../scraper/genericScraper/genericScraper";
import { GoogleScraper, GoogleScraperUrl } from "../../../here-api/app";
import { SearchTags } from "../../app";
import { Logger } from "winston";
import { upsert_google } from "../../../../controllers/google";
import { GoogleDatabase } from "../../../../interface/google";

export interface GoogleScraperInput {
    browser: Browser;
    type: GoogleScraper;
    searchTags: SearchTags;
}

export class GoogleGenericScraper extends GenericScraper {
    constructor(GoogleScraperInput: GoogleScraperInput, logger: Logger){  
        super(GoogleScraperInput, logger) 
    }

    async run(items: {id: string, addressId: number, label: string}[]): Promise<void> {
        this._logger.info(`stating to replicate (${items.length} items in ${this._type} mode)`);
        let page = await this._browser.newPage();

        await page.goto(GoogleScraperUrl[this._type]);

        for(let index = 0; index < items.length; index++){
            if(this.loadItemPage && await this.loadItemPage(page, items[index])) {
                const res = await this.pageSelector(page);
                let obj: GoogleDatabase = {
                    placeId: items[index].id
                }
                await setTimeout(() => {}, 1000);
                res.rate && !Number.isNaN(res.rate) && (obj.rate = Number(res.rate));
                res.spend && (obj.spend = res.spend);
                await upsert_google(obj);
            }
        }

        await page.close()
    }
}
