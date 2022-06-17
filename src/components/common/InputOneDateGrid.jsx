import { DatePicker } from "antd";
import moment from "moment";
import React from "react";
import styled from "styled-components";

function InputOneDateGrid({ params, stateValue, setStateValue, handleCondition }) {

  const dateFormat = "YYYY-MM-DD";
  const field = params.colDef.field;
  const idx   = params.rowIndex;
  let value = null;
  if(stateValue[idx]) {
    value = (
      (!stateValue[idx][field]) || (stateValue[idx][field] === "") 
      ? null : moment(stateValue[idx][field], dateFormat));
  }

  return (
    <StyledRoot>
      <DatePicker
        id={field}
        defaultValue={value}
        onChange={(date) => {
          console.log("date", date);
          stateValue[idx][field] = date.format("YYYY-MM-DD");
          setStateValue( state => [...state] )
        }}
        style={{ width: 200 }}
        allowClear={false}
      />
    </StyledRoot>
  );
}

export default InputOneDateGrid;

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
