import { getRuleInfo } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidInfo from "components/bidding/BidInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import RuleTextArea from "components/bidding/RuleTextArea";

function BidDetail() {
  const { id } = useParams();
  const [ruleInfoData, setRuleInfoData] = useState([]);
  const selectRuleInfo = async () => {
    const data = await getRuleInfo(id);
    setRuleInfoData(data[0]);
    console.log(roundPeriod);
  };
  const roundPeriod = ruleInfoData.round_start_date + ' - ' + ruleInfoData.round_end_date;
  useEffect(()=>{
    selectRuleInfo();
  },[]);
  return (
    <StyledRoot>
      <Title>입찰정보조회 {id}</Title>
      <section>
        <SubTitle>RFQ정보</SubTitle>
          <InfoContainer>
            <BidInfo label='RFQ번호' value={'6445454'}></BidInfo>
            <BidInfo label='단계' value='입찰'></BidInfo>
            <BidInfo label='Status' value='완료'></BidInfo>
            <BidInfo label='Type' value='자재'></BidInfo>
            <BidInfo label='건명' value='[재입찰](포)제강부-2연주공장 Dummy Bar _ 1 item'></BidInfo>
            <BidInfo label='담당자' value='배우현(054-220-2514)'></BidInfo>
            <BidInfo label='정산주기' value=''></BidInfo>
            <BidInfo label='협업유형' value=''></BidInfo>
            <BidInfo label='계약기간(BPA)' value=''></BidInfo>
            <BidInfo label='Amount Limit' value=''></BidInfo>
            <BidInfo label='납품지역' value='주식회사 포스코 본사 '></BidInfo>
            <BidInfo label='지불조건' value='전사일반지불'></BidInfo>
            <BidInfo label='인도조건' value='당사지정장소'></BidInfo>
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
8
const SubTitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
