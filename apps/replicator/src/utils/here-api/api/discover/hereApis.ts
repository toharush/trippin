import { discover } from "./request";
import { GlobalOptions } from "../../app";

export class HereApis extends discover {
  constructor(options: GlobalOptions) {
    super(options);
  }
}
