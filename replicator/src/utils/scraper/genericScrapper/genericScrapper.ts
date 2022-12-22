import DiscoverResponse from "../../here-api/interface/api/discover/response";
import { SearchTags } from "../utils/general";

export declare class GenericScrapper {
    _searchTags: SearchTags;
    run(item: DiscoverResponse[]): Promise<void>;
    pageSelector(): Promise<any>;
}