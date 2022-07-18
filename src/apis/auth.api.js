import axios from "axios";
import { serverAxios } from "./axios";

const PREFIX_URL = "/auth";

export const postLogin = async (loginData) => {
  try {
    console.log(1234);
    const data = await serverAxios.post(`${PREFIX_URL}/login`, loginData);
    // const data = await axios.post(`${PREFIX_URL}/login`, loginData);
    console.log("data", data);
    if (data !== undefined) {
      return data.data;
    }
  } catch (e) {
    if (e.response !== undefined) {
      return e.response.data;
    }
  }
  return null;
};
