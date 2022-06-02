import { getSearchPrList, getPrSatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import DataGridPR from "components/common/DataGridPR";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearchBuyer";
import InputSelect from "components/common/InputSelect";
import { getNumberFormat } from "hooks/CommonFunction";
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
  const [dataGridCnt, setDataGridCnt] = useState("");

  const [selectionModel, setSelectionModel] = React.useState([]);

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...prCondition };
    tempPoCondition[key] = value;
    setPrCondition(tempPoCondition);
  };

  const selectPrList = async () => {
    // !: axios 비동기
    const data = await getSearchPrList(prCondition);
    console.log("getSearchPrList called : ", data);
    setPoListData(data);
    // ?: 서버에서 개수 가져올지, 아니면 클라이언트에서 계산할지 얘기해보기
    setDataGridCnt(getNumberFormat(data.length));
  };

  // TODO: RFQ 생성 페이지로 데이터 전달하기
  const cerateRfq = async () => {

    // TODO: Datagrid에서 선택한 값 읽어오기
    console.log(selectionModel);
    selectionModel.forEach((value)=>{
      console.log(poListData[value]);
    })

    // TODO: RFQ 페이지로 데이터 전달하기 (MobX)

  };

  const getLov = async () => {
    const statusLov = await getPrSatusLov();
    statusLov && setPrStatusLov(statusLov);
  };

  // 
  const getDataGridCheckedId = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
  }

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <Title>구매신청조회</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectPrList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="REQUISITION_NUMBER"
            inputLabel="PR 번호"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.REQUISITION_NUMBER}
          />
          <InputInfo
            id="DESCRIPTION"
            inputLabel="건명"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.DESCRIPTION}
          />
          <InputSearch
            id="PREPARER_ID"
            inputLabel="Requester"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.PREPARER_ID}
          />
          <InputSearch
            id="ITEM_ID"
            inputLabel="Item"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_ID}
          />
          <InputInfo
            id="ITEM_DESCRIPTION"
            inputLabel="사양"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_DESCRIPTION}
          />
          <InputSelect
            id="LINE_STATUS"
            inputLabel="진행상태"
            handlePoCondition={handlePoCondition}
            lov={prStatusLov}
          />
          <InputSearch
            id="BUYER_ID"
            inputLabel="Buyer"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.BUYER_ID}
          />
          <InputInfo
            id="CATEGORY_ID"
            inputLabel="Category"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.CATEGORY_ID}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapper>
          <Button onClick={cerateRfq}>RFQ 생성</Button>
        </ButtonWrapper>
        <ListCount>건수: {dataGridCnt}</ListCount>
      </section>
      <section>
        {/* // TODO: 변수명 바꾸기 poListData -> ??(팀원상의하기) */}
        <DataGridPR 
          poListData={poListData}
          onSelectionModelChange={getDataGridCheckedId}
          selectionModel={selectionModel}
        />
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
