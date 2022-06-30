import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

// export const removeCookie = () => {
//   return cookies.remove("loginToken", { sameSite: "Lax", path: "/" });
// };

export const removeCookie = (name) => {
  return cookies.remove(name, { path: "/", secure: true, sameSite: "Lax" });
};
