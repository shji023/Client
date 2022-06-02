import { getSearchPrList, getPrSatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import DataGridPR from "components/common/DataGridPR";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearchBuyer";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function selectPrList() {

  // 조회 데이터
  const [prCondition, setPrCondition] = useState({
    REQUISITION_NUMBER : "",
    DESCRIPTION        : "용압화파트 실험압연기 메인실린더 누유 수리작업",
    PREPARER_ID        : "",
    ITEM_ID            : "",
    ITEM_DESCRIPTION   : "",
    LINE_STATUS        : "",
    BUYER_ID           : "",
    CATEGORY_ID        : "",
  });
  // TODO: 변수명 Po -> Pr 로 변경하기
  const [poListData, setPoListData]   = useState([]);
  const [prStatusLov, setPrStatusLov] = useState([]);

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...prCondition };
    tempPoCondition[key] = value;
    setPrCondition(tempPoCondition);
  };

  const selectPrList = async () => {
    // !: axios 비동기
    const data = await getSearchPrList(prCondition);
    console.log("selectPrList", data);
    setPoListData(data);
  };

  const getLov = async () => {
    const statusLov = await getPrSatusLov();
    statusLov && setPrStatusLov(statusLov);
  };

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <Title>구매신청</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectPrList}>저장</Button>

          {/* <Button onClick={selectPrList}>삭제</Button> */}
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="REQUISITION_NUMBER"
            inputLabel="PR 번호"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.REQUISITION_NUMBER}
          />
          <InputInfo
            id="PREPARER_ID"
            inputLabel="Preparer"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.DESCRIPTION}
          />
          <InputSearch
            id="PREPARER_ID"
            inputLabel="PR 승인일"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.PREPARER_ID}
          />
          <InputInfo
            id="DESCRIPTION"
            inputLabel="PR 명"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_ID}
          />
          <InputInfo
            id="ITEM_DESCRIPTION"
            inputLabel="금액"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_DESCRIPTION}
          />
          <InputSelect
            id="LINE_STATUS"
            inputLabel="수의사유"
            handlePoCondition={handlePoCondition}
            lov={prStatusLov}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapper>
          <Button onClick={selectPrList}>Line 추가</Button>
          <Button onClick={selectPrList}>행 복사</Button>
          <Button onClick={selectPrList}>행 삭제</Button>
        </ButtonWrapper>
      </section>
      <section>
        {/* // TODO: 변수명 바꾸기 poListData -> ??(팀원상의하기) */}
        <DataGridPR poListData={poListData} />
      </section>
    </StyledRoot>
  );
}

export default selectPrList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListCount = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
