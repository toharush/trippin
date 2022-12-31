import { discover } from "./request";
import { GlobalOptions } from '../../app';
import { Logger } from "winston";

export class HereApis extends discover {
    constructor(options: GlobalOptions) {
        super(options);
    }
}
