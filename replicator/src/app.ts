import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { closeBrowser, getBrowser } from "./utils/browser/browser";
import { hereApi } from "./utils/api";

(async() => {
        const replicator = new TrippinReplicator(await getBrowser(), await hereApi());
        const res = await replicator.getInfo({q: 'restaurant', at: "-8.07994,54.3802",  limit: 1});
        console.log(await res)
        await closeBrowser();
})()