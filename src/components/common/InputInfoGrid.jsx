import { Input } from "antd";
import { getReg } from "hooks/CommonFunction";
import React, { useState } from "react";
import styled from "styled-components";

function InputInfoGrid({ params, stateValue, setStateValue, disabled, type }) {

  const field = params.colDef.field;
  const idx   = params.rowIndex;
  let value = null;
  if(!disabled) disabled = false;
  if(stateValue[idx]) value = stateValue[idx][field];// idx : 행, field : 컬럼명

  return (
    <StyledRoot>
      <Input
        type={'text'}
        id={field}
        value={value}
        // onChange={(e) => {
        //   stateValue[idx][field] = e.target.value;
        //   setStateValue( state => [...state] )
        // }}
        onChange={(e) => {
          const v = e.target.value;
          if (!type || (type && getReg(type).test(v)) || v === "") {
            stateValue[idx][field] = e.target.value;
            setStateValue( state => [...state] )
          }
        }}
        disabled={disabled}
        style={{ width: "100%", height: '3.3rem' }}
      />
    </StyledRoot>
  );
}

export default InputInfoGrid;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;