import axios from 'axios';
import DiscoverRequest from '../../interface/api/discover/request';
import DiscoverResponse from '../../interface/api/discover/response';
import { GlobalOptions, GlobalRequest } from '../options/globalOptions';
import { buildReqUri } from '../../utils/uriBuilder';

export default class discover implements GlobalRequest {
    private options: GlobalOptions;

    constructor(options: GlobalOptions) {
        this.options = options;
    }

    discover(
        options: DiscoverRequest,
        requiredParams: string[] = ['q', 'at']
    ): Promise<{
        data: {
            items: DiscoverResponse[];
        };
    }> {
        try {
            const uri = `${buildReqUri(
                this.options,
                options,
                requiredParams,
                '/v1/discover'
            )}`;
            return axios.get(uri);
        } catch (err) {
            throw err;
        }
    }
}
