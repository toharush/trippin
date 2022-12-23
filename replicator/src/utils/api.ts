import { HereApis } from '../utils/here-api/app';
import dotenv from 'dotenv';

dotenv.config();
export const hereApi = (url?: string, apiKey?: string) => {
    return new HereApis({
        apiKey: apiKey || process.env.HERE_API_KEY || '',
        url: url || process.env.HERE_URL?.toString() || '',
    });
};
