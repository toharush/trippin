import axios from "axios";
import { APP_HOST, APP_PORT } from "../config";

export const fetch = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: `http://${APP_HOST}:${APP_PORT}/api/v1/graphql`,
});

const fetchGql = async (query: string) => {
  return await fetch({
    method: "POST",
    data: {
      query: query,
    },
  });
};

export default fetchGql;
