import React from "react";
import styled from "styled-components";


function LabelInfo({ id, inputLabel, inputValue }) {
  return (
    <StyledRoot>
        <Label htmlFor={id}>{inputLabel}</Label>
        <Text id={id}>{inputValue}</Text>
    </StyledRoot>
  );
}

export default LabelInfo;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // border: 1px solid rgb(225 225 225 / 87%);
  // border-radius: 0.5rem;
  // padding: 2rem 0.5rem;
 
`;
const Label = styled.label`
  font-size: 1.6rem;
  width: 10rem;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1.6rem;
 
`;
