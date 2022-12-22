import { Page } from "puppeteer";
import { SearchTags } from "../utils/general";
import DiscoverResponse, { GoogleScraper, GoogleScraperUrl } from "../../here-api/interface/api/discover/response";
import { GenericScrapper } from "../genericScrapper/genericScrapper";

export interface GoogleScraperMapsInput {
    searchTags: SearchTags;
    page: Page;
    type: GoogleScraper;
    _loadItemPage: Function;
    filterData?: Function;
}

export class GoogleGenericScraper implements GenericScrapper {
    private _page: Page;
    private _filterData: Function;
    private _loadItemPage: Function;
    private _type: GoogleScraper;
    _searchTags: SearchTags;

    constructor(googleScraperMapsInput: GoogleScraperMapsInput){  
        this._searchTags = googleScraperMapsInput.searchTags;
        this._page = googleScraperMapsInput.page;
        this._type = googleScraperMapsInput.type;
        this._loadItemPage = googleScraperMapsInput._loadItemPage;
        this._filterData = googleScraperMapsInput.filterData ? googleScraperMapsInput.filterData : (item: DiscoverResponse) => item;
    }
    
    async run(items: DiscoverResponse[]): Promise<void> {
        await this._page.goto(GoogleScraperUrl[this._type]);
        for(let index = 0; index < items.length; index++){
            let item = items[index];
            if(await this._loadItemPage(this._page, item, this._type)) {
                item = {
                    ...item, 
                    google: {
                        ...item.google,
                        [this._type]: await this.pageSelector()
                    }
                };
            }
            items[index] = await this._filterData(item);
        }
        await this._page.close();
    }
    pageSelector(): Promise<any> {
       return new Promise<any>(async(resolve, reject) => {
            let googleRes: any = {}
            try {
                for(let searchClass of this._searchTags.byClass ?? []) {
                    googleRes = await this.filterResByClass(searchClass.value, this._page);
                };
            } catch (err) {
                console.log(err)
            } finally {
                resolve(googleRes);
            }
        });
    }

    async filterResByClass(className: string, page: Page) {
        try {
            return await page.$eval(className, text => text.textContent);
        } catch (err) { 
            return undefined;
        }
    }
}
