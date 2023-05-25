import { Browser } from "puppeteer";
import { GenericScraper } from "../../scraper/genericScraper/genericScraper";
import { GoogleScraper, GoogleScraperUrl } from "../../../here-api/app";
import { SearchTags } from "../../app";
import { Logger } from "winston";
import { upsert_google } from "../../../../controllers/google";
import { GoogleDatabase } from "../../../../interface/google";
import {
  defaultGoogleRandomRate,
  defaultGoogleRandomSpend,
} from "../../../database/config";

export interface GoogleScraperInput {
  browser: Browser;
  type: GoogleScraper;
  searchTags: SearchTags;
}

export class GoogleGenericScraper extends GenericScraper {
  constructor(GoogleScraperInput: GoogleScraperInput, logger: Logger) {
    super(GoogleScraperInput, logger);
  }

  async run(
    items: { id: string; address_id: number; label: string }[]
  ): Promise<void> {
    let page = await this._browser.newPage();

    this._logger.info(
      `stating to replicate (${items.length} items in ${this._type} mode)`
    );

    await page.goto(GoogleScraperUrl[this._type]);

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      await this.loadItemPage!(page, item);

      const res = await this.pageSelector(page);

      let obj: GoogleDatabase = {
        place_id: item.id,
      };

      await setTimeout(() => {}, 1000);

      await upsert_google({
        ...obj,
        rate:
          res?.rate && !Number.isNaN(res.rate)
            ? res.rate
            : await defaultGoogleRandomRate(),
        spend: res?.spend
          ? res.spend
          : await defaultGoogleRandomSpend(obj.place_id),
      });
    }

    await page.close();
  }
}
