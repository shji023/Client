import { Select } from "antd";
import React from "react";
import styled from "styled-components";
function InputSelect({ id, inputLabel, initValue, handlePoCondition, lov }) {
  
  id === "terms_id" && console.log("init", initValue, lov);
  if(!initValue) initValue = "선택";

  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <Select
        defaultValue={initValue}
        id={id}
        onChange={(e) => {
          handlePoCondition(id, e);
        }}
        style={{ width: 200 }}
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
export default InputSelect;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  //  grid-column: ${({ isTowCell }) => (isTowCell ? 'span 2' : ({ isFourCell }) => (isFourCell ? 'span 4' : ''))};
`;

const Label = styled.label`
  font-size: 1.6rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
