import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";
import { getRandomLocation } from "./utils/randomLocation";

const milliSeconds = 350000;

const replicator = async () => {
  console.time("replicator");
  let loc = await getRandomLocation();

  await new TrippinReplicator(
    [
      { q: "sport", at: loc, limit: 100 },
      { q: "water sports", at: loc, limit: 100 },
      { q: "shopping", at: loc, limit: 100 },
      { q: "mall", at: loc, limit: 100 },
      { q: "shows", at: loc, limit: 100 },
      { q: "atractions", at: loc, limit: 100 },
      { q: "nature", at: loc, limit: 100 },
      { q: "park", at: loc, limit: 100 },
      { q: "theatre", at: loc, limit: 100 },
      { q: "bar", at: loc, limit: 100 },
      { q: "museum", at: loc, limit: 100 },
      { q: "night club", at: loc, limit: 100 },
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
