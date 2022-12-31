import { GenericReplicator } from "../../utils/genericReplicator/genericReplicator";
import { DiscoverRequest, DiscoverResponse, HereApis } from "../../utils/here-api/app";
import { hereApi } from "../../utils/api";
import { Logger } from "winston";
import { insert_place } from "../../controllers/place";

export class TrippinReplicator extends GenericReplicator {
    private _hereApi: HereApis;

    constructor(options: DiscoverRequest[], logger: Logger, requiredParams: string[] = ['q']) {
        super(logger);
        this._hereApi = hereApi();
        options.map(option => this.start(option, requiredParams))
    }

    protected async start(options: DiscoverRequest, requiredParams: string[]): Promise<void> {
        const items: DiscoverResponse[] = (await this._hereApi.discover(options, requiredParams));
        for(let item of items) {
            await insert_place(item);
        }
    }
}