import { Input, Button, Modal } from "antd";
import { getSearchBuyerList } from "apis/buyer.api";
import React, { useEffect, useState }  from "react";
import styled from "styled-components";


function ModalSearch({ inputLabel, id, inputValue, setInputValue, onPressEnter, inputRef }) {

  const handleChange = (/* key, */ value) => {

    // const tempInputValue = { ...inputValue };
    // tempInputValue[key] = value;
    // setInputValue(tempInputValue);

    setInputValue(value);
  };

  const handleEnter = (value) => {
    setInputValue(value);
    onPressEnter();
  }

  return (
    <>
      <StyledRoot>
        <Label htmlFor={id}>{inputLabel}</Label>
        <Input
          ref={inputRef}
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => handleChange(/* id, */ e.target.value)}
          onPressEnter={(e) => handleEnter(/* id, */ e.target.value)}
          style={{ width: 200 }}
        />
      </StyledRoot>
      
      </>
  );
}

export default ModalSearch;

const StyledRoot = styled.div`
  display: row;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
  margin-right: 1rem;
`;
