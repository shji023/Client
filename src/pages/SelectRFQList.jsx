import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList } from "apis/rfq.api";
import { colors } from "assets/styles/color";
import DataGridRFQ from "components/common/DataGridRFQ";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
    QUOTE_EFFECTIVE_END_DATE: "",
  });

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
      <Title>RFQ 목록조회</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectRFQList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>    
          <InputSearch
            id="BUYER_ID"
            inputLabel="Buyer"
            handlePoCondition={handleRFQCondition}
            lov={rfqBuyerLov}
          />
          <InputSelect
            id="RFQ_STATUS"
            inputLabel="Status"
            handlePoCondition={handleRFQCondition}
            lov={rfqStatusLov}
          />
          <InputSelect
            id="CATEGORY_SEGMENT1"
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
          <InputSearch
            id="QUOTE_EFFECTIVE_START_DATE"
            inputLabel="시작일자"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.QUOTE_EFFECTIVE_START_DATE}
          />
          <InputSearch
            id="QUOTE_EFFECTIVE_END_DATE"
            inputLabel="종료일자"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.QUOTE_EFFECTIVE_END_DATE}
          />
        </InputContainer>
      </section>
      {/* TO-DO : select count 로 변경 */}
      <ListCount>건수: 2,164</ListCount>
      <section>
        <DataGridRFQ poListData={rfqListData} />
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

const Date = styled.p`
font-size: 2.0rem;
margin-bottom: 1rem;
margin-top: 1.5rem;
`;