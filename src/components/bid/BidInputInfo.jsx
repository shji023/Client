import { Input } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function BidInputInfo({ id, inputLabel, handleCondition, inputValue }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <StyledInput>
        <Input
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => handleCondition(id, e.target.value)}
          style={{ width: '100%' }}
        />
      </StyledInput>
      
    </StyledRoot>
  );
}

export default BidInputInfo;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
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

const StyledInput = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
  border-right: none;
  border-bottom: none;
`;