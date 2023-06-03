import { EvaluateFunc } from "puppeteer";

export interface SearchTag {
  key: string;
  value: string;
  callback?: EvaluateFunc<any>;
}

export interface SearchTags {
  byClass?: SearchTag[];
  byId?: SearchTag[];
  byCustom?: SearchTag[];
}
