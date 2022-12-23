import puppeteer, { Browser } from "puppeteer";
let browser: Browser;

export const getBrowser = async(headless: boolean = false) => browser ? browser : browser = await puppeteer.launch({ headless: headless, args: ["--disable-setuid-sandbox"], ignoreHTTPSErrors: true,});
export const closeBrowser = async() => await browser.close();
