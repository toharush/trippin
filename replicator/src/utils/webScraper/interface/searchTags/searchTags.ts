export interface SearchTag {
    key: string;
    value: string;
}

export interface SearchTags {
    byClass?: SearchTag[];
    byId?: SearchTag[];
    byCustom?: SearchTag[]
}