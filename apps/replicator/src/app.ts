import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";
import { getRandomLocation, getTurfLocation } from "./utils/randomLocation";

const milliSeconds = 350000;

const replicator = async () => {
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
  await replicator();
  setInterval(async () => await replicator(), milliSeconds);
})();
