import { TrippinReplicator } from "./replicators/trippinReplicator/trippingReplicator";
import { GoogleScraper } from "./scrapers/google/app";
import { getBrowser } from "./utils/browser/browser";
import { drop_database, init_database } from "./utils/database/init-db";
import logger from "./utils/logger/logger";
import dotenv from 'dotenv';
import { RateLimitError, sleep } from "./utils/here-api/app";

dotenv.config();

export const HereTimeLimit = Number(process.env.HERE_TIME_LIMIT_MS) || 86400000;
const HereDelay = Number(process.env.HERE_API_DELAY_MS) || 3000;
const HereRateLimit = Number(process.env.HERE_RATE_LIMIT) || 6;
const HereCategories = process.env.CATEGORIES?.split(",") || [];

const createReplicator = async(category: string, coordinates: string, limit: number) => {
        try {
                for(let i: number = 0; i < HereRateLimit/HereCategories.length; i++) {
                        logger.debug(`Here Replicator started at: ${coordinates} limit of ${limit * HereCategories.length} categories: ${HereCategories} (limit for category is: ${limit}). Rate Limit is ${i}/${HereRateLimit}`)
                        await new TrippinReplicator({q: category, at: coordinates, limit: limit}, logger).init();
                        await sleep(HereDelay);
                }
        } catch (err){
                if(err instanceof RateLimitError) logger.error(err);
        }
}

(async() => {
        await init_database();
        await HereCategories.map(async(category) => await createReplicator(category, "37.6,-95.665", 100));
         setInterval(async() => {
                await HereCategories.map(async(category) => await createReplicator(category, "37.6,-95.665", 100));
         }, HereTimeLimit)
        
        new GoogleScraper(await getBrowser(true), logger, 1)

})();

