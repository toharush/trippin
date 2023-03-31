import { get_places as get_places_db, get_place_by_id, get_place_count as get_place_count_db, insert_place as insert_place_db} from '../models/place';
import hash from "object-hash";
import { DiscoverResponse } from '../utils/here-api/app';
import { get_address_id } from './address';
import { get_category_id } from './category';
import { set_categories } from './extra_categories';
import { get_position_id } from './position';

export const get_places = async(limit: number, offset: number = 0) => {
    const res = await get_places_db(limit, limit * offset);
    return res;
}

export const get_place_count = async() => {
    const res = await get_place_count_db();
    return res;
}

export const insert_place = async(item: DiscoverResponse) => {
    const pos = await get_position_id(item.position.lat, item.position.lng);
    const category = item.ontologyId ? await get_category_id(item.ontologyId) : null;
    const address = item.address?.label ? await get_address_id(item.address.label, item.address.countryCode || null, item.address.countryName || null, item.address.state || null, item.address.city || null, item.address.district || null, item.address.street || null, item.address.postalCode || null) : null;
    let place = await get_place_by_id(item.id);

    if(place < 0) {
        place = await insert_place_db(item.id, item.title, item.resultType, item.openingHours ? JSON.stringify(item.openingHours) : null, item.data_version || hash.sha1(item), new Date(), pos ? pos : null, category ? category : null, address);
    }
   
    
    for(let cat of item.categories ?? []) {
        set_categories(cat.name, item.id, cat.primary);
    }
    return place;  
}
