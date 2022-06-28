import { serverAxiosLogin } from "apis/axios";

const PREFIX_URL = "/auth";

export const postLogin = async (loginData) => {
  try {
    const data = await serverAxiosLogin.post(`${PREFIX_URL}/login`, loginData);
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
