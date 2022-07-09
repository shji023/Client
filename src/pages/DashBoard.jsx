import { getBidListBuyer } from "apis/bid.api";
import { getTotalPr, getTotalRfq, getWaitingPr, getWaitingRfq } from "apis/dashboard.api";
import DashBoardCard from "components/dashboard/DashBoardCard";
import DashBoardDataGrid from "components/dashboard/DashBoardDataGrid";
import DashBoardLine from "components/dashboard/DashBoardLine";
import DashBoardPieChart from "components/dashboard/DashBoardPieChart";
import useDidMountEffect from "hooks/useDidMountEffect";
import React, { useState } from "react";
import styled from "styled-components";
function DashBoard() {
  const [bidListBuyerData, setBidListBuyerData] = useState([]);
  const [totalPr, setTotalPr] = useState(0);
  const [totalRfq, setTotalRfq] = useState(0);

  const [prCount, setPrCount] = useState(0);
  const [rfqCount, setRfqCount] = useState(0);
  const [bidCount, setBidCount] = useState(0);

  const selectBidListBuyer = async () => {
    const bidData = await getBidListBuyer({
      rfq_no: "",
      bid_search_type: "",
      rfq_description: "",
      buyer_id: "",
    });

    let tempCount = 0;
    bidData &&
      bidData.map((b) => {
        if (b.bidding_end_date === "") {
          tempCount++;
        }
      });
    setBidCount(tempCount);
    setBidListBuyerData(bidData);

    const prData = await getWaitingPr();
    const prTotalData = await getTotalPr();

    const rfqData = await getWaitingRfq();
    const rfqTotalData = await getTotalRfq();

    setPrCount(prData);
    setTotalPr(prTotalData);

    setRfqCount(rfqData);
    setTotalRfq(rfqTotalData);
  };
  useDidMountEffect(() => {
    selectBidListBuyer();
  }, []);
  return (
    <StyledRoot>
      <Top>
        <DashBoardCard title="구매신청" total={totalPr} count={prCount}></DashBoardCard>
        <DashBoardCard title="RFQ" total={totalRfq} count={rfqCount}></DashBoardCard>
        <DashBoardCard
          title="입찰"
          total={bidListBuyerData.length}
          count={bidCount}
        ></DashBoardCard>
      </Top>
      <Middle>
        <Left>
          <Title>마감 기한 임박 입찰 목록</Title>
          <DashBoardDataGrid></DashBoardDataGrid>
        </Left>
        <Right>
          <Title>입찰 Status</Title>
          <DashBoardPieChart></DashBoardPieChart>
        </Right>
      </Middle>
      <Title>구매계약 종류 분포</Title>
      <DashBoardLine></DashBoardLine>
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
