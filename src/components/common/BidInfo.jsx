import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function BidInfo({ label, value }) {
  const isTowCell = (label === '건명' || label === '담당자' || label === '라운드 시작/마감') ? true: false;
  const isFourCell = (label === '부가조건') ? true: false;
  return (
    <StyledRoot isTowCell={isTowCell} isFourCell={isFourCell}>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper>
        <Data>{value}</Data>
      </DataWrapper>
    </StyledRoot>
  );
}

export default BidInfo;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: ${({ isTowCell }) => (isTowCell ? 'span 2' : ({ isFourCell }) => (isFourCell ? 'span 4' : ''))};
`;

const TitleWrapper = styled.div`
  font-size: 1.6rem;
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
  font-size: 1.6rem;
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
  font-size: 1.6rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
const Data = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;