import { Input, DatePicker } from "antd";
import React from "react";
import styled from "styled-components";

function InputDate({ id, inputLabel, handlePoCondition, inputValue }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <DatePicker
        showTime
        id={id}
        onChange={(date) => handlePoCondition(id, date.format('YYYY/MM/DD HH:mm:ss'))}
        style={{ width: 200 }}
      />
    </StyledRoot>
  );
}

export default InputDate;

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
