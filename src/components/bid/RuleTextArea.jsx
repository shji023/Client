import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function RuleTextArea({ label, value }) {

  return (
    <StyledRoot>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper>
        <Data value={value} readOnly />
      </DataWrapper>
    </StyledRoot>
  );
}

export default RuleTextArea;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: span 4;
`;

const TitleWrapper = styled.div`
  font-size: 1.6rem;
  min-width: 14rem;
  height: 15rem;  
  border: 1px solid ${colors.tableLineGray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tableGray};
  border-right: none;
`;
const DataWrapper = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
`;
const Title = styled.p`
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
const Data = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  line-height: 2.3rem;
`;

