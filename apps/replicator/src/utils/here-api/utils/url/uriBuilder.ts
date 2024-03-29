import { DiscoverRequest, GlobalOptions } from "../../app";

export const buildReqUri = (
  options: GlobalOptions,
  req: DiscoverRequest,
  requiredParams: string[],
  subPath: string = ""
): string => {
  let uri = "";
  let parsedObj = jsonParser(req);

  uri += options.url + subPath + "?";

  requiredParams?.map((key) => {
    if (!parsedObj[key]) {
      throw `Missing param '${key}'`;
    }
    uri +=
      uri[uri.length - 1] == "?"
        ? `${key}=${parsedObj[key]}`
        : `&${key}=${parsedObj[key]}`;
  });

  Object.keys(req).map((key) => {
    if (!requiredParams.includes(key) && parsedObj[key]) {
      uri += `&${key}=${parsedObj[key]}`;
    }
  });

  return uri + `&apiKey=${options.apiKey}`;
};

const jsonParser = (stringValue: any) =>
  JSON.parse(JSON.stringify(stringValue));
