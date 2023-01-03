import { Address } from "../interface/address";
import { upsert_address } from "../models/address";

export const get_address = async(label: string, countryCode: string | null, countryName: string | null, state: string | null, city: string | null, district: string | null, street: string | null, postalCode: string | null): Promise<number> => {
    let address: Partial<Address> = {
        label: label,
    }

    if(countryCode) address.country_code = countryCode;
    if(countryName) address.country_name = countryName;
    if(state) address.state = state;
    if(city) address.city = city;
    if(district) address.district = district;
    if(street) address.street = street;
    if(postalCode) address.postal_code = postalCode;

    return await upsert_address(address);
}
