import DashBoardCard from "components/dashboard/DashBoardCard";
import DashBoardDataGrid from "components/dashboard/DashBoardDataGrid";
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
        <DashBoardDataGrid></DashBoardDataGrid>
      </Middle>
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

const Middle = styled.div``;
