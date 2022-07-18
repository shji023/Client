import { getBidList, getBidListBuyer } from "apis/bid.api";
import { getTotalPr, getTotalRfq, getWaitingPr, getWaitingRfq } from "apis/dashboard.api";
import { getPoAttributeCnt, getSearchPoList } from "apis/po.api";
import { showGridLoading } from "components/common/CustomGrid";
import DashBoardCard from "components/dashboard/DashBoardCard";
import DashBoardDataGrid from "components/dashboard/DashBoardDataGrid";
import DashBoardLine from "components/dashboard/DashBoardLine";
import DashBoardPieChart from "components/dashboard/DashBoardPieChart";
import { getFormattedDate } from "hooks/CommonFunction";
import useDidMountEffect from "hooks/useDidMountEffect";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function DashBoard() {

  const [bidListBuyerData, setBidListBuyerData] = useState([]);
  const [bidListData, setBidListData] = useState([]);
  const [totalPr, setTotalPr] = useState(0);
  const [totalRfq, setTotalRfq] = useState(0);

  const [prCount, setPrCount] = useState(0);
  const [rfqCount, setRfqCount] = useState(0);
  const [bidCount, setBidCount] = useState(0);

  const [statusPieData, setStatusPieData] = useState([]);

  const [poStatusData, setPoStatusData] = useState([]);

  const gridRef = useRef();

  // 대시보드 초기화 함수
  const selectBidListBuyer = async () => {
    

    // Card bidTotalCount, bidCount 구하기
    const bidData = await getBidListBuyer({
      rfq_no: "",
      bid_search_type: "",
      rfq_description: "",
      buyer_id: "",
    });

    let tempCount = 0;
    bidData &&
      bidData.map((b) => {
        if (b.bidding_end_date === "-") {
          tempCount++;
        }
      });
    setBidCount(tempCount); 
    setBidListBuyerData(bidData);

    // useEffect 첫 줄로 가면 gridRef undefined 에러나서 여기에 넣음
    showGridLoading(gridRef, true);

    // Card 1, 2
    const prData = await getWaitingPr();
    const prTotalData = await getTotalPr();

    const rfqData = await getWaitingRfq();
    const rfqTotalData = await getTotalRfq();

    setPrCount(prData);
    setTotalPr(prTotalData);

    setRfqCount(rfqData);
    setTotalRfq(rfqTotalData);

    // 마감 기한 임박 입찰 목록, 파이 차트
    const bidList = await getBidList({
      RFQ_NO: "",
      BID_SEARCH_TYPE: "",
      CATEGORY_SEGMENT1: "",
      RFQ_DESCRIPTION: "",
      BIDDING_START_DATE: "",
      BIDDING_END_DATE: "",
    });
    let total = 0;
    let writing = 0;
    let progress = 0;
    let successBid = 0;
    let part = 0;
    let failBid = 0;
    let complete = 0;
    let finish = 0;

    bidList &&
      bidList.map((b) => {
        if (b.bid_search_type === "전체") {
          total++;
        } else if (b.bid_search_type === "작성중") {
          writing++;
        } else if (b.bid_search_type === "진행") {
          progress++;
        } else if (b.bid_search_type === "낙찰및계약대기") {
          successBid++;
        } else if (b.bid_search_type === "부분낙찰") {
          part++;
        } else if (b.bid_search_type === "유찰") {
          failBid++;
        } else if (b.bid_search_type === "완료") {
          complete++;
        } else if (b.bid_search_type === "종료") {
          finish++;
        }
      });
    //11
    bidList &&
      bidList.map((b) => {
        if (b.bidding_start_date) {
          b.bidding_start_date = getFormattedDate(b.bidding_start_date);
        }
        if (b.bidding_end_date) {
          b.bidding_end_date = getFormattedDate(b.bidding_end_date);
        }
      });
    setBidListData(bidList);
    setStatusPieData([
      ...statusPieData,

      // { name: "전체", value: total },
      { name: "작성중", value: writing },
      { name: "진행", value: progress },
      // { name: "낙찰및계약대기", value: successBid },
      // { name: "부분낙찰", value: part },
      // { name: "유찰", value: failBid },
      { name: "완료", value: complete },
      // { name: "종료", value: finish },
    ]);

    // #region po 막대 그래프
    const graphData = await getPoAttributeCnt({
      // 가져올 데이터 항목
      attributeArr: [
        "A_Raw",
        "MRO내자",
        "MRO외자",
        "공사",
        "기타",
        "설비(내자)",
        "설비(외자)",
        "협력",
        "장비성투자",
        "컨소시엄",
        "하자관리",
        "용도품",
      ],
    });
    let graphRowData = [];
    graphData.forEach((e) => {
      graphRowData.push(Object.values(e)[0]);
    });
    setPoStatusData([...poStatusData, ...graphRowData]);
    // #endregion po 막대 그래프

    showGridLoading(gridRef, false);

  };

  useDidMountEffect(() => {
    selectBidListBuyer();
  }, []);

  return (
    <StyledRoot>
      <Top>
        <DashBoardCard title="구매신청" total={totalPr} count={prCount}/>
        <DashBoardCard title="RFQ"      total={totalRfq} count={rfqCount}/>
        <DashBoardCard title="입찰"     total={bidListBuyerData.length} count={bidCount}
        />
      </Top>
      <Middle>
        <Left>
          <Title>마감 기한 임박 입찰 목록</Title>
          <DashBoardDataGrid gridRef={gridRef} listData={bidListData}/>
        </Left>
        <Right>
          <Title>입찰 Status</Title>
          <DashBoardPieChart statusPieData={statusPieData}/>
        </Right>
      </Middle>
      <Title>구매계약 종류 분포</Title>
      <DashBoardLine poStatusData={poStatusData}></DashBoardLine>
    </StyledRoot>
  );
}

export default DashBoard;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Middle = styled.div`
  display: flex;
  margin-top: 3rem;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.8rem;
  font-family: "Pretendard-SemiBold";
  height: 3rem;
  margin-right: auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
`;
