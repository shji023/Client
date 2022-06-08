import { Input } from "antd";
import React from "react";
import styled from "styled-components";

function InputInfo({ id, inputLabel, handlePoCondition, inputValue, isDisabled, mySize }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handlePoCondition(id, e.target.value)}
        style={{ width: mySize }}
        disabled={isDisabled}
      />
    </StyledRoot>
  );
}

export default InputInfo;

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
