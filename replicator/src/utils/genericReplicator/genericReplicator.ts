import { DiscoverRequest } from "../here-api/app";
import { Logger } from "winston";

export abstract class GenericReplicator {
    protected _logger: Logger;

    constructor(logger: Logger){
        this._logger = logger;
    }

    filterData<T>(item: T) {return {...item} }
    protected abstract start(options: DiscoverRequest, requiredParams?: string[]): Promise<void>;
}