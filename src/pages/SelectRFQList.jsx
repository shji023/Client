import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList } from "apis/rfq.api";
import { colors } from "assets/styles/color";
import AgGridRFQ from "components/rfq/RFQAgGrid";
import InputInfo from "components/common/InputInfo";
import BuyerInputSearch from "components/rfq/BuyerInputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
import InputDate from "components/common/InputDate";
import { rfqColumn } from "stores/colData";


function SelectRfqList() {
  const [rfqCondition, setRfqCondition] = useState({
    rfq_description: "",
    vendor_id: "",
    attribute_category: "",
    authorization_status: "",
    po_num: "",
    item_id: "",
    po_header_id: "",
    rfq_no: "",
    organization_code: "",
    request_person_id: "",
    buyer_id: "",
    type_lookup_code: "",
    quote_effective_start_date: "",
    // quote_effective_end_date: "",
  });

  // buyerid를 객체로
  const [inputValue, setInputValue] = useState({
    buyer_id: "",
  });

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
            id="buyer_id"
            inputLabel="Buyer"
            handlePoCondition={handleRFQCondition}
            inputValue = {inputValue}
            // inputValue = {buyerCondition.buyer_id}
            setInputValue={setInputValue}
          />
          <InputSelect
            id="rfq_status"
            inputLabel="Status"
            handlePoCondition={handleRFQCondition}
            lov={rfqStatusLov}
          />
          <InputSelect
            id="category_id"
            inputLabel="Category"
            handlePoCondition={handleRFQCondition}
            lov={rfqCategoryLov}
          />
          <InputInfo
            id="attribute_category"
            inputLabel="Item Code"
            handlePoCondition={handleRFQCondition}
            inputValue={rfqCondition.attribute_category}
          />
          <InputDate
            id="quote_effective_start_date"
            inputLabel="등록일"
            handleCondition={handleRFQCondition}
          />
        </InputContainer>
      </section>
      {/* TO-DO : select count 로 변경 */}
      <ListCount>건수: 2,164</ListCount>
      <section>
        <AgGridRFQ listData={rfqListData} colData={rfqColumn}/>
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