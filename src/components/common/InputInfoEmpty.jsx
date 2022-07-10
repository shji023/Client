import { Input } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { getReg } from "hooks/CommonFunction";

function InputInfoEmpty({ spanCnt, }) {

  return (
    <StyledRoot spanCnt={spanCnt}>
      <TitleWrapper>
          <Title></Title>
      </TitleWrapper>
      <DataWrapper>
      </DataWrapper>
    </StyledRoot>
  );
}

export default InputInfoEmpty;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: ${({ spanCnt }) => (spanCnt ? "span " + spanCnt : "span 1")};
`;

const TitleWrapper = styled.div`
  font-size: 1.4rem;
  min-width: 14rem;
  height: 3.5rem;
  border: 1px solid ${colors.tableLineGray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tableGray};
  border-right: none;
  border-bottom: none;
`;

const DataWrapper = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
  border-right: none;
  border-bottom: none;
`;
const Title = styled.p`
  font-size: 1.4rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
