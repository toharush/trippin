import { getGoogleResult } from "./utils/scraper/app";
import { hereApi } from "./utils/api";
import dotenv from 'dotenv';

dotenv.config();
const here = hereApi();

(async() => {
    const res = await here.discover({
        q: 'restaurant',
        at: '42.838327,12.517734',
        limit: 10
    });
    let items = res.data.items;
    items = [items[0], items[1]];
    const a = await getGoogleResult([items[0], items[1]]);
    console.log(a);
})()