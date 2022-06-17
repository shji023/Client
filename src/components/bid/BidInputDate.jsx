import { DatePicker } from "antd";
import React from "react";
import moment from "moment";
import styled from "styled-components";
import { colors } from "assets/styles/color";

function BidInputDate({ id, inputLabel, handleCondition }) {
  const { RangePicker } = DatePicker;
  return (
    <StyledRoot>
      <TitleWrapper>
        <Label htmlFor={id}>{inputLabel}</Label>
      </TitleWrapper>
      <RangePicker
        id={id}
        onChange={(date) =>{
            // console.log("before date ", date[0]._d, " , ", date[1]);
            handleCondition(id, date[0].format("YYYY-MM-DD") + date[1].format("YYYY-MM-DD"))
            // console.log("after date ", date[0], " ,  ", date[1]);
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

export default BidInputDate;

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
