import { Page } from "puppeteer";
import { GenericScraper } from "../../scraper/genericScraper/genericScraper";
import { DiscoverResponse, GoogleScraper, GoogleScraperUrl } from "../../../here-api/app";
import { SearchTags } from "../../app";
import { Logger } from "winston";

export interface GoogleScraperInput {
    page: Promise<Page>;
    type: GoogleScraper;
    searchTags: SearchTags;
}

export class GoogleGenericScraper extends GenericScraper {
    constructor(googleScraperMapsInput: GoogleScraperInput, logger: Logger){  
        super(googleScraperMapsInput, logger) 
    }

    async run(items: DiscoverResponse[]): Promise<void> {
        this._logger.info(`stating to replicate (${items.length} items in ${this._type} mode)`);
        let page = await this._page;
        await page.goto(GoogleScraperUrl[this._type]);
        for(let index = 0; index < items.length; index++){
            if(this.loadItemPage && await this.loadItemPage(items[index])) {
                items[index] = await this.filterData({
                    ...items[index], 
                    google: {
                        ...items[index].google,
                        [this._type]: await this.pageSelector()
                    }
                });
            }
        }
        await page.close();
    }
}
