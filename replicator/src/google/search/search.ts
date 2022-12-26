import { Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper } from "../../utils/here-api/app";
import { GoogleGenericScraper } from "../../utils/webScraper/app";
import { Logger } from "winston";

export class GoolgeSearchScraper extends GoogleGenericScraper {
    constructor(page: Promise<Page>, logger: Logger) {
        super({
            type: GoogleScraper.SEARCH,
            page: page, 
            searchTags: {
                byClass: [{
                    key: "nikud",
                    value: ".ffc9Ud",
                }]
            }
        }, logger);
    }

    async loadItemPage<T>(item: T): Promise<boolean> {
        const page = await this._page;
        const label = (item as DiscoverResponse).address?.label;
        if (label) {
            try {
                const searchInput = await page.waitForSelector('.gLFyf');
                await searchInput?.click({clickCount: 3});
                await searchInput?.press('Backspace'); 

                await searchInput?.click();
                await searchInput?.type(label);
                await page.keyboard.press('Enter');
                await page.waitForSelector(".ffc9Ud", {timeout: 5000});

                return true;
            } catch (err) {
                this._logger.error(err);
                return false;
            }
        } else {
            return false;
        }
    }
}
