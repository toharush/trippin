import { Browser, Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper } from "../../utils/here-api/app";
import { GoogleScraperInput } from "../../utils/webScraper/app";


export const getSearchScraper = (Browser: Browser): GoogleScraperInput => {
    return {
        type: GoogleScraper.SEARCH,
        page: Browser.newPage(),
        searchTags: {
            byClass: [
                {
                    key: "nikud",
                    value: ".ffc9Ud",
                },
            ],
        },
        _loadItemPage: loadItemPage,
        filterData: (item: DiscoverResponse) => ({
            ...item,
            google: {
                ...item.google,
                [GoogleScraper.MAPS]: {
                    ...item.google?.[GoogleScraper.MAPS],
                    test: "test"
                }
            }        
        })
    }
}

const loadItemPage = async (page: Page, item: DiscoverResponse): Promise<boolean> => {
    if (item.address?.label) {
        try {
            const searchInput = await page.waitForSelector('.gLFyf');
            await searchInput?.click({clickCount: 3});
            await searchInput?.press('Backspace'); 

            await searchInput?.click();
            await searchInput?.type(item.address.label);
            await page.keyboard.press('Enter');
            await page.waitForSelector(".ffc9Ud", {timeout: 20000});
            return true;
        } catch {
            return false;
        }
    } else {
        return false;
    }
}