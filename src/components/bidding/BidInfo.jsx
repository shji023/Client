import { Input } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function BidInfo({ label, value }) {
  const isLong = (label === '건명' || label === '담당자') ? true: false;
  console.log(isLong);
  return (
    <StyledRoot isLong={isLong}>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper isLong={isLong}>
        <Data>{value}</Data>
      </DataWrapper>
    </StyledRoot>
  );
}

export default BidInfo;

const StyledRoot = styled.div`
  display: flex;
  //justify-content: center;
  align-items: center;
  grid-column: ${({ isLong }) => (isLong ? 'span 2' : '')};
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
  width: ${({ isLong }) => (isLong ? '47.3rem' : '16rem')};
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
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

