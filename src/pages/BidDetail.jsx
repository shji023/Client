import { getItemInfo, getRfqInfo, getRuleInfo } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidInfo from "components/bid/BidInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import RuleTextArea from "components/bid/RuleTextArea";
import RfqAttachTable from "components/bid/RfqAttachTable";
import ItemInfoTable from "components/bid/ItemInfoTable";
import { Button } from "components/common/CustomButton";
import { getVendorFileList } from "apis/file.api";
import { getCookie } from "util/cookie";

function BidDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ruleInfoData, setRuleInfoData] = useState([]);
  const [rfqInfoData, setRfqInfoData] = useState([]);
  const [itemInfoList, setItemInfoList] = useState([]);
  const [vendorFileList, setVendorFileList] = useState([]);
  const [bidType, setBidType] = useState("");
  const [bidMethod, setBidMethod] = useState("");
  const [rfqNo, setRfqNo] = useState("");
  // 사용부서:0, 공급사:1, 바이어:2
  const [user, setUser] = useState(0);

  const selectInfo = async () => {
    const ruleInfo = await getRuleInfo(id);
    const rfqInfo = await getRfqInfo(id);
    const itemInfo = await getItemInfo(id);
    //const fileInfo = await getVendorFileList(id);
    ruleInfo && setRuleInfoData(ruleInfo[0]);
    rfqInfo && setRfqInfoData(rfqInfo[0]);
    itemInfo && setItemInfoList(itemInfo);

    const fileInfo = await getVendorFileList(rfqInfo[0].rfq_no);
    fileInfo && setVendorFileList(fileInfo);
    setRfqNo(rfqInfo[0].rfq_no);

    const tempBidType = ruleInfo[0].bid_type_code === "NEGO" ? "수의" : "경쟁";
    setBidType(tempBidType);
    const tempBidMethod =
      ruleInfo[0].bid_method_type === "A"
        ? "낙찰하한제"
        : ruleInfo[0].bid_method_type === "Y"
        ? "제한적 최저가"
        : ruleInfo[0].bid_method_type === "B"
        ? "저가제한"
        : ruleInfo[0].bid_method_type === "C"
        ? "최저가입찰"
        : ruleInfo[0].bid_method_type === "D"
        ? "TCO"
        : "시장가경쟁";
    setBidMethod(tempBidMethod);
  };
  const roundPeriod = ruleInfoData.round_start_date + " - " + ruleInfoData.round_end_date;
  const stage = rfqInfoData?.simple_quotation_flag === "Y" ? "단순견적" : "입찰";
  useEffect(() => {
    selectInfo();
    if (getCookie("authority") === "ROLE_VENDOR") {
      setUser(1);
    } else if (getCookie("authority") === "ROLE_BUYER") {
      setUser(2);
    }
  }, []);

  return (
    <StyledRoot>
      <Title>입찰정보조회</Title>
      <section>
        <SubTitle>🔹 RFQ정보</SubTitle>
        <RfqInfoContainer>
          <BidInfo label="RFQ번호" value={rfqInfoData.rfq_no}></BidInfo>
          <BidInfo label="단계" value={stage}></BidInfo>
          <BidInfo label="Status" value={rfqInfoData.cd_v_meaning_status}></BidInfo>
          <BidInfo label="Type" value={rfqInfoData.cd_v_meaning_type}></BidInfo>
          <BidInfo label="건명" value={rfqInfoData.rfq_description}></BidInfo>
          <BidInfo
            label="담당자"
            value={
              rfqInfoData.buyer_name +
              " / " +
              rfqInfoData.buyer_dept_name +
              " / " +
              rfqInfoData.buyer_contact
            }
          ></BidInfo>
          <BidInfo label="정산주기" value={rfqInfoData.po_payment_cycle}></BidInfo>
          <BidInfo label="협업유형" value={rfqInfoData.po_collabo_type}></BidInfo>
          <BidInfo label="계약기간(BPA)" value={rfqInfoData.end_date}></BidInfo>
          <BidInfo label="Amount Limit" value={rfqInfoData.amount_limit}></BidInfo>
          <BidInfo label="납품지역" value={rfqInfoData.rfq_ship_to}></BidInfo>
          <BidInfo label="지불조건" value={rfqInfoData.rfq_payment_terms}></BidInfo>
          <BidInfo label="인도조건" value={rfqInfoData.fob_lookup_code}></BidInfo>
          <BidInfo label="" value=""></BidInfo>
        </RfqInfoContainer>
      </section>
      <section>
        <SubTitle>🔹 RFQ첨부(공급사배포)</SubTitle>
        <RfqAttachContainer>
          <RfqAttachTable vendorFileList={vendorFileList}></RfqAttachTable>
        </RfqAttachContainer>
      </section>
      <section>
        <SubTitle>🔹 입찰 룰</SubTitle>
        <BidInfoContainer>
          <BidInfo label="입찰번호" value={ruleInfoData.bidding_no}></BidInfo>
          <BidInfo label="입찰유형" value={bidType}></BidInfo>
          <BidInfo label="단가입력방식" value={ruleInfoData.bid_price_method}></BidInfo>
          <BidInfo label="낙찰제도" value={bidMethod}></BidInfo>
          <BidInfo label="라운드" value={ruleInfoData.max_round}></BidInfo>
          <BidInfo label="라운드 시작/마감" value={roundPeriod}></BidInfo>
          <BidInfo label="통화" value={ruleInfoData.main_currency}></BidInfo>
          <BidInfo label="부가조건" value={ruleInfoData.side_conditions}></BidInfo>
          <RuleTextArea label="안내사항" value={ruleInfoData.note_to_bidder}></RuleTextArea>
        </BidInfoContainer>
      </section>
      <section>
        <SubTitle>🔹 품목정보</SubTitle>
        <ItemInfoContainer>
          <ItemInfoTable itemInfoList={itemInfoList}></ItemInfoTable>
        </ItemInfoContainer>
      </section>
      {user === 1 ? (
        <ButtonWrapper>
          <Button onClick={() => navigate(`/bidWrite/${id}`)}>응찰서 작성</Button>
        </ButtonWrapper>
      ) : user === 2 ? (
        <ButtonWrapper>
          <Button onClick={() => navigate(`/successBid/${rfqNo}`)}>낙찰 처리</Button>
        </ButtonWrapper>
      ) : (
        <></>
      )}
    </StyledRoot>
  );
}

export default BidDetail;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const RfqInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(6) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(10) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(14) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 11):nth-child(-n + 14) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const RfqAttachContainer = styled.div`
  padding: 2rem 2rem 2rem 0.5rem;
`;

const BidInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(7) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(8) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
`;

const ItemInfoContainer = styled.div`
  padding: 2rem 2rem 2rem 0.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
