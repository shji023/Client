import { Input } from "antd";
import React from "react";
import styled from "styled-components";

function QuotationInput({ id, priceLabel, currencyLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handleCondition(id, e.target.value)}
        style={{ width: 300 }}
      />
      <Label htmlFor={id}>{priceLabel}{currencyLabel}</Label>
    </StyledRoot>
  );
}

export default QuotationInput;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 40rem;
  text-align: center;
`;
