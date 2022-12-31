import { get_address_id_by_label, insert_address } from "../models/address";


export const get_address_id = async(label: string, countryCode: string | null, countryName: string | null, state: string | null, city: string | null, district: string | null, street: string | null, postalCode: string | null): Promise<number> => {
    const res = await get_address_id_by_label(label);

    if(res < 0){
        return await insert_address(label, countryCode, countryName, state, city, district, street, postalCode);
    } 

    return res;
}
