import React from "react";
import styled from "styled-components";

function RuleTextArea({ label, value }) {

  return (
    <StyledRoot>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper>
        <Data>{value}</Data>
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
  height: 3rem;
  border: 1px solid rgb(225 225 225 / 0%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DataWrapper = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
`;
const Title = styled.p`
  font-size: 1.6rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
const Data = styled.textarea`
  font-size: 1.6rem;
  border: none;
  width: 100%;
  height: 100%;
  padding: 1rem;
  line-height: 2rem;
`;

