import { get_position_id, upsert_position as upsert_position_db } from "../models/position";

export const upsert_position = async(lat: number, lng: number): Promise<number> => {
    const pos = await get_position_id({
        lat: lat,
        lng: lng
    });
    if(pos > 0) return pos;
    else {
        return await upsert_position_db({
            lat: lat,
            lng: lng
        });
    }
}