import { serverAxios } from "apis/axios";

const PREFIX_URL = "/auth";

export const postLogin = async (loginData) => {
  try {
    const data = await serverAxios.post(`${PREFIX_URL}/signin`, loginData);
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
