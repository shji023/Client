import { postLogin } from "apis/auth.api";
import { getUserData } from "apis/member.api";
import { PoscoLogo } from "assets/images";
import { colors } from "assets/styles/color";
import StyledInput from "components/login/StyledInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import { getCookie, setCookie } from "util/cookie";
function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    // 값 저장
    email: "",
    password: "",
  });

  const [isConditionMet, setIsConditionMet] = useState({
    email: true,
    pwd: true,
  });

  const errMsg = {
    email: "가입되지 않은 이메일입니다",
    pwd: "비밀번호를 다시 확인해 주세요",
  };

  const idInputChange = (value) => {
    if (typeof value === "string") setLoginData({ ...loginData, email: value });
  };
  const pwdInputChange = (value) => {
    if (typeof value === "string") setLoginData({ ...loginData, password: value });
  };

  const handleLoginBtn = async () => {
    await getUserStatusData();
    const userAuthority = await getUserData(getCookie("loginToken"));
    if (userAuthority) {
      setCookie("authority", userAuthority.authority, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      setCookie("email", userAuthority.email, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      setCookie("site_id", userAuthority.site_id, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
    }
    userAuthority && navigate("/");
  };

  const getUserStatusData = async () => {
    const data = await postLogin(loginData);
    console.log(data);
    if (data) {
      setCookie("loginToken", data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "Lax",
      });
      return data.accessToken;

      // if (data.message === "아이디가 존재하지 않습니다") {
      //   setIsConditionMet({ email: false, pwd: true });
      // } else if (data.message === "비밀번호가 틀렸습니다") {
      //   setIsConditionMet({ email: true, pwd: false });
      // }
    } else {
      alert("존재하지 않는 계정입니다");
    }
    return "";
  };

  const handleLoginEnter = async (e) => {
    if (e.keyCode === 13) {
      await getUserStatusData();
      const userAuthority = await getUserData(getCookie("loginToken"));
      if (userAuthority) {
        setCookie("authority", userAuthority.authority, {
          path: "/",
          secure: true,
          sameSite: "Lax",
        });
        setCookie("email", userAuthority.email, {
          path: "/",
          secure: true,
          sameSite: "Lax",
        });
        setCookie("site_id", userAuthority.site_id, {
          path: "/",
          secure: true,
          sameSite: "Lax",
        });
      }
      userAuthority && navigate("/");
    }
  };

  useEffect(() => {
    if (getCookie("loginToken")) {
      alert("이미 로그인이 되어있습니다. ");
      navigate("/");
    }
  }, []);

  return (
    <LoginContainer>
      <LogoWrapper>
        <img src={PoscoLogo} alt="poscoLogo"></img>
      </LogoWrapper>
      <LoginformWrapper>
        <Form>
          <StyledInput
            placeHolder="아이디를 입력해 주세요"
            width="40.6rem"
            height="6rem"
            margin="0 0 0.9rem 0"
            onChange={idInputChange}
            isConditionMet={isConditionMet.email}
            errorMsg={errMsg.email}
            isPw={false}
          />
          <StyledInput
            placeHolder="비밀번호를 입력해 주세요"
            width="40.6rem"
            height="6rem"
            isPw={true}
            onChange={pwdInputChange}
            isConditionMet={isConditionMet.pwd}
            errorMsg={errMsg.pwd}
            onKeyUp={handleLoginEnter}
          />
        </Form>
      </LoginformWrapper>
      {/* <LoginBtn>로그인</LoginBtn> */}
      <LoginBtn onClick={handleLoginBtn}>로그인</LoginBtn>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = Styled.div`
  display : flex;
  position: relative;
  top: -10rem;
  flex-direction : column;
  align-items : center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LogoWrapper = Styled.div`
  margin-bottom : 60px;
  img {
    width: 27rem;
    height: 10.5rem;
  }
`;

const LoginBtn = Styled.button`
  margin-top : 1.4rem;
  border-radius: 0.4rem;
  background: linear-gradient(to right, #005386,${colors.themeBlue3} );
  width: 40.6rem;
  height: 6rem;
  color : white;
  font-size : 1.6rem;
  font-weight : bold;
  :hover {
    cursor:pointer;
  }
`;

const LoginformWrapper = Styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
`;

const Form = Styled.form`
  width : 100%;
`;
