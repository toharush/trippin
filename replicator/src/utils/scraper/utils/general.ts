import { GoogleScraper } from "../../here-api/interface/api/discover/response";

export interface googleResult {
    nikud: string,
    usually: string
}

export interface SearchTag {
    key: string;
    value: string;
}

export interface SearchTags {
    byClass?: SearchTag[];
    byId?: SearchTag[];
    byCustom?: SearchTag[]
}

export interface SearchEngine extends SearchTags {
  type: GoogleScraper
}
