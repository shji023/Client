import React from "react";
import styled from "styled-components";
import { Refresh } from "assets/images";
import { colors } from "assets/styles/color";

function DashBoardCard() {
  return (
    <StyledRoot>
      <Top>
        <img src={Refresh} alt="refreshIcon" />
        <TopText>
          <p>Capacity</p>
          <p>$ 1,345</p>
        </TopText>
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
  width: 25rem;
  height: 12.5rem;
  padding: 1.7rem;
  margin-top: 2rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5.5rem;
  img {
    width: 4rem;
    height: 4rem;
  }
`;

const TopText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;
  p:nth-of-type(1) {
    font-size: 1.2rem;
    /* color: "#636363"; */
    color: white;
    font-family: "Pretendard-SemiBold";
  }
  p:nth-of-type(2) {
    font-size: 2.4rem;
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
