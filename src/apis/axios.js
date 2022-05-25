import axios from "axios";

export const serverAxios = axios.create({
  baseURL: "http://192.168.0.9:8081/",
});
