import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { GoogleScraper } from "./scrapers/google/app";
import { getBrowser } from "./utils/browser/browser";
import { drop_database, init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";
import { getRandomLocation, getTurfLocation } from "./utils/randomLocation";
import { sleep } from "./utils/sleep";
process.setMaxListeners(100); // Disable the warning

const milliSeconds = 864000;

const replicators = async () => {
  console.time("replicator");
  let loc = await getRandomLocation();

  await new TrippinReplicator(
    [
      { q: "bar", at: loc, limit: 100 },
      { q: "museum", at: loc, limit: 100 },
      { q: "night club", at: loc, limit: 100 },
      { q: "place", at: loc, limit: 100 },
      { q: "restaurant", at: loc, limit: 100 },
    ],
    logger
  );
  console.timeEnd("replicator");
};

(async () => {
  await init_database();
  await replicators();
  // getTurfLocation();
  setInterval(async () => await replicators(), milliSeconds);
})();
