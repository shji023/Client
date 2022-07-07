import React from "react";
import styled from "styled-components";
import { Refresh } from "assets/images";
import { colors } from "assets/styles/color";

function DashBoardCard() {
  return (
    <StyledRoot>
      <Top>
        {/* <img src={Refresh} alt="refreshIcon" /> */}
        {/* <TopText> */}
        <p>구매신청</p>
        <p>완료 pr / 전체 pr</p>
        <p>6 / 312 건</p>
        {/* </TopText> */}
      </Top>
      <Hr />
      <Bottom>
        <img src={Refresh} alt="refreshIcon" />
        <p>Update Now</p>
      </Bottom>
    </StyledRoot>
  );
}

export default DashBoardCard;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border: 1px solid "#636363";
  background: linear-gradient(to right, #2b3254, #151928);
  width: 40rem;
  height: 17rem;
  padding: 2rem;
  margin-top: 2rem;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  height: 10rem;
  line-height: 1.3;
  /* img {
    width: 4rem;
    height: 4rem;
  } */
  p:nth-of-type(1) {
    font-size: 2.8rem;
    /* color: "#636363"; */
    color: white;
    font-family: "Pretendard-SemiBold";
  }
  p:nth-of-type(2) {
    font-size: 1.4rem;
    color: ${colors.themeBlue2};
    /* color: white; */
    font-family: "Pretendard-SemiBold";
    margin-left: auto;
  }
  p:nth-of-type(3) {
    font-size: 2.8rem;
    color: white;
    font-family: "Pretendard-SemiBold";
    margin-left: auto;
  }
`;

const TopText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;
  p:nth-of-type(1) {
    font-size: 1.4rem;
    /* color: "#636363"; */
    color: white;
    font-family: "Pretendard-SemiBold";
  }
  p:nth-of-type(2) {
    font-size: 2.8rem;
    color: white;
    font-family: "Pretendard-SemiBold";
  }
`;
const Hr = styled.hr`
  color: white;
  width: 100%;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }
  p {
    font-size: 1.2rem;
    color: "#636363";
    color: white;
  }
`;
