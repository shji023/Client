import { Select } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputSelect({ id, inputLabel, handlePoCondition, lov }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Select
        defaultValue="선택"
        id={id}
        onChange={(e) => {
          handlePoCondition(id, e);
        }}
        style={{ width: '100%' }}
      >
        <Select.Option value="">선택</Select.Option>
        {lov.map((option) => (
          <Select.Option key={option[0]} value={option[1]}>
            {option[1]}
          </Select.Option>
        ))}
      </Select>
    </StyledRoot>
  );
}
export default InputSelect;


const StyledRoot = styled.div`
  display: flex;
  align-items: center;
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