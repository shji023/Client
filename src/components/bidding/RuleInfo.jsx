import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function RuleInfo({ label, value }) {
  const isTwoCell = (label === '라운드 시작/마감') ? true: false;
  return (
    <StyledRoot isTwoCell={isTwoCell}>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper isTwoCell={isTwoCell}>
        <Data>{value}</Data>
      </DataWrapper>
    </StyledRoot>
  );
}

export default RuleInfo;

const StyledRoot = styled.div`
  display: flex;
  //justify-content: center;
  align-items: center;
  //grid-column: ${({ isLong }) => (isLong ? 'span 2' : '')};
`;

const TitleWrapper = styled.div`
  font-size: 1.6rem;
  width: 12rem;
  height: 3rem;
  border: 1px solid rgb(225 225 225 / 0%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DataWrapper = styled.div`
  font-size: 1.6rem;
  width: ${({ isTwoCell }) => (isTwoCell ? '44rem' : '16rem')};
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  margin-right: 2rem;
`;
const Title = styled.p`
  font-size: 1.6rem;
  //width: 8rem;
  text-align: center;
`;
const Data = styled.p`
  font-size: 1.6rem;
  //width: 8rem;
  text-align: center;
`;

