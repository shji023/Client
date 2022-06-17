import { Input } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputInfo({ id, inputLabel, handlePoCondition, inputValue, disabled, mySize }) {
  const isTowCell = (inputLabel === '건명' || inputLabel === '담당자' || inputLabel === '라운드 시작/마감') ? true: false;
  const isFourCell = (inputLabel === '부가조건') ? true: false;
  return (
    <StyledRoot>
      <TitleWrapper>
      <Title htmlFor={id}>{inputLabel}</Title>
      </TitleWrapper>
      <DataWrapper>

      <Input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => handlePoCondition(id, e.target.value)}
        style={{ width: '100%' }}
        disabled={disabled}
        />
        </DataWrapper>
    </StyledRoot>
  );
}

export default InputInfo;

// const StyledRoot = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Label = styled.label`
//   font-size: 1.6rem;
//   width: 8rem;
//   text-align: center;
// `;


const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  grid-column: ${({ isTowCell }) => (isTowCell ? 'span 2' : ({ isFourCell }) => (isFourCell ? 'span 4' : ''))};

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
const DataWrapper = styled.div`
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
const Title = styled.p`
  font-size: 1.6rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
const Data = styled.p`
  font-size: 1.6rem;
  text-align: center;
`;

