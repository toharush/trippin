import { GenericReplicator } from "../../utils/genericReplicator/genericReplicator";
import { HereRequest, DiscoverResponse, HereApis } from "../../utils/here-api/app";
import { hereApi } from "../../utils/api";
import { Logger } from "winston";
import hash from "object-hash";
import { upsert_place } from "../../controllers/place";

export class TrippinReplicator extends GenericReplicator {
    private _hereApi: HereApis;
    private _options: HereRequest;
    private _requiredParams: string[] = ['q']

    constructor(options: HereRequest, logger: Logger, requiredParams: string[] = ['q']) {
        super(logger);
        this._hereApi = hereApi();
        this._options = options;
        this._requiredParams = requiredParams;
    }

    init = async() => {
        await this.start(this._options, this._requiredParams);
    }

    protected start = async(options: HereRequest, requiredParams: string[]): Promise<void> => {
        const items: DiscoverResponse[] = (await this._hereApi.discover(options, requiredParams));        
        for(let item of items) {
            await upsert_place(this.filterData(item, options));
        }
    }
    
    protected filterData = (item: DiscoverResponse, options?: HereRequest): DiscoverResponse => ({
        ...item,
        id: `${item.id.substring(item.id.lastIndexOf(":") + 1)}:${options?.q}`,
        ontologyId: item.ontologyId?.substring(item.ontologyId?.lastIndexOf(":") + 1) || item.ontologyId || options?.q,
        data_version: hash.sha1(item),
    });
}