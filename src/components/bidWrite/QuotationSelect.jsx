import { Select } from "antd";
import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function QuotationSelect({ id, handleFileContent, lov, isDisabled, initValue }) {
  if (!initValue) initValue = "선택";

  return (
    <StyledRoot>
      <StyledSelect>
        <Select
          value={initValue}
          onChange={(e) => {
            handleFileContent(id, e);
          }}
          style={{ width: "100%" }}
          disabled={isDisabled}
        >
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
export default QuotationSelect;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSelect = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: none;
  border-bottom: none;
`;
