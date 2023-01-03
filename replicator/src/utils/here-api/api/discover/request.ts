import { HereRequest, DiscoverResponse, GlobalOptions, buildReqUri, RateLimitError } from '../../app';
import axios, { AxiosError } from 'axios';
import logger from '../../../logger/logger';

export class Discover {
    private _options: GlobalOptions;
    
    constructor(options: GlobalOptions) {
        this._options = options;
    }

    discover = async(
        options: HereRequest,
        requiredParams: string[] = ['q']
    ): Promise<DiscoverResponse[]> => {
        try {
            const uri = `${buildReqUri(
                'discover',
                this._options,
                options,
                requiredParams
            )}`;
            return await (await axios.get(uri)).data.items;
        } catch (err) {
            if ((err as AxiosError)?.isAxiosError && (err as AxiosError).response?.status == 429) {
                throw new RateLimitError("Rate limit exeeded", 1000, 0, (new Date()).setDate(new Date().getDate()));
            } 
            logger.error(err);
            return [];
        }
    }
}
