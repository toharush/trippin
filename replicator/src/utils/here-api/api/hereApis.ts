import { Discover } from "./discover/request";
import { GlobalOptions } from '../app';

export class HereApis extends Discover {

    constructor(options: GlobalOptions) {
        super(options);
    }
}
