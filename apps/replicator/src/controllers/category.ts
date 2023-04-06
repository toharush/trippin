import { get_category_by_name, insert_category } from "../models/category";

export const get_category_id = async(name: string): Promise<number> => {
    const res = await get_category_by_name(name);

    if(res < 0){
        return await insert_category(name);
    } 

    return res;
}