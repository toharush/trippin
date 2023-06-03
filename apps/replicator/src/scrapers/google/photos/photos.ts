import { Browser } from "puppeteer";
import { GoogleScraper } from "../../../utils/here-api/app";
import { GoogleGenericScraper } from "../../../utils/webScraper/app";
import { Logger } from "winston";
import { GoogleDatabase } from "../../../interface/google";
import { upsert_google } from "../../../controllers/google";
import { sleep } from "../../../utils/sleep";

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
  ): Promise<void> {}
}
