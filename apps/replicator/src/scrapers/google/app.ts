import { Browser } from "puppeteer";
import { Logger } from "winston";
import { get_places, get_place_count } from "../../controllers/place";
import { GoolgeMapsScraper } from "./maps/maps";
import { GoolgeSearchScraper } from "./search/search";
import { GoolgePhotosScraper } from "./photos/photos";

export class GoogleScraper {
  private _mapsScrapper: GoolgeMapsScraper;
  private _searchScrapper: GoolgeSearchScraper;
  private _photosScrapper: GoolgePhotosScraper;

  constructor(browser: Browser, logger: Logger, limit: number = 20) {
    this._mapsScrapper = new GoolgeMapsScraper(browser, logger);
    this._searchScrapper = new GoolgeSearchScraper(browser, logger);
    this._photosScrapper = new GoolgePhotosScraper(browser, logger);
    this.start(limit);
  }

  async start(limit: number) {
    while (true) {
      const length = await get_place_count();
      for (let i = 0; (i + 1) * limit < length; i++) {
        const places = await get_places(limit, i);
        await Promise.all([
          this._mapsScrapper.run(places),
          this._searchScrapper.run(places),
          this._photosScrapper.run(places),
        ]);
      }
    }
  }
}
