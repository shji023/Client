import { Select } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function BidInputSelect({ id, inputLabel, handleCondition, lov }) {
  return (
    <StyledRoot>
      <TitleWrapper>
        <Label htmlFor={id}>{inputLabel}</Label>
      </TitleWrapper>
      <Select
        defaultValue="선택"
        id={id}
        onChange={(e) => {
          handleCondition(id, e);
        }}
        style={{ width: 300 }}
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
  font-size: 1.4rem;
  width: 8rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
