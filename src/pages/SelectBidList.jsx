import { getBidList, getBidListBuyer, getCategoryLov, getStatusLov } from "apis/bid.api";
import { getSearchBuyerList } from "apis/buyer.api";
import { colors } from "assets/styles/color";
import BidDataGrid from "components/bid/BidDataGrid";
import BidInputInfo from "components/bid/BidInputInfo";
import BidInputSelect from "components/bid/BidInputSelect";
import BidDataGridBuyer from "components/bidBuyer/BidDataGridBuyer";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import BuyerInputSearch from "components/rfq/BuyerInputSearch";
import { popUpBuyerColFields } from "stores/colData";
import InputDate from "components/common/InputDate";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getCookie } from "util/cookie";
import { showGridLoading } from "components/common/CustomGrid";
import { getFormattedDate } from "hooks/CommonFunction";
import InputSearch from "components/common/InputSearch";
import InputInfo from "components/common/InputInfo";

function SelectBidList() {
  // 공급사, 사용부서:0, 바이어:1
  const [user, setUser] = useState(0);

  // 공급사
  const [bidCondition, setBidCondition] = useState({
    RFQ_NO             : "",
    BID_SEARCH_TYPE    : "",
    CATEGORY_SEGMENT1  : "",
    RFQ_DESCRIPTION    : "",
    BIDDING_START_DATE : "",
    BIDDING_END_DATE   : "",
  });
  const [bidSeacrhTypeLov, setBidSeacrhTypeLov] = useState([]);
  const [bidCategoryLov, setBidCategoryLov] = useState([]);
  const [bidListData, setBidListData] = useState([]);

  // 바이어
  const [bidConditionBuyer, setBidConditionBuyer] = useState({
    rfq_no          : "",
    bid_search_type : "",
    rfq_description : "",
    buyer_id        : "",
  });
  const [bidListBuyerData, setBidListBuyerData] = useState([]);
  const [buyerRowData, setBuyerRowData] = useState([]);

  const gridRef = useRef();

  // 공급사
  const handleBidCondition = (key, value) => {
    const tempBidCondition = { ...bidCondition };

    tempBidCondition[key] = value;
    setBidCondition(tempBidCondition);
  };

  const selectBidList = async () => {
    showGridLoading(gridRef, true);

    const data = await getBidList(bidCondition);
    let tempList = [];
    data.forEach((e)=>{
      e.bidding_start_date = getFormattedDate(e.bidding_start_date);
      e.bidding_end_date   = getFormattedDate(e.bidding_end_date);
      tempList.push(e);
    })
    setBidListData([...tempList]);

    showGridLoading(gridRef, false);
  };

  const getLov = async () => {
    let userRole = "";
    if (getCookie("authority") === "ROLE_BUYER") {
      userRole = "buyer";
    }
    const bidSearchType = await getStatusLov();
    const bidCategory = await getCategoryLov();

    bidCategory && setBidCategoryLov(bidCategory);

    let bidStatusTemp = [];
    bidStatusTemp = bidSearchType.filter((el) => el !== "입찰마감");
    bidStatusTemp = bidStatusTemp.filter((el) => el !== "입찰진행");
    bidStatusTemp = bidStatusTemp.filter((el) => el !== "입찰예정");
    bidStatusTemp = bidStatusTemp.filter((el) => el !== "입찰긴급중지");
    bidStatusTemp = bidStatusTemp.filter((el) => el !== "입찰룰승인증");
    bidStatusTemp = bidStatusTemp.filter((el) => el !== "입찰룰반려");
    if (userRole === "") {
      bidStatusTemp = bidStatusTemp.filter((el) => el !== "작성중");
    }
    setBidSeacrhTypeLov(bidStatusTemp);
  };

  // 바이어
  // 바이어 입력 조건
  const handleBidConditionBuyer = (key, value) => {
    const tempBidCondition = { ...bidConditionBuyer };

    tempBidCondition[key] = value;
    setBidConditionBuyer(tempBidCondition);
  };

  // 바이어 입찰진행현황 조회 데이터
  const selectBidListBuyer = async () => {
    showGridLoading(gridRef, true);

    const data = await getBidListBuyer(bidConditionBuyer);
    let tempList = [];
    data.forEach((e)=>{
      e.need_by_date = getFormattedDate(e.need_by_date);
      tempList.push(e);
    })
    setBidListBuyerData([...tempList]);

    showGridLoading(gridRef, false);
  };

  // 바이어 검색 모달
  const onHandleOk = ({ selectedRows }) => {
    const row = selectedRows[0];
    const temp = bidConditionBuyer;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    console.log(temp.buyer_id);
    setBidConditionBuyer({ ...bidConditionBuyer, buyer_id: temp.buyer_id });
    return temp.buyer_name;
  };

  const onHandleCancelBuyer = ({}) => {
    const temp = bidConditionBuyer;
    temp.buyer_id = "";
    temp.buyer_name = "";
    console.log("buyer_id ::" + temp.buyer_id);
    setBidConditionBuyer({ ...bidConditionBuyer, buyer_id: temp.buyer_id });
    return temp.buyer_name;
  };

  // 바이어 검색 버튼 이벤트
  const HandleSearch = async (searchWord) => {
    const data = await getSearchBuyerList(searchWord);
    setBuyerRowData(data);
    return data;
  };

  useEffect(() => {
    if (getCookie("authority") === "ROLE_BUYER") {
      setUser(1);
    }
    getLov();
  }, []);

  return (
    <>
      {user === 0 ? (
        <StyledRoot>
          <section>
            <HeaderWrapper>
              <Title>입찰진행현황</Title>
              <Button onClick={selectBidList}>조회</Button>
            </HeaderWrapper>
            <InputContainer>
              <InputInfo
                id="RFQ_NO"
                inputLabel="RFQ 번호"
                handlePoCondition={handleBidCondition}
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
              <InputInfo
                id="RFQ_DESCRIPTION"
                inputLabel="건명"
                handlePoCondition={handleBidCondition}
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
            <BidDataGrid gridRef={gridRef} listData={bidListData} />
          </section>
        </StyledRoot>
      ) : (
        <StyledRoot>
          <section>
            <HeaderWrapper>
              <Title>입찰진행현황</Title>
              <Button onClick={selectBidListBuyer}>조회</Button>
            </HeaderWrapper>
            <InputContainerBuyer>
              <InputInfo
                id="rfq_no"
                inputLabel="RFQ 번호"
                handlePoCondition={handleBidConditionBuyer}
                inputValue={bidConditionBuyer.rfq_no}
              />
              <BidInputSelect
                id="bid_search_type"
                inputLabel="Status"
                handleCondition={handleBidConditionBuyer}
                lov={bidSeacrhTypeLov}
                isDisabled={false}
              />
              <InputInfo
                id="rfq_description"
                inputLabel="건명"
                handlePoCondition={handleBidConditionBuyer}
                inputValue={bidConditionBuyer.rfq_description}
              />
              <InputSearch
                id="buyer_id"
                title="바이어선택"
                inputLabel="Buyer"
                initValue={bidConditionBuyer.buyer_name}
                onHandleSearch={HandleSearch}
                onHandleOk={onHandleOk}
                onHandleCancel={onHandleCancelBuyer}
                gridOptions={{
                  columnDefs: popUpBuyerColFields,
                  rowData: buyerRowData,
                  rowSelection: "single",
                  suppressRowClickSelection: false,
                }}
              />
            </InputContainerBuyer>
          </section>
          <section>
            <BidDataGridBuyer gridRef={gridRef} listData={bidListBuyerData} />
          </section>
        </StyledRoot>
      )}
    </>
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
  & > div:nth-child(n + 4):nth-child(-n + 6) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const InputContainerBuyer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
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
