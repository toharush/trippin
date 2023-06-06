import { Browser, Page } from "puppeteer";
import { GoogleScraper } from "../../../here-api/app";
import { GoogleScraperInput, SearchTags } from "../../app";
import { Logger } from "winston";
import { EvaluateFunc } from "puppeteer";

export abstract class GenericScraper {
  protected _type: GoogleScraper;
  protected _browser: Browser;
  protected _logger: Logger;
  private _searchTags: SearchTags;

  constructor(googleScraperMapsInput: GoogleScraperInput, logger: Logger) {
    this._logger = logger;
    this._type = googleScraperMapsInput.type;
    this._browser = googleScraperMapsInput.browser;
    this._searchTags = googleScraperMapsInput.searchTags;
  }

  async loadItemPage?<T>(page: Page, item: T): Promise<boolean>;

  filterData<T>(item: T) {
    return { ...item };
  }

  abstract run?<T extends any[]>(items: T): Promise<void>;

  async pageSelector(page: Page): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      let res: any = {};
      try {
        for (let searchClass of this._searchTags.byClass ?? []) {
          res[searchClass.key] = await this.filterResByClass(
            searchClass.value,
            page,
            searchClass.callback
          );
        }
      } catch (err) {
        this._logger.error(err);
      } finally {
        resolve(res);
      }
    });
  }

  async filterResByClass(
    className: string,
    page: Page,
    callback: EvaluateFunc<any> = (text: Element) => text.textContent
  ) {
    try {
      return await page.$eval(className, callback);
    } catch (err) {
      this._logger.error(err);
      return undefined;
    }
  }
}
