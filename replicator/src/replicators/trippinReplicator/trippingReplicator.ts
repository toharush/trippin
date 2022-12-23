import puppeteer, { Browser } from "puppeteer";
import { getMapsScraper } from "../../google/maps/maps";
import { GenericReplicator } from "../../utils/genericReplicator/genericReplicator";
import { GoogleGenericScraper } from "../../utils/webScraper/app";
import { DiscoverRequest, DiscoverResponse, HereApis } from "../../utils/here-api/app";
import { getSearchScraper } from "../../google/search/search";

export class TrippinReplicator implements GenericReplicator {
    _googleMapsEngine: GoogleGenericScraper;
    _googleSearchEngine: GoogleGenericScraper;
    _browser: Browser;
    _hereApi: HereApis;

    constructor(browser: Browser, hereApi: HereApis) {
        this._browser = browser;
        this._googleMapsEngine = new GoogleGenericScraper(getMapsScraper(this._browser));
        this._googleSearchEngine = new GoogleGenericScraper(getSearchScraper(this._browser));
        this._hereApi = hereApi;
    }

    async getInfo(options: DiscoverRequest, requiredParams?: string[]): Promise<DiscoverResponse[]> {
        let items = await this._hereApi.discover(options, requiredParams);
        await Promise.all([this._googleMapsEngine.run(items), this._googleSearchEngine.run(items)]);
        return items;
    }
}