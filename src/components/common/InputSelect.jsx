import { Select } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputSelect({ id, inputLabel, initValue, handlePoCondition, lov, spanCnt, disabled }) {
  
  if(!initValue) initValue = "선택";

  const InputLabel = (props) => {
    if(props.inputLabel) {

      return <TitleWrapper>
        <Title htmlFor={props.id}>{props.inputLabel}</Title>
      </TitleWrapper>

    }
  }

  return (
    <StyledRoot spanCnt={spanCnt}>
      <InputLabel id={id} inputLabel={inputLabel} />
      {/* <TitleWrapper>
        <Title htmlFor={id}>{inputLabel}</Title>
      </TitleWrapper> */}
      <DataWrapper>
      <Select
        value={initValue}
        id={id}
        disabled={disabled}

        onChange={(e) => {
          handlePoCondition(id, e);
        }}
        style={{ width: '100%' }}
        >
        <Select.Option value="">선택</Select.Option>
        {lov.map((option) => (
          <Select.Option key={option[0]} value={option[0]}>
            {option[1]}
          </Select.Option>
        ))}

      </Select>
        </DataWrapper>
    </StyledRoot>
  );
}
export default InputSelect;

// const StyledRoot = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   //  grid-column: ${({ isTowCell }) => (isTowCell ? 'span 2' : ({ isFourCell }) => (isFourCell ? 'span 4' : ''))};
// `;

// const Label = styled.label`
//   font-size: 1.6rem;
//   text-align: center;
//   font-family: "Pretendard-SemiBold";
// `;


const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${({ spanCnt }) => (spanCnt ? 'span ' + spanCnt : 'span 1')};
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
