import { HereApis } from "../utils/here-api/app";
import dotenv from "dotenv";

dotenv.config();

export const hereApi = () => {
  return new HereApis({
    apiKey: process.env.HERE_API_KEY || "",
    url: process.env.HERE_URL?.toString() || "",
  });
};
