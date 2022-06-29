import { serverAxiosLogin } from "apis/axios";
import { getCookie } from "util/cookie";

const PREFIX_URL = "/member";

export const getUserData = async () => {
  try {
    //serverAxiosLogin.defaults.headers.common["Authorization"] = `Bearer${token}`;
    const data = await serverAxiosLogin.get(`${PREFIX_URL}/me`, {
      headers: {
        Authorization: `Bearer ${getCookie("loginToken")}`,
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    alert(e);
  }
  return null;
};
