import axios from "axios";

export const fetch = axios.create({
  headers: {
    "content-type": "application/json",
  },
  baseURL: "http://localhost:8080/api/v1/graphql",
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
