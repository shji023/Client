import { serverAxios } from "apis/axios";

const PREFIX_URL = "/user";

export const getUserData = async (token) => {
  try {
    const data = await serverAxios.get(`${PREFIX_URL}/userInfo`, {
      headers: {
        Authorization: token,
      },
    });
    if (data.data.status === 200) {
      if (data.data.data !== undefined) {
        return {
          interest: data.data.data.interest,
          isMarketing: data.data.data.isMarketing,
        };
      }
    }
  } catch (e) {
    alert(e?.response?.data?.message);
  }
  return null;
};
