import React from "react";
import { Input } from 'antd';
import styled from "styled-components";

function InputSearch({ id, inputLabel, handlePoCondition, inputValue }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
        <Input.Search
          allowClear
          type="text" 
          id={id} 
          value={inputValue} 
          onChange={(e) => handlePoCondition(id, e.target.value)}
      />
    </StyledRoot>
  );
}

export default InputSearch;

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