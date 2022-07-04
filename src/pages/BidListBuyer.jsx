import { getBidListBuyer, getCategoryLov, getStatusLov } from "apis/bid.api";
import { getSearchBuyerList } from "apis/buyer.api";
import { colors } from "assets/styles/color";
import BidInputInfo from "components/bid/BidInputInfo";
import BidInputSelect from "components/bid/BidInputSelect";
import BidDataGridBuyer from "components/bidBuyer/BidDataGridBuyer";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import BuyerInputSearch from "components/rfq/BuyerInputSearch";
import React, { useEffect, useState } from "react";
import { popUpBuyerColFields } from "stores/colData";
import styled from "styled-components";

function BidListBuyer() {
  const [bidConditionBuyer, setBidConditionBuyer] = useState({
    rfq_no: "",
    bid_search_type: "",
    rfq_description: "",
    buyer_id: "",
  });
  const [bidSeacrhTypeLov, setBidSeacrhTypeLov] = useState([]);
  const [bidListBuyerData, setBidListBuyerData] = useState([]);
  const [buyerRowData, setBuyerRowData] = useState([]);

  // 바이어
  // 바이어 입력 조건
  const handleBidConditionBuyer = (key, value) => {
    const tempBidCondition = { ...bidConditionBuyer };

    tempBidCondition[key] = value;
    setBidConditionBuyer(tempBidCondition);
  };

  // 바이어 입찰진행현황 조회 데이터
  const selectBidListBuyer = async () => {
    const data = await getBidListBuyer(bidCondition);
    setBidListBuyerData(data);
  };

  // lov그대로 두기
  const getLov = async () => {
    const bidSearchType = await getStatusLov();
    const bidCategory = await getCategoryLov();

    bidSearchType && setBidSeacrhTypeLov(bidSearchType);
    bidCategory && setBidCategoryLov(bidCategory);
  };

  // 바이어 검색 모달
  const onHandleOk = ({ selectedRows }) => {
    const row = selectedRows[0];
    const temp = bidConditionBuyer;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    setBidConditionBuyer({ ...bidConditionBuyer, buyer_id: temp });
    return temp.buyer_name;
  };

  // 바이어 검색 버튼 이벤트
  const HandleSearch = async (searchWord) => {
    const data = await getSearchBuyerList(searchWord);
    setBuyerRowData(data);
    return data;
  };

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>입찰진행현황</Title>
          <Button onClick={selectBidListBuyer}>조회</Button>
        </HeaderWrapper>
        <InputContainer>
          <BidInputInfo
            id="rfq_no"
            inputLabel="RFQ 번호"
            handleCondition={handleBidConditionBuyer}
            inputValue={bidConditionBuyer.rfq_no}
          />
          <BidInputSelect
            id="bid_search_type"
            inputLabel="Status"
            handleCondition={handleBidConditionBuyer}
            lov={bidSeacrhTypeLov}
            isDisabled={false}
          />
          <BidInputInfo
            id="rfq_description"
            inputLabel="건명"
            handleCondition={handleBidConditionBuyer}
            inputValue={bidConditionBuyer.rfq_description}
          />
          <BuyerInputSearch
            id="buyer_id"
            title="바이어선택"
            inputLabel="Buyer"
            onHandleSearch={HandleSearch}
            onHandleOk={onHandleOk}
            onHandleCancel={null}
            gridOptions={{
              columnDefs: popUpBuyerColFields,
              rowData: buyerRowData,
              rowSelection: "single",
              suppressRowClickSelection: false,
            }}
          />
        </InputContainer>
      </section>
      <section>
        <BidDataGridBuyer listData={bidListBuyerData} />
      </section>
    </StyledRoot>
  );
}

export default BidListBuyer;

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
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 1):nth-child(-n + 4) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  font-family: "Pretendard-SemiBold";
`;
