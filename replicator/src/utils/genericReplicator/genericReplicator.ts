import { HereRequest, DiscoverResponse } from "../here-api/app";
import { Logger } from "winston";

export abstract class GenericReplicator {
    protected _logger: Logger;

    constructor(logger: Logger){
        this._logger = logger;
    }

    protected filterData?(item: DiscoverResponse, options?: HereRequest) :Promise<DiscoverResponse> | DiscoverResponse;
    protected abstract start(options: HereRequest, requiredParams?: string[]): Promise<void>;
}