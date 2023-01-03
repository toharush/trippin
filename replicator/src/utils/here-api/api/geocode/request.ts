import { Address, Position, GlobalOptions, buildReqUri, HereRequest } from '../../app';
import axios from 'axios';

export class Geocode {
    private _options: GlobalOptions;
    
    constructor(options: GlobalOptions) {
        this._options = options;
    }

    geocode = async(
        options: Partial<HereRequest>,
        requiredParams: string[] = ['q']
    ): Promise<Position> => {
        try {
            const uri = `${buildReqUri(
                'geocode',
                this._options,
                options,
                requiredParams,
            )}`;
            const a = await (await axios.get(uri)).data.items[0].position;
            console.log(a);
            return a;
        } catch (err) {
            throw err;
        }
    }

    reverseGeocode = async(
        options: Partial<HereRequest>,
        requiredParams: string[] = ['at']
    ): Promise<Address> => {
        try {
            const uri = `${buildReqUri(
                'revgeocode',
                this._options,
                options,
                requiredParams,
            )}`;
            const a: Address = await (await axios.get(uri)).data.items[0].address;
            console.log(a);
            return a;
        } catch (err) {
            throw err;
        }
    }
}

"https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey={YOUR_API_KEY}&searchtext=Rome"
