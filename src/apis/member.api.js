import { serverAxiosLogin } from "apis/axios";
import axios from "axios";
import { getCookie } from "util/cookie";

const PREFIX_URL = "/member";

export const getUserData = async () => {
  try {
    //serverAxiosLogin.defaults.headers.common["Authorization"] = `Bearer${token}`;
    const data = await serverAxiosLogin.get(`${PREFIX_URL}/me`, {
      // const data = await axios.get(`${PREFIX_URL}/me`, {
      headers: {
        Authorization: `Bearer ${getCookie("loginToken")}`,
      },
    });

    console.log(data);
    return data.data.authority;
  } catch (e) {
    console.log(e);
  }
  return null;
};
