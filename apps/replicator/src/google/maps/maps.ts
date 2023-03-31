import { Browser, Page } from "puppeteer";
import { DiscoverResponse, GoogleScraper } from "../../utils/here-api/app";
import { GoogleScraperInput } from "../../utils/webScraper/app";


export const getMapsScraper = (Browser: Browser): GoogleScraperInput => {
    return {
        type: GoogleScraper.MAPS,
        page: Browser.newPage(),
        searchTags: {
            byClass: [
                {
                    key: "nikud",
                    value: ".fontDisplayLarge",
                },
            ],
        },
        _loadItemPage: loadItemPage,
          filterData: (item: DiscoverResponse) => ({
            ...item,
            google: {
                ...item.google,
                [GoogleScraper.SEARCH]: {
                    ...item.google?.[GoogleScraper.SEARCH],
                    test: "test"
                }
            }        
        })
    }
}

const loadItemPage = async (page: Page, item: DiscoverResponse): Promise<boolean> => {
    if (item.address?.label) {
        try {
            const searchInput = await page.waitForSelector("#searchboxinput");
            await searchInput?.click({ clickCount: 3 });
            await searchInput?.press("Backspace");

            await searchInput?.click();
            await searchInput?.type(item.address?.label);
            await page.keyboard.press("Enter");
            await page.waitForSelector(".fontDisplayLarge", { timeout: 20000 });

            return true;
        } catch {
            return false;
        }
    } else {
        return false;
    }
}