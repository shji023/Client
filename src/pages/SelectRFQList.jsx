import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList } from "apis/rfq.api";
import { colors } from "assets/styles/color";
import AgGridRFQ from "components/rfq/RFQAgGrid";
import InputInfo from "components/common/InputInfo";
import BuyerInputSearch from "components/rfq/BuyerInputSearch";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
import InputDate from "components/common/InputDate";


function SelectRfqList() {
  const [rfqCondition, setRfqCondition] = useState({
    RFQ_DESCRIPTION: "",
    VENDOR_ID: "",
    ATTRIBUTE_CATEGORY: "",
    AUTHORIZATION_STATUS: "",
    PO_NUM: "",
    ITEM_ID: "",
    PO_HEADER_ID: "",
    RFQ_NO: "",
    ORGANIZATION_CODE: "",
    REQUEST_PERSON_ID: "",
    BUYER_ID: "",
    TYPE_LOOKUP_CODE: "",
    QUOTE_EFFECTIVE_START_DATE: "",
    // QUOTE_EFFECTIVE_END_DATE: "",
  });

  // const [buyerCondition, setBuyerCondition] = useState({
  // buyerid를 객체로
  const [inputValue, setInputValue] = useState({
    BUYER_ID: "",
  });

  // console.log("inputValue : ", inputValue);

  // Buyer id 검색창 추가시 사용하기
  const [rfqBuyerLov, setRfqBuyerLov] = useState([]);
  const [rfqStatusLov, setRfqStatusLov] = useState([]);
  const [rfqCategoryLov, setRfqCategoryLov] = useState([]);
  const [rfqListData, setRfqListData] = useState([]);

  const handleRFQCondition = (key, value) => {
    const tempRfqCondition = { ...rfqCondition };

    tempRfqCondition[key] = value;
    setRfqCondition(tempRfqCondition);
  };

  const handleVenderCondition = (key, value) => {
    const tempVenderCondition = { ...venderCondition };

    tempVenderCondition[key] = value;
    setVenderCondition(tempVenderCondition);
  };

  const selectRFQList = async () => {
    const data = await getSearchRfqList(rfqCondition);

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

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <ButtonWrapper>   
        <Title>RFQ 목록조회</Title>
        <Button onClick={selectRFQList}>조회</Button>
      </ButtonWrapper>
      <section>
        <InputContainer>    
          <BuyerInputSearch
            id="BUYER_ID"
            inputLabel="Buyer"
            handlePoCondition={handleRFQCondition}
            inputValue = {inputValue}
            // inputValue = {buyerCondition.BUYER_ID}
            setInputValue={setInputValue}
          />
          <InputSelect
            id="RFQ_STATUS"
            inputLabel="Status"
            handlePoCondition={handleRFQCondition}
            lov={rfqStatusLov}
          />
          <InputSelect
            id="CATEGORY_ID"
            inputLabel="Category"
            handlePoCondition={handleRFQCondition}
            lov={rfqCategoryLov}
          />
          <InputInfo
            id="ATTRIBUTE_CATEGORY"
            inputLabel="Item Code"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.ATTRIBUTE_CATEGORY}
          />
          <InputDate
            id="QUOTE_EFFECTIVE_START_DATE"
            inputLabel="등록일"
            handleCondition={handleRFQCondition}
          />
        </InputContainer>
      </section>
      {/* TO-DO : select count 로 변경 */}
      <ListCount>건수: 2,164</ListCount>
      <section>
        {/* <DataGridRFQ poListData={rfqListData} /> */}
        <AgGridRFQ listData={rfqListData}/>
      </section>
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
  margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex; 
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
  width: 90%;
  height: 100%;
`;

