import { Input } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";
import {StyledRoot} from './style'
function BidInfo({ label, value }) {
  const isLong = label === '건명' || label === '담당자' ? true: false;
  console.log(isLong);
  return (
    <StyledRoot isLong={isLong}>
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

// const StyledRoot = styled.div<{ isLong: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   grid-column: ${({ isLongg}) => (isLongg ? 'span 2' : '')};
// `;
const TitleWrapper = styled.div`
  font-size: 1.6rem;
  width: 13rem;
  height: 3rem;
  //background-color: ${colors.mainGray};
  border: 1px solid rgb(225 225 225 / 0%);
  //border-radius: 0.5rem 0 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DataWrapper = styled.div`
  font-size: 1.6rem;
  width: 20rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  //border-radius: 0 0.5rem 0.5rem 0;
`;
const Title = styled.p`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;
const Data = styled.p`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;

