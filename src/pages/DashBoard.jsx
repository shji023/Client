import DashBoardCard from "components/dashboard/DashBoardCard";
import DashBoardDataGrid from "components/dashboard/DashBoardDataGrid";
import DashBoardLine from "components/dashboard/DashBoardLine";
import DashBoardPieChart from "components/dashboard/DashBoardPieChart";
import React from "react";
import styled from "styled-components";
function MyPage() {
  return (
    <StyledRoot>
      <Top>
        <DashBoardCard></DashBoardCard>
        <DashBoardCard></DashBoardCard>
        <DashBoardCard></DashBoardCard>
      </Top>
      <Middle>
        <Left>
          <Title>마감 기한 임박 입찰 목록</Title>
          <DashBoardDataGrid></DashBoardDataGrid>
        </Left>
        <Right>
          <Title>입찰 Status</Title>
          <DashBoardPieChart></DashBoardPieChart>
        </Right>
      </Middle>
      <Title>구매계약 종류 분포</Title>
      <DashBoardLine></DashBoardLine>
    </StyledRoot>
  );
}

export default MyPage;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Middle = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-family: "Pretendard-SemiBold";
  height: 3rem;
  margin-right: auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`;
