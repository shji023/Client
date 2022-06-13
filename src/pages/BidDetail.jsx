import { getRfqInfo, getRuleInfo } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidInfo from "components/bid/BidInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import RuleTextArea from "components/bid/RuleTextArea";

function BidDetail() {
  const { id } = useParams();
  const [ruleInfoData, setRuleInfoData] = useState([]);
  const [rfqInfoData, setRfqInfoData] = useState([]);
  const selectInfo = async () => {
    const ruleInfo = await getRuleInfo(id);
    const rfqInfo = await getRfqInfo(id);
    ruleInfo && setRuleInfoData(ruleInfo[0]);
    rfqInfo && setRfqInfoData(rfqInfo[0]);
  };
  const roundPeriod = ruleInfoData.round_start_date + ' - ' + ruleInfoData.round_end_date;
  const stage = rfqInfoData?.simple_quotation_flag === 'Y'? '단순견적':'입찰';
  useEffect(()=>{
    selectInfo();
  },[]);
  return (
    <StyledRoot>
      <Title>입찰정보조회 {id}</Title>
      <section>
        <SubTitle>RFQ정보</SubTitle>
          <InfoContainer>
            <BidInfo label='RFQ번호' value={rfqInfoData.rfq_no}></BidInfo>
            <BidInfo label='단계' value={stage}></BidInfo>
            <BidInfo label='Status' value={rfqInfoData.cd_v_meaning_status}></BidInfo>
            <BidInfo label='Type' value={rfqInfoData.cd_v_meaning_type}></BidInfo>
            <BidInfo label='건명' value={rfqInfoData.rfq_description}></BidInfo>
            <BidInfo label='담당자' value={rfqInfoData.buyer_name +" / "+rfqInfoData.buyer_dept_name +" / "+rfqInfoData.buyer_contact}></BidInfo>
            <BidInfo label='정산주기' value={rfqInfoData.po_payment_cycle}></BidInfo>
            <BidInfo label='협업유형' value={rfqInfoData.po_collabo_type}></BidInfo>
            <BidInfo label='계약기간(BPA)' value={rfqInfoData.start_date}></BidInfo>
            <BidInfo label='Amount Limit' value={rfqInfoData.amount_limit}></BidInfo>
            <BidInfo label='납품지역' value={rfqInfoData.rfq_ship_to}></BidInfo>
            <BidInfo label='지불조건' value={rfqInfoData.rfq_payment_terms}></BidInfo>
            <BidInfo label='인도조건' value={rfqInfoData.bidding_fob}></BidInfo>
          </InfoContainer>
      </section>
      <section>
        <SubTitle>RFQ첨부(공급사배포)</SubTitle>
      </section>
      <section>
        <SubTitle>입찰 룰</SubTitle>
        <InfoContainer>
            <BidInfo label='입찰번호' value={ruleInfoData.bidding_no}></BidInfo>
            <BidInfo label='입찰유형' value={ruleInfoData.bid_type_code}></BidInfo>
            <BidInfo label='단가입력방식' value={ruleInfoData.bid_price_method}></BidInfo>
            <BidInfo label='낙찰제도' value={ruleInfoData.bid_method_type}></BidInfo>
            <BidInfo label='라운드' value={ruleInfoData.max_round}></BidInfo>
            <BidInfo label='라운드 시작/마감' value={roundPeriod}></BidInfo>
            <BidInfo label='통화' value={ruleInfoData.main_currency}></BidInfo>
            <BidInfo label='부가조건' value={ruleInfoData.side_conditions}></BidInfo>
            <RuleTextArea label='안내사항' value={ruleInfoData.note_to_bidder}></RuleTextArea>
        </InfoContainer>
      </section>
      <section>
        <SubTitle>품목정보</SubTitle>
        
      </section>
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
const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 2rem 2rem 0.5rem;
  gap: 1rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
