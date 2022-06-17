import { DatePicker } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputOneDate({ id, inputLabel, handleCondition }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <DatePicker
        id={id}
        onChange={(date) =>
          handleCondition(id, date.format("YYYY-MM-DD"))
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
