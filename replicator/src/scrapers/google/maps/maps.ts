import { Browser, Page } from "puppeteer";
import { GoogleGenericScraper, GoogleScraper } from "../../../utils/webScraper/app";
import { Logger } from "winston";


export class GoolgeMapsScraper extends GoogleGenericScraper {
    constructor(browser: Browser, logger: Logger) {
        super({
            type: GoogleScraper.MAPS,
            browser: browser, 
            searchTags: {
                byClass: [{
                    key: "rate",
                    value: ".fontDisplayLarge",
                    callback: (text:Element) => text.textContent?.replace(/\s+.*/, ""),
                }]
            }
        }, logger);
    }

    async loadItemPage<T>(page: Page, item: T): Promise<boolean> {
        const label = (item as any).label;
        if (label) {
            try {
                const searchInput = await page.waitForSelector("#searchboxinput");
                await searchInput?.click({ clickCount: 3 });
                await searchInput?.press("Backspace");

                await searchInput?.click();
                await searchInput?.type(label);
                await page.keyboard.press("Enter");
                await page.waitForSelector(".fontDisplayLarge", { timeout: 5000 });

                return true;
            } catch (err){
                this._logger.error(err);
                return false;
            }
        } else {
            return false;
        }
    }
}
