import dotenv from 'dotenv';

dotenv.config();

export const schema = process.env.DB_SCHEMA || 'public';
export const table = process.env.DB_TABLE || 'trippin';
export const start_value = 1;
export const min_value = 1;
export const cache = 1;
export const increase = 1;
export const max_value = 999999;

export const enum TABLES {
    ADDRESS = "address",
    PLACE = "place",
    CATEGORY = "category",
    POSITION = "position",
    EXTRA_CATEGORIES = "extra_categories",
    GOOGLE = "google"
}
