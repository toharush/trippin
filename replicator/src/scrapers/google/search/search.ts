import { Browser, Page } from "puppeteer";
import { GoogleGenericScraper, GoogleScraper } from "../../../utils/webScraper/app";
import { Logger } from "winston";

export class GoolgeSearchScraper extends GoogleGenericScraper {
    constructor(browser: Browser, logger: Logger) {
        super({
            type: GoogleScraper.SEARCH,
            browser: browser, 
            searchTags: {
                byClass: [{
                    key: "spend",
                    value: ".ffc9Ud",
                }]
            }
        }, logger);
    }

    async loadItemPage<T>(page: Page, item: T): Promise<boolean> {
        const label = (item as any).label;
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
