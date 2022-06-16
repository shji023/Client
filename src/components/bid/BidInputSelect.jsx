import { Select } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function BidInputSelect({ id, inputLabel, handleCondition, lov }) {
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <StyledSelect>
        <Select
          defaultValue="선택"
          id={id}
          onChange={(e) => {
            handleCondition(id, e);
          }}
          style={{ width: '100%' }}
        >
          <Select.Option value="">선택</Select.Option>
          {lov.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </StyledSelect>
    </StyledRoot>
  );
}
export default BidInputSelect;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  font-size: 1.4rem;
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

const StyledSelect = styled.div`
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