import { Input } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function QuotationInput({ id, priceLabel, currencyLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <StyledInput>
        <Input
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => handleCondition(id, e.target.value)}
          style={{ width: '100%' }}
        />
      </StyledInput>
      <Label htmlFor={id}>{priceLabel}{currencyLabel}</Label>
    </StyledRoot>
  );
}

export default QuotationInput;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1.6rem;
  min-width: 50rem;
  height: 3.5rem;
  border: 1px solid ${colors.tableLineGray};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tableGray};
`;

const StyledInput = styled.div`
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