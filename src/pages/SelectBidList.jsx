import { getBidList } from "apis/bid.api";
import { getPoApproveLov, getPoLov, getSasoLov, getSearchPoList } from "apis/po.api";
import { colors } from "assets/styles/color";
import DataGridDemo from "components/common/DataGridDemo";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function SelectBidList() {
  const [bidCondition, setBidCondition] = useState({
    RFQ_NO: "",
    BID_SEARCH_TYPE: "",
    CATEGORY_SEGMENT1: "",
    RFQ_DESCRIPTION: "",
    BIDDING_START_DATE: "",
    BIDDING_END_DATE: "",
  });
  const [bidSeacrhTypeLov, setBidSeacrhTypeLov] = useState([]);
  const [bidCategoryLov, setBidCategoryLov] = useState([]);

  const [bidListData, setBidListData] = useState([]);

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...bidCondition };

    tempPoCondition[key] = value;
    setBidCondition(tempPoCondition);
  };

  const selectBidList = async () => {
    const data = await getBidList();
    console.log(data);
    setBidListData(data);
  };

  // const getLov = async () => {
  //   const bidSearchType = await getPoLov();
  //   const bidCategory = await getPoApproveLov();

  //   bidSearchType && setBidSeacrhTypeLov(bidSearchType);
  //   bidSearchType && setBidCategoryLov(bidCategory);
  // };

  // useEffect(() => {
  //   getLov();
  // }, []);

  return (
    <StyledRoot>
      <Title>입찰진행현황</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectBidList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="RFQ_NO"
            inputLabel="RFQ 번호"
            handlePoCondition={handlePoCondition}
            inputValue={bidCondition.RFQ_NO}
          />
          <InputSelect
            id="BID_SEARCH_TYPE"
            inputLabel="Status"
            handlePoCondition={handlePoCondition}
            lov={bidSeacrhTypeLov}
          />
          <InputSelect
            id="CATEGORY_SEGMENT1"
            inputLabel="부문"
            handlePoCondition={handlePoCondition}
            lov={bidCategoryLov}
          />
          <InputInfo
            id="RFQ_DESCRIPTION"
            inputLabel="건명"
            handlePoCondition={handlePoCondition}
            inputValue={bidCondition.RFQ_DESCRIPTION}
          />
          <InputSearch
            id="BIDDING_START_DATE"
            inputLabel="요청일"
            handlePoCondition={handlePoCondition}
            inputValue={bidCondition.BIDDING_START_DATE}
          />
          <InputInfo
            id="BIDDING_END_DATE"
            inputLabel="마감일"
            handlePoCondition={handlePoCondition}
            inputValue={bidCondition.BIDDING_END_DATE}
          />
        </InputContainer>
      </section>
      {/* <section>
        <DataGridDemo poListData={poListData} />
      </section> */}
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
