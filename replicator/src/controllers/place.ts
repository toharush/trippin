import { get_places as get_places_db, get_place_count as get_place_count_db, upsert_place as upsert_place_db} from '../models/place';
import { DiscoverResponse } from '../utils/here-api/app';
import { get_address } from './address';
import { upsert_category } from './category';
import { upsert_categories } from './extra_categories';
import { upsert_position } from './position';
import { Place } from '../interface/place';
import { QueryResult } from '../utils/database/client';

export const get_places = async(limit: number, offset: number = 0) => {
    const res = await get_places_db(limit, limit * offset);
    return res;
}

export const get_place_count = async() => {
    const res = await get_place_count_db();
    return res;
}

export const upsert_place = async(item: DiscoverResponse) => {
    const category = item.ontologyId ? await upsert_category(item.ontologyId, true) : QueryResult.EMPTY_PARAMS;
    const address = item.address?.label ? await get_address(
                    item.address.label, item.address.countryCode || null, item.address.countryName || null, 
                    item.address.state || null, item.address.city || null, item.address.district || null, 
                    item.address.street || null, item.address.postalCode || null) : QueryResult.EMPTY_PARAMS;

    let new_place: Partial<Place> = { 
        id: item.id,
        type: item.ontologyId,
        position_id: await upsert_position(item.position.lat, item.position.lng)
    }
   
    if(category > 0) new_place.category_id = category;
    if(address > 0) new_place.address_id = address;
    if(item.title) new_place.title = item.title;
    if(item.openingHours) new_place.open_hours = JSON.stringify(item.openingHours);
    if(item.data_version) new_place.data_version = item.data_version;

    const place = await upsert_place_db(new_place);
    
    if(place) {
        for(let cat of item.categories ?? []) {
            await upsert_categories( item.id, cat.name, cat.primary);
        }
    }

    return place;  
}
