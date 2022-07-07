import DashBoardCard from "components/dashboard/DashBoardCard";
import React from "react";
import styled from "styled-components";
function MyPage() {
  return (
    <StyledRoot>
      <CardWrapper>
        <DashBoardCard></DashBoardCard>
        <DashBoardCard></DashBoardCard>
        <DashBoardCard></DashBoardCard>
      </CardWrapper>
    </StyledRoot>
  );
}

export default MyPage;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
