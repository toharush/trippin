import { DiscoverRequest, DiscoverResponse, GlobalOptions, buildReqUri } from '../../app';
import axios from 'axios';

export class discover {
    private options: GlobalOptions;
    
    constructor(options: GlobalOptions) {
        this.options = options;
    }

    async discover(
        options: DiscoverRequest,
        requiredParams: string[] = ['q']
    ): Promise<DiscoverResponse[]> {
        try {
            const uri = `${buildReqUri(
                this.options,
                options,
                requiredParams,
                '/v1/discover'
            )}`;
            return await (await axios.get(uri)).data.items;
        } catch (err) {
            throw err;
        }
    }
}
