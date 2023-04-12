import { Browser } from "puppeteer";
import { GoogleScraper } from "../../../utils/here-api/app";
import { GoogleGenericScraper } from "../../../utils/webScraper/app";
import { Logger } from "winston";
import Scraper from "images-scraper";
import { GoogleDatabase } from "../../../interface/google";
import { upsert_google } from "../../../controllers/google";

export class GoolgePhotosScraper extends GoogleGenericScraper {
  constructor(browser: Browser, logger: Logger) {
    super(
      {
        type: GoogleScraper.PHOTOS,
        browser: browser,
        searchTags: {
          byClass: [],
        },
      },
      logger
    );
  }

  async run(
    items: { id: string; address_id: number; label: string }[]
  ): Promise<void> {
    const google = new Scraper({
      puppeteer: {},
    });
    for (let item of items) {
      const { id, label } = item;
      let obj: GoogleDatabase = {
        place_id: item.id,
      };
      const res = await google.scrape(`${label}`);
      await setTimeout(() => {}, 1000);
      res?.map((item) => !item.url.includes("fbsbx"));
      res[0]?.url && (obj.image_url = res[0].url);
      await upsert_google(obj);
    }
  }
}
