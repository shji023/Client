import { DatePicker } from "antd";
import React from "react";
import styled from "styled-components";

function InputOneDate({ id, inputLabel, handleCondition }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <DatePicker
        id={id}
        onChange={(date) =>
          handleCondition(id, date[0].format("YYYY-MM-DD"))
        }
        style={{ width: 200 }}
      />
    </StyledRoot>
  );
}

export default InputOneDate;

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
