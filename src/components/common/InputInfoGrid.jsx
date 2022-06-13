import { Input } from "antd";
import React from "react";
import styled from "styled-components";

function InputInfoGrid({ id, idx, stateValue, setStateValue }) {

  // console.log("InputInfoGrid", id, idx, stateValue)

  const handleChange = (id, value) => {

    const temp = stateValue;
    temp[idx][id] = value;
    setStateValue([...temp]);

  }


  return (
    <StyledRoot>
      <Input
        type="text"
        id={id}
        value={stateValue[idx][id]}
        onChange={(e) => handleChange(id, e.target.value)}
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
