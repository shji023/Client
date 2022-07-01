import { serverAxiosLogin } from "apis/axios";
import axios from "axios";

const PREFIX_URL = "/auth";

export const postLogin = async (loginData) => {
  try {
    console.log(1234);
    const data = await serverAxiosLogin.post(`${PREFIX_URL}/login`, loginData);
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
