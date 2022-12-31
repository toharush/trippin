import puppeteer from "puppeteer";

export const getBrowser = async(headless: boolean = false) => await puppeteer.launch({ headless: headless, args: ["--disable-setuid-sandbox"], ignoreHTTPSErrors: true });
