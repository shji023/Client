import { DatePicker } from "antd";
import React from "react";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import moment from "moment";

function InputOneDate({ id, inputLabel, initValue, handleCondition, spanCnt, disabled }) {

  const dateFormat = "YYYY-MM-DD";
  let value = null;
  value = !initValue ? null : moment(initValue, dateFormat);

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
      {/* <Label htmlFor={id}>{inputLabel}</Label> */}
      <DatePicker
        id={id}
        value={value}
        disabled={disabled}
        onChange={(date) =>
          handleCondition(id, date.format("YYYY-MM-DD"))
        }
        style={{ width: '100%' }}
      />
    </StyledRoot>
  );
}

export default InputOneDate;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: ${({ spanCnt }) => (spanCnt ? 'span ' + spanCnt : 'span 1')};
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
    font-family: "Pretendard-SemiBold";

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
