import { upsert_categories as  upsert_categories_db} from "../models/extra_categories";
import { upsert_category } from "./category";

export const upsert_categories = async( id: string, name: string | undefined, primary: boolean = false) => {
    if(name){
        const catId = await upsert_category(name);
        if(catId > 0) {
            upsert_categories_db({place_id: id, category_id: catId, is_primary: primary})
        }
    }
}