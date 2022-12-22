import discover from './discover/request';
import { GlobalOptions } from './options/globalOptions';

export class GeneratedAPIs extends discover {
    constructor(options: GlobalOptions) {
        super(options);
    }
}
