import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList } from "apis/rfq.api";
import { getSearchBuyerList } from "apis/buyer.api";
import { colors } from "assets/styles/color";
import AgGridRFQ from "components/rfq/RFQAgGrid";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { rfqColumn, popUpBuyerColFields } from "stores/colData";
import RfqInputDate from "components/rfq/RfqInputDate";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import InputInfo from "components/common/InputInfo";
import { showGridLoading } from "components/common/CustomGrid";
import { getFormattedDate } from "hooks/CommonFunction";

function SelectRfqList() {
  const [rfqCondition, setRfqCondition] = useState({});

  const [rfqStatusLov, setRfqStatusLov] = useState([]);
  const [rfqCategoryLov, setRfqCategoryLov] = useState([]);
  const [rfqListData, setRfqListData] = useState([]);
  const [buyerRowData, setBuyerRowData] = useState([]);

  const gridRef = useRef();

  const handleRFQCondition = (key, value) => {
    const tempRfqCondition = { ...rfqCondition };
    tempRfqCondition[key] = value;
    setRfqCondition(tempRfqCondition);
  };

  // 조회 버튼
  const selectRFQList = async () => {
    showGridLoading(gridRef, true);
    
    const data = await getSearchRfqList(rfqCondition);
    let tempList = [];
    data.forEach((e)=>{
      e.quote_effective_start_date = getFormattedDate(e.quote_effective_start_date);
      tempList.push(e);
    })
    setRfqListData([...tempList]);
    console.log("tempList", tempList)

    showGridLoading(gridRef, false);

  };

  const getLov = async () => {
    // const rfqBuyer = await getRfqBuyer();
    const rfqStatusLov = await getRfqStatusLov();
    const rfqCategoryLov = await getRfqCategoryLov();

    // rfqBuyer && setRfqBuyerLov(rfqBuyer);
    rfqStatusLov && setRfqStatusLov(rfqStatusLov);
    rfqCategoryLov && setRfqCategoryLov(rfqCategoryLov);
  };

  // 바이어 검색 버튼 이벤트
  const HandleSearch = async (searchWord) => {
    // axios로 데이터불러오기
    const data = await getSearchBuyerList(searchWord);

    // state에 데이터 저장
    // setBuyerRowData([...data]);
    setBuyerRowData(data);

    return data;
  };

  const onHandleOk = ({ selectedRows }) => {
    console.log("ok event called!!");
    console.log("selectedRows", selectedRows);

    // state에 데이터 저장
    const row = selectedRows[0];
    console.log("row", row);
    const temp = rfqCondition;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    // temp.buyer_dept_name = row.buyer_dept_name;
    setRfqCondition({ ...temp });

    return temp.buyer_name;
  };

  const onHandleCancelBuyer = ({selectedRows}) => {
    const temp = rfqCondition;
    temp.buyer_id = "";
    temp.buyer_name = "";
    // temp.buyer_dept_name = row.buyer_dept_name;
    setRfqCondition({ ...temp });

    return temp.buyer_name;
  };

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <HeaderWrapper>
        <Title>RFQ 목록조회</Title>
        <Button onClick={selectRFQList}>조회</Button>
      </HeaderWrapper>
      <section>
        <InputContainer>
          <InputInfo
            id="rfq_no"
            inputLabel="RFQ 번호"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.rfq_no}
          />
          <InputSearch
            id="buyer_id"
            title="바이어선택"
            inputLabel="Buyer"
            initValue={rfqCondition.buyer_name}
            onHandleSearch={HandleSearch} // 검색 버튼 이벤트
            onHandleOk={onHandleOk}
            onHandleCancel={onHandleCancelBuyer}
            gridOptions={{
              columnDefs: popUpBuyerColFields, // 컬럼
              rowData: buyerRowData, // 검색 결과 State
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false, // 선택 방지
            }}
          />
          <InputSelect
            id="rfq_status"
            inputLabel="Status"
            initValue={rfqCondition.rfq_status}
            handlePoCondition={handleRFQCondition}
            lov={rfqStatusLov}
          />
          <InputSelect
            id="category_id"
            inputLabel="Category"
            initValue={rfqCondition.category_id}
            handlePoCondition={handleRFQCondition}
            lov={rfqCategoryLov}
          />
          <InputInfo
            id="item_id"
            inputLabel="Item Code"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.item_id}
          />
          <RfqInputDate
            id="quote_effective_start_date"
            inputLabel="등록일"
            handleCondition={handleRFQCondition}
          />
        </InputContainer>
      </section>
      <AgGridRFQ gridRef={gridRef} listData={rfqListData} colData={rfqColumn} />
    </StyledRoot>
  );
}
export default SelectRfqList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(27rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(3) {
    & > div:nth-of-type(1) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(6) {
    & > div:nth-of-type(1) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 4):nth-child(-n + 6) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
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
  font-family: "Pretendard-SemiBold";
`;
