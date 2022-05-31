import { Select } from "antd";
import React from "react";
import styled from "styled-components";
function BidInputSelect({ id, inputLabel, handleCondition, lov }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Select
        defaultValue="선택"
        id={id}
        onChange={(e) => {
          handleCondition(id, e);
        }}
        style={{ width: 300 }}
      >
        <Select.Option value="">선택</Select.Option>
        {lov.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </StyledRoot>
  );
}
export default BidInputSelect;

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
