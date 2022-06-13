import { Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

function InputInfoGrid({ params, stateValue, setStateValue, disabled }) {

  const field = params.colDef.field;
  const idx   = params.rowIndex;

  if(!disabled) disabled = false;

  return (
    <StyledRoot>
      <Input
        type={'text'}
        id={field}
        value={stateValue[idx][field]}
        onChange={(e) => {
          stateValue[idx][field] = e.target.value;
          setStateValue( state => [...state] )
        }}
        disabled={disabled}
        style={{ width: 200 }}
      />
    </StyledRoot>
  );
}

export default InputInfoGrid;

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