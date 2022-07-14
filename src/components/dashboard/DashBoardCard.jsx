import React from "react";
import styled from "styled-components";
import { Refresh } from "assets/images";
import { colors } from "assets/styles/color";

function DashBoardCard({ title, total, count }) {
  return (
    <StyledRoot>
      <Top>
        <p>{title}</p>
        {title === "구매신청" ? (
          <p>RFQ생성 대기 PR / 전체 </p>
        ) : title === "RFQ" ? (
          <p>입찰 대기 RFQ / 전체 </p>
        ) : (
          <p> 낙찰 처리 대기 입찰 / 전체</p>
        )}
        <p>
          {count} / {total} 건
        </p>
      </Top>
      <Hr />
      <Bottom>
        {/* <img src={Refresh} alt="refreshIcon" />
        <p>Update Now</p> */}
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
  width: 32%;
  height: 17rem;
  padding: 2rem;
  margin-top: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;
  line-height: 1.3;
  font-family: "Pretendard-SemiBold";
  font-size: 2.8rem;
  color: white;

  p:nth-of-type(2) {
    font-size: 1.4rem;
    color: ${colors.themeBlue2};
    margin-left: auto;
  }
  p:nth-of-type(3) {
    margin-left: auto;
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
    :hover {
      cursor: pointer;
    }
  }
  p {
    font-size: 1.2rem;
    color: "#636363";
    color: white;
    :hover {
      cursor: pointer;
    }
  }
`;
