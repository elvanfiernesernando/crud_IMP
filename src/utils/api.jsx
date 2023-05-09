import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  responseType: "json"
});

export { api }