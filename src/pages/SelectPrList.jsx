import { getSearchPrList, getPrStatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import { getNumberFormat } from "hooks/CommonFunction";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { prSelectColDef, prSelectColFields } from "stores/colData"

function selectPrList() {

  // 조회 데이터
  const [prCondition, setPrCondition] = useState({
    "requisition_number" : "",
    "description"        : "용압화파트 실험압연기 메인실린더 누유 수리작업",
    "preparer_id"        : "",
    "item_id"            : "",
    "item_description"   : "",
    "type_lookup_code"   : "",
    "buyer_id"           : "",
    "category_id"        : "",
  });

  const [selectedData, setSelectedData]   = useState([]);
  const [prStatusLov, setPrStatusLov] = useState([]);
  const [dataGridCnt, setDataGridCnt] = useState("0");

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...prCondition };
    tempPoCondition[key] = value;
    setPrCondition(tempPoCondition);
  };

  const selectPrList = async () => {

    console.log("prCondition : " , prCondition);

    // !: axios 비동기
    const data = await getSearchPrList(prCondition);
    console.log("getSearchPrList called : ", data);
    setSelectedData(data);
    // ?: 서버에서 개수 가져올지, 아니면 클라이언트에서 계산할지 얘기해보기
    setDataGridCnt(getNumberFormat(data.length));
  };

  // TODO: RFQ 생성 페이지로 데이터 전달하기
  const cerateRfq = async () => {

    // TODO: Datagrid에서 선택한 값 읽어오기

    // TODO: RFQ 페이지로 데이터 전달하기 (MobX)

  };

  const getLov = async () => {
    const statusLov = await getPrStatusLov();
    statusLov && setPrStatusLov(statusLov);
  };

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
            id="requisition_number"
            inputLabel="PR 번호"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.requisition_number}
          />
          <InputInfo
            id="description"
            inputLabel="건명"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.description}
          />
          <InputSearch
            id="preparer_id"
            inputLabel="Requester"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.preparer_id}
          />
          <InputSearch
            id="item_id"
            inputLabel="Item"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.item_id}
          />
          <InputInfo
            id="item_description"
            inputLabel="사양"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.item_description}
          />
          <InputSelect
            id="type_lookup_code"
            inputLabel="진행상태"
            handlePoCondition={handlePoCondition}
            lov={prStatusLov}
          />
          <InputSearch
            id="buyer_id"
            inputLabel="Buyer"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.buyer_id}
          />
          <InputInfo
            id="category_id"
            inputLabel="Category"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.category_id}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapper>
          <Button onClick={cerateRfq}>RFQ 생성</Button>
        </ButtonWrapper>
        {/* <ListCount>건수: {dataGridCnt}</ListCount> */}
      </section>
      <section>
        <AgGrid 
          resvRowData = {selectedData}
          resvDefaultColDef = { prSelectColDef }
          resvColumnDefs = { prSelectColFields }
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
