import axios from "axios";

export const serverAxios = axios.create({
  baseURL: "http://localhost:8081/",
});

export const serverAxiosLogin = axios.create({
  baseURL: "http://localhost:8086/",
});
