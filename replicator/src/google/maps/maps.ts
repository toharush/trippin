import { Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper } from "../../utils/here-api/app";
import { GoogleGenericScraper } from "../../utils/webScraper/app";
import { Logger } from "winston";


export class GoolgeMapsScraper extends GoogleGenericScraper {
    constructor(page: Promise<Page>, logger: Logger) {
        super({
            type: GoogleScraper.MAPS,
            page: page, 
            searchTags: {
                byClass: [{
                    key: "nikud",
                    value: ".fontDisplayLarge",
                }]
            }
        }, logger);
    }

    async loadItemPage<T>(item: T): Promise<boolean> {
        const page = await this._page;
        const label = (item as DiscoverResponse).address?.label;
        if (label) {
            try {
                const searchInput = await page.waitForSelector("#searchboxinput");
                await searchInput?.click({ clickCount: 3 });
                await searchInput?.press("Backspace");

                await searchInput?.click();
                await searchInput?.type(label);
                await page.keyboard.press("Enter");
                await page.waitForSelector(".fontDisplayLarge", { timeout: 5000 });
                // const data = await page.$$(".C7xf8b");

                // for (let i = 0; i < data.length; i++) {
                //     const img = await data[i].$eval('div', el => el.getAttribute('jsinstance'));
                //     const d = await data[i].$$('div');
                //     for (let j = 0; j < d.length; j++) {
                //         const img = await d[i].$eval('.g2BVhd.eoFzo', el => el.getAttribute('jsinstance'));
                //         console.log(img)
                //     }
                //     console.log(img);
                // }

                // console.log(data) 

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
