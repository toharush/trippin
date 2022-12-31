import * as hereModel from "../models/here";
import { DiscoverResponse } from "../utils/here-api/app";
import hash from "object-hash";
import { Console } from "console";
import { GoogleDatabaseInput } from "../models/google";

export const get_category_id = async(name: string): Promise<number> => {
    const res = await hereModel.get_category_by_name(name);

    if(res < 0){
        return await hereModel.insert_category(name);
    } 

    return res;
}

export const get_position_id = async(lat: number, lng: number): Promise<number> => {
    const res = await hereModel.get_position_id(lat, lng);

    if(res < 0){
        return await hereModel.insert_position(lat, lng);
    } 

    return res;
}


export const get_address_id = async(label: string, countryCode: string | null, countryName: string | null, state: string | null, city: string | null, district: string | null, street: string | null, postalCode: string | null): Promise<number> => {
    const res = await hereModel.get_address_id_by_label(label);

    if(res < 0){
        return await hereModel.insert_address(label, countryCode, countryName, state, city, district, street, postalCode);
    } 

    return res;
}

export const set_categories = async(name: string | undefined, id: string, primary: boolean = false) => {
    if(name){
        const catId = await get_category_id(name);
        if(await hereModel.get_categories(id, catId) < 0) {
            hereModel.insert_categories(id, catId, primary)
        }
    }
}



export const insert_place = async(item: DiscoverResponse) => {
    const pos = await get_position_id(item.position.lat, item.position.lng);
    const category = item.ontologyId ? await get_category_id(item.ontologyId) : null;
    const address = item.address?.label ? await get_address_id(item.address.label, item.address.countryCode || null, item.address.countryName || null, item.address.state || null, item.address.city || null, item.address.district || null, item.address.street || null, item.address.postalCode || null) : null;
    let place = await hereModel.get_place_by_id(item.id);

    if(place < 0) {
        place = await hereModel.insert_place(item.id, item.title, item.resultType, item.openingHours ? JSON.stringify(item.openingHours) : null, item.data_version || hash.sha1(item), new Date(), pos ? pos : null, category ? category : null, address);
    }
   
    
    for(let cat of item.categories ?? []) {
        set_categories(cat.name, item.id, cat.primary);
    }
    return place;  
}


export const get_places = async(limit: number, offset: number = 0) => {
    const res = await hereModel.get_places(limit, limit * offset);
    return res;
}

export const get_places_length = async() => {
    const res = await hereModel.get_place_count();
    return res;
}

export const upsert_google = async(googleDatabaseInput: GoogleDatabaseInput) => {
    const res: number = await hereModel.get_google_by_id(googleDatabaseInput.placeId);

    if(res > 0) {
        await hereModel.update_google(googleDatabaseInput);
    } else {
        await hereModel.insert_google(googleDatabaseInput);
    }
}
