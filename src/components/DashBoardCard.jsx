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
      <hr />
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
`;

const Top = styled.div`
  display: flex;
  img {
    width: 4rem;
    height: 4rem;
  }
`;

const TopText = styled.div`
  display: flex;
  flex-direction: column;
  p:nth-of-type(1) {
    font-size: 1.2rem;
    color: "#636363";
  }
  p:nth-of-type(2) {
    font-size: 2.2rem;
  }
`;

const Bottom = styled.div`
  display: flex;
  img {
    width: 2rem;
    height: 2rem;
  }
  p {
    font-size: 1.2rem;
    color: "#636363";
  }
`;
