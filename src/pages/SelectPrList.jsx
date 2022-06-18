import { getSearchPrList, getPrStatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import { getDiffDate, getNumberFormat } from "hooks/CommonFunction";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popUpBuyerColFields, popUpItemColFields, popUpStaffColFields, prSelectColDef } from "stores/colData"
import { getBuyerList, getItemList, getStaffList } from "apis/public.api";
import moment from "moment";
import { Button } from "components/common/CustomButton";

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
    
    const tempList = [];
    if(data) {
      data.forEach(( element )=>{
        let temp = {
          // Pr1
          line: element.line,
          typeLookupCode: element.typeLookupCode,
          // purPctAgmRsn: element.purPctAgmRsn,
          rfqNumber:element.rfqNumber,
          requisitionNumber: element.requisitionNumber,
          currencyCode: element.currencyCode,
          description: element.description,
          requisitionHeaderId: element.requisitionHeaderId,
  
          // Pr2
          categoryId: element.pr2VoList[0].categoryId,
          amount: element.pr2VoList[0].quantity * element.pr2VoList[0].unitPrice,
          needByDate: element.pr2VoList[0].needByDate,
          requestPersonId: element.pr2VoList[0].requestPersonId,
          organizationCode: element.pr2VoList[0].organizationCode,
        }
        tempList.push(temp);
      })
  
    }
    
    
    setSelectedData([...tempList]);
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

  // #region 그리드
  const prSelectColFields = [
    { colId: 1, field: "line", headerName: "순번", minWidth: 100, },
    { colId: 2, field: "typeLookupCode", headerName: "Status", minWidth: 150 },
    { colId: 3, field: "rfqNumber", headerName: "RFQ번호", minWidth: 150, 
      valueGetter: params => (!params.data.rfqNumber) ? "-" : !params.data.rfqNumber
    },
    { colId: 4, field: "dateInterval", headerName: "경과일", minWidth: 100,
      valueGetter: params => {
        const diff = getDiffDate(new moment(), params.data.needByDate, "day" );
        return diff < 0 ? 0 : diff;
      }
    },
    { colId: 5, field: "categoryId", headerName: "Category", minWidth: 140 },
    { colId: 6, field: "requisitionNumber", headerName: "PR번호", minWidth: 140, },
    { colId: 7, field: "description", headerName: "건명", minWidth: 300 },
    { colId: 8, field: "amount", headerName: "금액", minWidth: 150, 
      valueGetter: params => getNumberFormat(params.data.amount)
    },
    { colId: 9, field: "currencyCode", headerName: "단위", minWidth: 80 },
    { colId: 10, field: "needByDate", headerName: "요청납기일", minWidth: 200 },
    { colId: 11, field: "requestPersonId", headerName: "Requester", minWidth: 140 },
    { colId: 12, field: "organizationCode", headerName: "사용부서", minWidth: 200 },
  ];
  // #endregion 그리드


  return (
    <StyledRoot>
      <section>
        <ButtonWrapper>
          <Title>구매신청조회</Title>
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
        <ButtonWrapperLine>
          <Button onClick={cerateRfq}>RFQ 생성</Button>
        </ButtonWrapperLine>
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

// const InputContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   border: 1px solid rgb(225 225 225 / 87%);
//   border-radius: 0.5rem;
//   padding: 2rem 0.5rem;
//   gap: 1rem;
// `;


const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(8) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n+4):nth-child(-n+8){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapperLine = styled.div`
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
