import { Input } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function BidInputInfo({ id, inputLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <TitleWrapper>
        <Label htmlFor={id}>{inputLabel}</Label>
      </TitleWrapper>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handleCondition(id, e.target.value)}
        style={{ width: 300 }}
      />
    </StyledRoot>
  );
}

export default BidInputInfo;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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


const Label = styled.label`
  font-size: 1.4rem;
  width: 8rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
