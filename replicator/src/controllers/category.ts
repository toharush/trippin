import { upsert_category as  upsert_category_db} from "../models/category";

export const upsert_category = async(name: string, is_primary: boolean = false): Promise<number> => {
    return await upsert_category_db(name, is_primary);
}