import { Input } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputInfo({ id, inputLabel, handlePoCondition, inputValue }) {
    const isTowCell = (inputLabel === '건명') ? true: false;
  return (
    <StyledRoot isTowCell={isTowCell}>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handlePoCondition(id, e.target.value)}
        
      />
    </StyledRoot>
  );
}

export default InputInfo;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: ${({ isTowCell }) => (isTowCell ? 'span 2' :'')};
`;

const Label = styled.label`
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
