export interface DiscoverRequest {
    q: string;
    at?: string;
    in?: string;
    limit?: number;
    route?: string;
    lang?: string;
    politicalView?: string;
    show?: string;
}
