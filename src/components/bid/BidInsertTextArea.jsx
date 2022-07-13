import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function BidInsertTextArea({ id, inputLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <TitleWrapper>
        <Title>{inputLabel}</Title>
      </TitleWrapper>
      <DataWrapper>
        <Data
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => handleCondition(id, e.target.value)}
          style={{ width: "100%" }}
        />
      </DataWrapper>
    </StyledRoot>
  );
}

export default BidInsertTextArea;

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
  // justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
`;
const Title = styled.p`
  text-align: center;
  font-family: "Pretendard-SemiBold";
  font-size: 1.4rem;
`;
const Data = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  line-height: 2.3rem;
  outline: none;
  resize: none;
`;
