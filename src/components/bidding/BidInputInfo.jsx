import { Input } from "antd";
import React from "react";
import styled from "styled-components";

function BidInputInfo({ id, inputLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
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

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;
