import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { GoogleScraper } from "./scrapers/google/app";
import { getBrowser } from "./utils/browser/browser";
import { drop_database, init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";
import { getRandomLocation } from "./utils/randomLocation";
import { sleep } from "./utils/sleep";

const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const replicator = async () => {
  let loc = await getRandomLocation();

  new TrippinReplicator(
    [
      { q: "bar", at: loc, limit: 100 },
      { q: "museum", at: loc, limit: 100 },
      { q: "night club", at: loc, limit: 100 },
      { q: "place", at: loc, limit: 100 },
      { q: "restaurant", at: loc, limit: 100 },
    ],
    logger
  );
};

(async () => {
  await init_database();
  new GoogleScraper(await getBrowser(true), logger, 10);

  setInterval(async () => {
    let num = 1;
    let max = 100;
    let cat = 5;
    while (num * cat <= max) {
      await replicator();
      num++;
    }
  }, oneDayInMilliseconds);
})();
