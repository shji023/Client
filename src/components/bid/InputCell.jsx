import { colors } from "assets/styles/color";
import React from "react";
import styled from "styled-components";

function InputCell({ label, value, spanCnt }) {

  const thisValue = value ? value : null;

  return (
    <StyledRoot spanCnt={spanCnt}>
      <TitleWrapper>
        <Title>{label}</Title>
      </TitleWrapper>
      <DataWrapper>
        <Data style={{width: (!spanCnt || (spanCnt < 2)) ? "100%" : "40rem"}}
              title={thisValue}
        >{thisValue}</Data>
      </DataWrapper>
    </StyledRoot>
  );
}

export default InputCell;

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
const Data = styled.p`
  font-size: 1.4rem;
  text-align: center;
  // 글자 생략 사용하려면 width나 height가 고정이어야 함
  text-overflow: ellipsis; // 넘치는 글자 생략
  white-space: nowrap; // 단줄처리
  overflow: hidden; // 영역 감추기
`;

