import { GenericReplicator } from "../../utils/genericReplicator/genericReplicator";
import { DiscoverRequest, DiscoverResponse, GoogleScraper, HereApis } from "../../utils/here-api/app";
import { hereApi } from "../../utils/api";
import { Browser } from "puppeteer";
import { Logger } from "winston";

export class TrippinReplicator extends GenericReplicator {
    private _hereApi: HereApis;

    constructor(browser: Browser, options: DiscoverRequest, logger: Logger, requiredParams: string[] = ['q']) {
        super(browser, logger);
        this._hereApi = hereApi();
        this.start(options, requiredParams);
    }

    protected async start(options: DiscoverRequest, requiredParams: string[]): Promise<void> {
        let searchItems = await this._hereApi.discover(options, requiredParams);
        let mapsItem = [...searchItems]
        await Promise.all([this._googleMapsEngine.run(mapsItem), this._googleSearchEngine.run(searchItems)])
        //console.log(searchItems, mapsItem);
        const items = this.combineData(searchItems, mapsItem);
        this._logger.debug(items);
        await this._browser.close();
    }
    
    private combineData(searchItems: DiscoverResponse[], mapsItems: DiscoverResponse[]): DiscoverResponse[] {
        console.log("mapsItems", mapsItems)
        searchItems.map((currentSearchItem) => {
            let currentMapItem = mapsItems.filter((currentMapItem) => currentSearchItem.id == currentMapItem.id)[0];
            console.log("currentMapItem", currentMapItem)
            return {
                ...currentSearchItem,
                google: {
                    ...currentSearchItem.google,
                    [GoogleScraper.MAPS]: {
                        ...currentMapItem.google?.[GoogleScraper.MAPS],
                    },
                    [GoogleScraper.SEARCH]: {
                        ...currentSearchItem.google?.[GoogleScraper.SEARCH]
                    }
                }
            }
        })
        return searchItems;
    }
}