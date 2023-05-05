import { Browser, Page } from "puppeteer";
import {
  DiscoverResponse,
  GoogleScraper,
  GoogleScraperUrl,
} from "../../../utils/here-api/app";
import { GoogleGenericScraper } from "../../../utils/webScraper/app";
import { Logger } from "winston";
import { GoogleDatabase } from "../../../interface/google";

export class GoolgeMapsScraper extends GoogleGenericScraper {
  constructor(browser: Browser, logger: Logger) {
    super(
      {
        type: GoogleScraper.MAPS,
        browser: browser,
        searchTags: {
          byClass: [
            {
              key: "rate",
              value: ".fontDisplayLarge",
              callback: (text: Element) =>
                text.textContent?.replace(/\s+.*/, ""),
            },
          ],
        },
      },
      logger
    );
  }

  async fillDataFromPage(page: Page) {
    const dataFromPage = await page.evaluate(() => {
      return Array.from(document.querySelectorAll(".bfdHYd")).map((el: any) => {
        const placeUrl = el.parentElement
          .querySelector(".hfpxzc")
          ?.getAttribute("href");
        const urlPattern = /!1s(?<id>[^!]+).+!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm; // https://regex101.com/r/KFE09c/1
        const dataId = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups.id
        )[0];
        const latitude = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups.latitude
        )[0];
        const longitude = [...placeUrl.matchAll(urlPattern)].map(
          ({ groups }) => groups.longitude
        )[0];
        return {
          title: el.querySelector(".qBF1Pd")?.textContent.trim(),
          rating: el.querySelector(".MW4etd")?.textContent.trim(),
          reviews: el
            .querySelector(".UY7F9")
            ?.textContent.replace("(", "")
            .replace(")", "")
            .trim(),
          type: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child"
            )
            ?.textContent.replaceAll("·", "")
            .trim(),
          address: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child"
            )
            ?.textContent.replaceAll("·", "")
            .trim(),
          openState: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child"
            )
            ?.textContent.replaceAll("·", "")
            .trim(),
          phone: el
            .querySelector(
              ".W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child"
            )
            ?.textContent.replaceAll("·", "")
            .trim(),
          website: el.querySelector("a[data-value]")?.getAttribute("href"),
          description: el
            .querySelector(".W4Efsd:last-child > .W4Efsd:nth-of-type(2)")
            ?.textContent.replace("·", "")
            .trim(),
          serviceOptions: el
            .querySelector(".qty3Ue")
            ?.textContent.replaceAll("·", "")
            .replaceAll("  ", " ")
            .trim(),
          gpsCoordinates: {
            latitude,
            longitude,
          },
          placeUrl,
          dataId,
        };
      });
    });
    return dataFromPage;
  }

  async scrollPage(page: Page, scrollContainer: any) {
    let lastHeight = await page.evaluate(
      `document.querySelector("${scrollContainer}").scrollHeight`
    );

    while (true) {
      await page.evaluate(
        `document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`
      );
      await page.waitForTimeout(2000);
      let newHeight = await page.evaluate(
        `document.querySelector("${scrollContainer}").scrollHeight`
      );
      if (newHeight === lastHeight) {
        break;
      }
      lastHeight = newHeight;
    }
  }

  async getLocalPlacesInfo(page: Page) {
    await page.waitForNavigation();

    const scrollContainer = ".m6QErb[aria-label]";

    const localPlacesInfo = [];

    // while (true) {
    await page.waitForTimeout(2000);
    // const nextPageBtn = await page.$("#eY4Fjd:not([disabled])");
    // if (!nextPageBtn) break;
    await this.scrollPage(page, scrollContainer);
    localPlacesInfo.push(...(await this.fillDataFromPage(page)));
    // await page.click("#eY4Fjd");
    // }

    return localPlacesInfo;
  }

  async run(
    items: {
      id: string;
      address_id: number;
      label: string;
      lat: number;
      lng: number;
    }[]
  ): Promise<void> {
    const google = await this._browser.newPage();
    for (let item of items) {
      const { id, label, lat, lng } = item;
      google.goto(
        `${
          GoogleScraperUrl[GoogleScraper.MAPS]
        }/${label}/@${lat},${lng},11z?hl=en`
      );

      let obj: GoogleDatabase = {
        place_id: item.id,
      };
      let res: any = {};
      try {
        res = await google.waitForSelector(".fontDisplayLarge", {
          timeout: 5000,
        });
      } catch {
        res = await this.getLocalPlacesInfo(google);
      }
      console.log(res);
    }
  }
}
