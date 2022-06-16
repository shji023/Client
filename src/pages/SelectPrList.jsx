import { getSearchPrList, getPrStatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import { getNumberFormat } from "hooks/CommonFunction";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popUpBuyerColFields, popUpItemColFields, popUpStaffColFields, prSelectColDef, prSelectColFields } from "stores/colData"
import { getBuyerList, getItemList, getStaffList } from "apis/public.api";

function selectPrList() {

  // 조회 데이터
  const [conditions, setConditions] = useState({
    "requisition_number" : "",
    "description"        : "용압화파트 실험압연기 메인실린더 누유 수리작업",
    "requester_id"       : "",
    "requester_name"     : "",
    "item_id"            : "",
    "item_name"          : "",
    "item_description"   : "",
    "type_lookup_code"   : "",
    "buyer_id"           : "",
    "buyer_name"         : "",
    "category_id"        : "",
    "category_name"      : "",
  });

  const [selectedData, setSelectedData]   = useState([]);
  const [prStatusLov, setPrStatusLov] = useState([]);
  const [dataGridCnt, setDataGridCnt] = useState("0");

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...conditions };
    tempPoCondition[key] = value;
    setConditions(tempPoCondition);
  };

  // #region 헤더 팝업 이벤트
  const onHandleSearchItem = async (searchWord) => {
    const resultList = await getItemList(searchWord);
    return resultList;
  }

  const onHandleOkItem = ({selectedRows}) => {
    const row = selectedRows[0];

    const temp = conditions;
    console.log(row);
    temp.item_id = row.id;
    temp.item_name = row.item;
    setConditions({...temp});
    
    return temp.item_name;
  }

  const onHandleSearchRequester = async (value) => {
    
    const resultList = await getStaffList(value);
    return resultList;
  }

  const onHandleOkRequester = ({selectedRows}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = conditions;
    temp.requester_id = row.id;
    temp.requester_name = row.name;
    setConditions(temp);
    
    return temp.requester_name;

  }

  const onHandleSearchBuyer = async (value) => {
    
    const resultList = await getBuyerList(value);
    return resultList;
  }

  const onHandleOkBuyer = ({selectedRows}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = conditions;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    setConditions(temp);
    
    return temp.buyer_name;

  }
  // #endregion 팝업 이벤트

  const selectPrList = async () => {

    console.log("conditions : " , conditions);

    // !: axios 비동기
    const data = await getSearchPrList(conditions);
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
            inputValue={conditions.requisition_number}
          />
          <InputInfo
            id="description"
            inputLabel="건명"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.description}
          />
          <InputSearch
            id="requester_name"
            title="직원선택"
            inputLabel="Requester"
            initValue={conditions.requester_name}
            onHandleSearch={onHandleSearchRequester}
            onHandleOk={onHandleOkRequester}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpStaffColFields,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputSearch
            id="item_id"
            title="물품선택"
            inputLabel="Item"
            initValue={conditions.item_description}
            onHandleSearch={onHandleSearchItem}
            onHandleOk={onHandleOkItem}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpItemColFields,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputInfo
            id="item_description"
            inputLabel="사양"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.item_description}
          />
          <InputSelect
            id="type_lookup_code"
            inputLabel="진행상태"
            handlePoCondition={handlePoCondition}
            lov={prStatusLov}
          />
          <InputSearch
            id="buyer_id"
            title="바이어선택"
            inputLabel="Buyer"
            initValue={conditions.buyer_name}
            onHandleSearch={onHandleSearchBuyer}
            onHandleOk={onHandleOkBuyer}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpBuyerColFields,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputInfo
            id="category_name"
            inputLabel="Category"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.category_name}
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
