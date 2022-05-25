import React from "react";
import { Select } from 'antd';
import styled from "styled-components";

function InputSelect({ id, inputLabel, handlePoCondition, lov }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Select 
        defaultValue="선택" 
        id={id} 
        onChange={(e) => handlePoCondition(id, e.target.value)}
      >
      {/* <option value="">선택</option> */}
        {lov.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </StyledRoot>
  );
}

export default InputSelect;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 10rem;
  text-align: center;
`;