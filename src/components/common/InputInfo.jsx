import { Input } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { getReg } from "hooks/CommonFunction";

function InputInfo({ id, inputLabel, handlePoCondition, inputValue, spanCnt, disabled, type, readOnly }) {
  if (!disabled) disabled = false;

  const InputLabel = (props) => {
    if (props.inputLabel) {
      return (
        <TitleWrapper>
          <Title htmlFor={props.id}>{props.inputLabel}</Title>
        </TitleWrapper>
      );
    }
  };

  return (
    <StyledRoot spanCnt={spanCnt}>
      <InputLabel id={id} inputLabel={inputLabel} />
      {/* <TitleWrapper>
        <Title htmlFor={id}>{inputLabel}</Title>
      </TitleWrapper> */}
      <DataWrapper>
        <Input
          type="text"
          id={id}
          value={inputValue}
          onChange={(e) => {
            const v = e.target.value;
            if (!type || (type && getReg(type).test(v)) || v === "") {
              return handlePoCondition(id, v);
            }
          }}
          style={{ width: "100%", height: "100%" }}
          disabled={disabled}
          readOnly={readOnly}
        />
      </DataWrapper>
    </StyledRoot>
  );
}

export default InputInfo;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: ${({ spanCnt }) => (spanCnt ? "span " + spanCnt : "span 1")};
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

const DataWrapper = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
  border-right: none;
  border-bottom: none;
`;
const Title = styled.p`
  font-size: 1.4rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
