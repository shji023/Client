import { DatePicker } from "antd";
import React from "react";
import moment from "moment";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function InputDate({ id, inputLabel, handleCondition }) {
  const { RangePicker } = DatePicker;
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <RangePickerWrapper>
        <RangePicker
          id={id}
          onChange={(date) =>
            handleCondition(id, date[0].format("YYYY-MM-DD") + date[1].format("YYYY-MM-DD"))
          }
          style={{ width: '100%' }}
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
        />
      </RangePickerWrapper>
    </StyledRoot>
  );
}

export default InputDate;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const RangePickerWrapper = styled.div`
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
