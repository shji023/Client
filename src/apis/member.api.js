import { serverAxios, serverAxiosLogin, serverAxiosTest } from "apis/axios";
import { getCookie } from "util/cookie";

const PREFIX_URL = "/member";
const config = {
  headers: {
    // Authorization: `Bearer ${getCookie("loginToken")}`,
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDIiLCJhdXRoIjoiUk9MRV9CVVlFUiIsImV4cCI6MTY1NjQxNDM3M30.t-pwwCR3a30vdPlxCFsw-GcQZiT4adj9AbZa8dvjY2ov75NKw4_zO_FY38oyP-vIrQShTxy5LWltgWhItBzLYg",
  },
};
const bodyParameters = {
  key: "value",
};

export const getUserData = async (token) => {
  try {
    //serverAxiosLogin.defaults.headers.common["Authorization"] = `Bearer${token}`;
    const data = await serverAxiosLogin.get(`${PREFIX_URL}/me`, {
      headers: {
        // "Content-Type": `application/json;charset=UTF-8`,
        // Accept: "application/json",
        Authorization: "Bearer " + token,

        // 추가
        // "Access-Control-Allow-Origin": `http://localhost:3000`,
        // "Access-Control-Allow-Credentials": "true",
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    alert(e);
  }
  return null;
};

export const getTest = async () => {
  try {
    //serverAxiosLogin.defaults.headers.common["Authorization"] = `Bearer${token}`;
    const data = await serverAxiosLogin.get(`${PREFIX_URL}/me2`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDIiLCJhdXRoIjoiUk9MRV9CVVlFUiIsImV4cCI6MTY1NjQxNTU0NH0.bzn-0CGd2YO6TxhuclbCSli6bvxlEA0P_ocixzQRL02d_vRz71TvmQb4W5DEAqGtAJZgWVC8yZ3s7vAxxhEtnA",
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    alert(e);
  }
  return null;
};
