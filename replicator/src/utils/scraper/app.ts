import puppeteer, { Page } from "puppeteer";
import DiscoverResponse, {
  GoogleScraper,
  GoogleScraperUrl,
} from "../here-api/interface/api/discover/response";
import { GoogleGenericScraper } from "./google/googleScraperMaps";

export const getGoogleResult = async (
  items: DiscoverResponse[]
) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  const MapsScrapper = new GoogleGenericScraper({
    type: GoogleScraper.MAPS,
    page: await browser.newPage(),
    searchTags: {
      byClass: [
        {
          key: "nikud",
          value: ".fontDisplayLarge",
        },
      ],
    },
    _loadItemPage: async (page: Page, item: DiscoverResponse, type: GoogleScraper): Promise<boolean> => {
      if (item.address?.label) {
        try {
          let searchInput = await page.waitForSelector("#searchboxinput");
          await searchInput?.click({ clickCount: 3 });
          await searchInput?.press("Backspace");

          await searchInput?.click();
          await searchInput?.type(item.address?.label);
          await page.keyboard.press("Enter");
          await page.waitForSelector(".fontDisplayLarge", { timeout: 5000 });

          return true;
        } catch {
          return false;
        }
      } else {
        return false;
      }
    },
  });

  await MapsScrapper.run(items);
console.log(items)

   const SearchScrapper = new GoogleGenericScraper({
    type: GoogleScraper.SEARCH,
    page: await browser.newPage(),
    searchTags: {
      byClass: [
        {
          key: "nikud",
          value: ".fontDisplayLarge",
        },
      ],
    },
    _loadItemPage: async (page: Page, item: DiscoverResponse, type: GoogleScraper): Promise<boolean> => {
      if (item.address?.label) {
        try {
            let searchInput = await page.waitForSelector('.gLFyf');
            await searchInput?.click({clickCount: 3});
            await searchInput?.press('Backspace'); 

            await searchInput?.click();
            await searchInput?.type(item.address.label);
            await page.keyboard.press('Enter');
            await page.waitForSelector(".ffc9Ud", {timeout: 5000});
            return true;
        } catch {
            return false;
        }
      } else {
        return false;
      }
    },
  });

  await SearchScrapper.run(items);
    console.log(items)
  await browser.close();
  return items;
};
