export *  from './interface/api/discover/request';
export * from './interface/api/discover/response';
export * from './interface/api/global/headers';
import { GeneratedAPIs } from './api/api';
import { GlobalOptions } from './api/options/globalOptions';

export class HereApis extends GeneratedAPIs {
    constructor(options: GlobalOptions) {
        super(options);
    }
}
