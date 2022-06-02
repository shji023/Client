import { getBidList, getCategoryLov, getStatusLov } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidDataGrid from "components/bidding/BidDataGrid";
import BidInputInfo from "components/bidding/BidInputInfo";
import BidInputSelect from "components/bidding/BidInputSelect";
import InputDate from "components/common/InputDate";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function SelectBidList() {
  const [bidCondition, setBidCondition] = useState({
    RFQ_NO: "",
    BID_SEARCH_TYPE: "",
    CATEGORY_SEGMENT1: "",
    RFQ_DESCRIPTION: "",
    BIDDING_START_DATE: "",
    BIDDING_END_DATE: ""
  });
  const [bidSeacrhTypeLov, setBidSeacrhTypeLov] = useState([]);
  const [bidCategoryLov, setBidCategoryLov] = useState([]);

  const [bidListData, setBidListData] = useState([]);

  const handleBidCondition = (key, value) => {
    const tempBidCondition = { ...bidCondition };

    tempBidCondition[key] = value;
    setBidCondition(tempBidCondition);
  };

  const selectBidList = async () => {
    const data = await getBidList(bidCondition);
    setBidListData(data);
    console.log(data);
  };

  const getLov = async () => {
    const bidSearchType = await getStatusLov();
    const bidCategory = await getCategoryLov();

    bidSearchType && setBidSeacrhTypeLov(bidSearchType);
    bidCategory && setBidCategoryLov(bidCategory);
  };

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <Title>입찰진행현황</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectBidList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>
          <BidInputInfo
            id="RFQ_NO"
            inputLabel="RFQ 번호"
            handleCondition={handleBidCondition}
            inputValue={bidCondition.RFQ_NO}
          />
          <BidInputSelect
            id="BID_SEARCH_TYPE"
            inputLabel="Status"
            handleCondition={handleBidCondition}
            lov={bidSeacrhTypeLov}
          />
          <BidInputSelect
            id="CATEGORY_SEGMENT1"
            inputLabel="부문"
            handleCondition={handleBidCondition}
            lov={bidCategoryLov}
          />
          <BidInputInfo
            id="RFQ_DESCRIPTION"
            inputLabel="건명"
            handleCondition={handleBidCondition}
            inputValue={bidCondition.RFQ_DESCRIPTION}
          />
          <InputDate
            id="BIDDING_START_DATE"
            inputLabel="요청일"
            handleCondition={handleBidCondition}
            inputValue={bidCondition.BIDDING_START_DATE}
          />
          <InputDate
            id="BIDDING_END_DATE"
            inputLabel="마감일"
            handleCondition={handleBidCondition}
            inputValue={bidCondition.BIDDING_END_DATE}
          />
        </InputContainer>
      </section>
      <section>
        <BidDataGrid listData={bidListData}/>
      </section>
    </StyledRoot>
  );
}

export default SelectBidList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

