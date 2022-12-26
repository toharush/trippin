import { Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper, GoogleScraperUrl } from "../../../here-api/app";
import { GoogleScraperInput, SearchTags } from "../../app";
import { filterData } from "../../../here-api/utils/filterData/filterData";
import { Logger } from "winston";

export abstract class GenericScraper extends filterData {
    protected _type: GoogleScraper;
    protected _page: Promise<Page>;
    private _searchTags: SearchTags;
    protected _logger: Logger;

    constructor(googleScraperMapsInput: GoogleScraperInput, logger: Logger) {
        super();
        this._logger = logger;
        this._type = googleScraperMapsInput.type;
        this._page = googleScraperMapsInput.page;
        this._searchTags = googleScraperMapsInput.searchTags;
    }
    
    async loadItemPage?<T>(item: T): Promise<boolean>;

    abstract run?<T extends DiscoverResponse[]>(items: T): Promise<void>;

    async pageSelector(): Promise<any> {
        const page = await this._page;
        return new Promise<any>(async(resolve, reject) => {
                let res: any = {}
                try {
                    for(let searchClass of this._searchTags.byClass ?? []) {
                        res[searchClass.key] = await this.filterResByClass(searchClass.value, page);
                    };
                } catch (err) {
                    this._logger.error(err);
                } finally {
                    resolve(res);
                }
            });
    }

    async filterResByClass(className: string, page: Page) {
        try {
            return await page.$eval(className, text => text.textContent);
        } catch (err) { 
            this._logger.error(err);
            return undefined;
        }
    }
}