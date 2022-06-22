import { getBidList, getCategoryLov, getStatusLov } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidDataGrid from "components/bid/BidDataGrid";
import BidInputInfo from "components/bid/BidInputInfo";
import BidInputSelect from "components/bid/BidInputSelect";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
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
      <section>
        <HeaderWrapper>
          <Title>입찰진행현황</Title>
          <Button onClick={selectBidList}>조회</Button>
        </HeaderWrapper>
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
            isDisabled={false}
          />
          <BidInputSelect
            id="CATEGORY_SEGMENT1"
            inputLabel="부문"
            handleCondition={handleBidCondition}
            lov={bidCategoryLov}
            isDisabled={false}
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
          />
          <InputDate
            id="BIDDING_END_DATE"
            inputLabel="마감일"
            handleCondition={handleBidCondition}
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
  grid-template-columns: repeat(3, minmax(35rem, 1fr));
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
  & > div:nth-child(n+4):nth-child(-n+6){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

