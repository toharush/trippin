import {
  DiscoverRequest,
  DiscoverResponse,
  GlobalOptions,
  buildReqUri,
} from "../../app";
import axios from "axios";
import hash from "object-hash";

export class discover {
  private _options: GlobalOptions;

  constructor(options: GlobalOptions) {
    this._options = options;
  }

  async discover(
    options: DiscoverRequest,
    requiredParams: string[] = ["q"]
  ): Promise<DiscoverResponse[]> {
    try {
      const uri = `${buildReqUri(
        this._options,
        options,
        requiredParams,
        "/v1/discover"
      )}`;
      return await (await axios.get(uri)).data.items.map(
        (item: DiscoverResponse) => ({
          ...item,
          id: `${item.id.substring(item.id.lastIndexOf(":") + 1)}:${options.q}`,
          ontologyId:
            item.ontologyId?.substring(item.ontologyId?.lastIndexOf(":") + 1) ||
            item.ontologyId ||
            options.q,
          data_version: hash.sha1(item),
        })
      );
    } catch (err) {
      throw err;
    }
  }
}
