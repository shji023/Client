import { Select } from "antd";
import React from "react";
import styled from "styled-components";
function InputSelect({ params, stateValue, setStateValue, lov }) {
  
  
  const field = params.colDef.field;
  const idx   = params.rowIndex;
  let value = null;
  if(stateValue[idx]) value = stateValue[idx][field];
  
  return (
    <StyledRoot>
      <Select
        defaultValue={value}
        // defaultValue="선택"
        id={field}
        onChange={(e) => {
          console.log("value : ", e);
          if(stateValue[idx]){
            stateValue[idx][field] = e;
            setStateValue( state => [...state] )
          }
        }}
        style={{ width: "100%"   }}
      >
        <Select.Option value="">선택</Select.Option>
        {lov.map((option) => (
          <Select.Option key={option[0]} value={option[0]}>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;
