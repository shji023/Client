import axios from "axios";

export const serverAxios = axios.create({
  baseURL: "http://54.251.209.237:8087/",
});

export const serverAxiosLogin = axios.create({
  baseURL: "http://54.251.209.237:8087/",
});
