import { DatePicker } from "antd";
import React from "react";
import moment from "moment";
import styled from "styled-components";

function InputDate({ id, inputLabel, handleCondition }) {
  const { RangePicker } = DatePicker;
  
  return (
    <StyledRoot>
      <Label htmlFor={id}>{inputLabel}</Label>
      <RangePicker
        id={id}
        onChange={(date) =>{
          handleCondition(id, date[0].format("YYYY-MM-DD") + date[1].format("YYYY-MM-DD"));
          console.log(" date : " + date); //1654670812337
          console.log(" date[0] : " + date[0]); //1654670812337
          }
        }
        style={{ width: 300 }}
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
      />
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
  width: 8rem;
  text-align: center;
`;
