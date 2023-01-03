import { HereRequest, GlobalOptions, SerivceTypes } from '../../app';

export const buildReqUri = (
    service: SerivceTypes, 
    options: GlobalOptions,
    req: Partial<HereRequest>,
    requiredParams: string[],
): string => {
    let uri = `${options.url.replace('service', service)}/v1/${service}?`;
    let parsedObj = jsonParser(req);

    requiredParams?.map((key) => {
        if (!parsedObj[key]) {
            throw `Missing param '${key}'`;
        }
        uri +=
            uri[uri.length - 1] == '?'
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

const jsonParser = (stringValue: any) => {
    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    return objectValue;
};
