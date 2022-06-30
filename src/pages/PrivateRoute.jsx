import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "util/cookie";

const getRole = () => {
  let user = "nonmember";
  if (getCookie("authority")) {
    user = getCookie("authority");
  }
  return user;
};
const getIsAccessible = (role1, role2, role3) => {
  let isAccessible = false;
  if (getCookie("authority")) {
    const auth = getCookie("authority");
    isAccessible = role1 === auth || role2 === auth || role3 === auth ? true : false;
  }
  return isAccessible;
};
const PrivateRoute = ({ role1, role2, role3, children }) => {
  const userRole = getRole();
  const isAccessible = getIsAccessible(role1, role2, role3);
  return isAccessible ? (
    children
  ) : userRole === "nonmember" ? (
    <>
      {alert("접근 권한이 없습니다. 로그인 후 이용해주세요")}
      <Navigate to="/login" />
    </>
  ) : (
    <>
      {alert("접근 권한이 없습니다.")}
      <Navigate to="/" />
    </>
  );
};

export default PrivateRoute;
