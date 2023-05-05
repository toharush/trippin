import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { GoogleScraper } from "./scrapers/google/app";
import { getBrowser } from "./utils/browser/browser";
import { drop_database, init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";

(async() => {
        // await init_database();
        // new TrippinReplicator([{q: 'bar', at: "37.6,-95.665",  limit: 100},
        //                         {q: 'place', at: "37.6,-95.665",  limit: 100},
        //                         {q: 'restaurant', at: "37.6,-95.665",  limit: 100}], logger);
        // new TrippinReplicator([{q: 'bar', at: "39.6,-95.665",  limit: 100},
        //                         {q: 'place', at: "39.6,-95.665",  limit: 100},
        //                         {q: 'restaurant', at: "39.6,-95.665",  limit: 100}], logger);
        // new TrippinReplicator([{q: 'bar', at: "39.6,-96.665",  limit: 100},
        //                         {q: 'place', at: "39.6,-96.665",  limit: 100},
        //                         {q: 'restaurant', at: "39.6,-96.665",  limit: 100}], logger);
        // new TrippinReplicator([{q: 'bar', at: "33.6,-92.665",  limit: 100},
        //                         {q: 'place', at: "33.6,-92.665",  limit: 100},
        //                         {q: 'restaurant', at: "33.6,-92.665",  limit: 100}], logger);
        new GoogleScraper(await getBrowser(), logger, 10)
})();