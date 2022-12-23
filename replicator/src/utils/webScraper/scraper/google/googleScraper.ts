import { Page } from "puppeteer";
import { SearchTags, GenericScraper } from "../../app";
import { DiscoverResponse,  GoogleScraper, GoogleScraperUrl } from "../../../here-api/app";

export interface GoogleScraperInput {
    searchTags: SearchTags;
    page: Promise<Page>;
    type: GoogleScraper;
    _loadItemPage: Function;
    filterData?: Function;
}

export class GoogleGenericScraper implements GenericScraper {
    private _filterData: Function;
    private _loadItemPage: Function;
    _page: Promise<Page>;
    _type: GoogleScraper;
    _searchTags: SearchTags;

    constructor(googleScraperMapsInput: GoogleScraperInput){  
        this._searchTags = googleScraperMapsInput.searchTags;
        this._type = googleScraperMapsInput.type;
        this._page = googleScraperMapsInput.page;
        this._loadItemPage = googleScraperMapsInput._loadItemPage;
        this._filterData = googleScraperMapsInput.filterData ? googleScraperMapsInput.filterData : (item: DiscoverResponse) => item;
    }
    
    async run(items: DiscoverResponse[]): Promise<void> {
        let page = await this._page;
        await page.goto(GoogleScraperUrl[this._type]);
        for(let index = 0; index < items.length; index++){
            let item = items[index];
            if(await this._loadItemPage(page, item)) {
                item = {
                    ...item, 
                    google: {
                        ...item.google,
                        [this._type]: await this.pageSelector(page)
                    }
                };
            }
            items[index] = await this._filterData(item);
        }
        await page.close();
    }
    
    pageSelector(page: Page): Promise<any> {
       return new Promise<any>(async(resolve, reject) => {
            let googleRes: any = {}
            try {
                for(let searchClass of this._searchTags.byClass ?? []) {
                    googleRes[searchClass.key] = await this.filterResByClass(searchClass.value, page);
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
