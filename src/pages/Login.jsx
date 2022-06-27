import { getUserData } from "apis/user.api";
import { PoscoLogo } from "assets/images";
import { colors } from "assets/styles/color";
import StyledInput from "components/login/StyledInput";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styled from "styled-components";
import { setCookie } from "util/cookie";
function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    // 값 저장
    email: "",
    password: "",
  });
  // const [userStatusData, setUserStatusData] = useRecoilState(userStatusState);
  // const [userData, setUserData] = useRecoilState(userState);
  const [userData, setUserData] = useState(null);
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
    const token = await getUserStatusData();
    const isSuccess = await getUserDetailData(token);
    isSuccess && navigate("/");
  };

  const getUserStatusData = async () => {
    const data = await postLogin(loginData);
    if (data) {
      if (data.status === 200) {
        setCookie("loginToken", data.token, {
          path: "/",
          secure: true,
          sameSite: "none",
        });
        return data.token;
      } else {
        if (data.message === "아이디가 존재하지 않습니다") {
          setIsConditionMet({ email: false, pwd: true });
        } else if (data.message === "비밀번호가 틀렸습니다") {
          setIsConditionMet({ email: true, pwd: false });
        }
      }
    } else {
      alert("네트워크가 좋지 않습니다");
    }
    return "";
  };

  const getUserDetailData = async (token) => {
    if (token) {
      const data = await getUserData(token);
      if (data !== undefined) {
        setUserData(data);
        return true;
      } else {
        alert("네트워크가 좋지 않습니다");
      }
    }
    return false;
  };

  // const handleLoginEnter = async (e) => {
  //   if (e.keyCode === 13) {
  //     const token = await getUserStatusData();
  //     const isSuccess = await getUserDetailData(token);
  //     isSuccess && history.push("/");
  //   }
  // };

  useEffect(() => {
    if (userData) {
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
            placeHolder="이메일을 입력해 주세요"
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
            //onKeyUp={handleLoginEnter}
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
