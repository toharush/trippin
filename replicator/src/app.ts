import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { getBrowser } from "./utils/browser/browser";
import logger from "./utils/logger/logger";

(async() => {
        new TrippinReplicator(await getBrowser(), {q: 'restaurant', at: "51.5045072,-0.1320145,17",  limit: 1}, logger);
})()