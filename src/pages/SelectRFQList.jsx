import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList } from "apis/rfq.api";
import { getSearchBuyerList } from "apis/buyer.api";
import { colors } from "assets/styles/color";
import AgGridRFQ from "components/rfq/RFQAgGrid";
import InputInfo from "components/common/InputInfo";
import BuyerInputSearch from "components/rfq/BuyerInputSearch";
import InputSelect from "components/common/InputSelect";
import InputSearch from "components/common/InputSearch";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
import InputDate from "components/common/InputDate";
import { rfqColumn, popUpBuyerColFields } from "stores/colData";
import BidInputSelect from "components/bid/BidInputSelect";
import RfqInputSelect from "components/rfq/RfqInputSelect";
import BidInputInfo from "components/bid/BidInputInfo";
import RfqInputDate from "components/rfq/RfqInputDate";
import RfqInputInfo from "components/rfq/RfqInputInfo";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";


function SelectRfqList() {
  const [rfqCondition, setRfqCondition] = useState({});

  const [rfqStatusLov, setRfqStatusLov] = useState([]);
  const [rfqCategoryLov, setRfqCategoryLov] = useState([]);
  const [rfqListData, setRfqListData] = useState([]);
  const [buyerRowData, setBuyerRowData] = useState([]);


  const handleRFQCondition = (key, value) => {
    const tempRfqCondition = { ...rfqCondition };
    tempRfqCondition[key] = value;
    setRfqCondition(tempRfqCondition);
  };

  const selectRFQList = async () => {
    const data = await getSearchRfqList(rfqCondition);
    console.log(data);
    setRfqListData(data);
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
    // console.log("searchWord", searchWord);
    
    // TODO: axios로 데이터불러오기
    const data = await getSearchBuyerList(searchWord);

    // TODO: state에 데이터 저장
    // setBuyerRowData([...data]);
    setBuyerRowData(data);

    return data;
  }

  const onHandleOk = ({selectedRows}) => {
    console.log("ok event called!!");
    console.log("selectedRows", selectedRows);

    // state에 데이터 저장
    const row = selectedRows[0];
    console.log("row", row);
    const temp = rfqCondition;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    // temp.buyer_dept_name = row.buyer_dept_name;
    setRfqCondition(temp);
    
    return temp.buyer_name;
  }

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <HeaderWrapper  >  
        <Title>RFQ 목록조회</Title>
        <Button onClick={selectRFQList}>조회</Button>
      </HeaderWrapper>
      <section>
        <InputContainer>    
          <BuyerInputSearch
            id="buyer_id"
            title="바이어선택"
            inputLabel="Buyer"
            onHandleSearch={HandleSearch} // 검색 버튼 이벤트
            onHandleOk={onHandleOk}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpBuyerColFields, // 컬럼
              rowData : buyerRowData, // 검색 결과 State
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false, // 선택 방지
            }}
          />
          <RfqInputSelect
            id="rfq_status"
            inputLabel="Status"
            handleCondition={handleRFQCondition}
            lov={rfqStatusLov}
          />
          <RfqInputSelect
            id="category_id"
            inputLabel="Category"
            handleCondition={handleRFQCondition}
            lov={rfqCategoryLov}
          />
          <RfqInputInfo
            id="item_id"
            inputLabel="Item Code"
            handleCondition={handleRFQCondition}
            inputValue={rfqCondition.item_id}
          />
          <RfqInputDate
            id="quote_effective_start_date"
            inputLabel="등록일"
            handleCondition={handleRFQCondition}
          />
        </InputContainer>
      </section>
      {/* TO-DO : select count 로 변경 */}
      {/* <ListCount>건수: 2,164</ListCount> */}
    
        <AgGridRFQ listData={rfqListData} colData={rfqColumn}/>
      
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
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(5) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n+3):nth-child(-n+5){
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
`;