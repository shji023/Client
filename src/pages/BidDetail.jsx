import { getBidList, getCategoryLov, getStatusLov } from "apis/bid.api";
import { colors } from "assets/styles/color";
import BidDataGrid from "components/bidding/BidDataGrid";
import BidInputInfo from "components/bidding/BidInputInfo";
import BidInfo from "components/bidding/BidInfo";
import BidInputSelect from "components/bidding/BidInputSelect";
import InputDate from "components/common/InputDate";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import RuleTextArea from "components/bidding/RuleTextArea";

const ruleTextArea = '※ 본 입찰은 사회적 친화기업 구매우대 제도가 적용되는 건으로 \
사회적 친화기업은 투찰금액의 5% 차감금액을 입찰금액으로 산정하여 낙찰자 평가 예정입니다. \
(단, 사회적 친화기업의 투찰금액도 Target Price(기준가) 이내여야 낙찰자로 선정되며, 낙찰이후 계약은 실제 투찰금액으로 진행됩니다)\
○ Compliance(KCS,KFI,RF Certificate) 품목은 납품시 필수검수 항목에 표시된 인증서를 제출하여 주시기 바랍니다.\
- Compliance(KCS,KFI,RF)를 대체할 수 있는 인증의 경우 관련 서류 첨부\
○ 베어링이 포함된 Set 구매품은 9대 Maker (NSK, NTN, KOYO, FAG, SKF, INA, IKO, JMC, TIMKEN)를 사용하고, \
구매사양에 명기된 리테이너 재질, 공차(Clearance),정밀도, Oil Hole 등이 일치하여야 한다. \
단, 구매사양에 특정Maker 제품을 표기한 경우는 특정Maker 제품 사용한다.(계약내용에 포함됩니다)\
○ 본 입찰에 참여하는 공급사는 공고시점 기업신용등급 B 등급 이상을 보유하고 있어여 하며, \
제재중인 공급사는 입찰참여에 제한을 받을 수 있습니다.\
(신용평가사:한국기업데이터, 한국신용평가, 한국기업평가, 한국신용정보, NICE평가정보, 이크레더블)\
○ 입찰유의서를 숙지하시고, 계약시 계약보증, 대금지불, 하자보증 등의 계약 이행방법에 대하여 사양서(규격서), \
구매계약 일반약관 및 특별조건을 참고하시기 바랍니다.\
○ 최종라운드 유찰시, 최저가 투찰사부터 순차 협상하거나 재공고 입찰을 진행할 수 있습니다.\
○만약 최종라운드 완료 후에도 유찰된다면, 본건은 최저가 제시 공급사와 협상 또는 신규입찰로 대체될 수 있습니다.'

function BidDetail() {
  const { id } = useParams();
  return (
    <StyledRoot>
      <Title>입찰정보조회 {id}</Title>
      <section>
        <SubTitle>RFQ정보</SubTitle>
          <InfoContainer>
            <BidInfo label='RFQ번호' value='6445454'></BidInfo>
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
            <BidInfo label='입찰번호' value='Q21104082-3'></BidInfo>
            <BidInfo label='입찰유형' value='경쟁'></BidInfo>
            <BidInfo label='단가입력방식' value='총액제'></BidInfo>
            <BidInfo label='낙찰제도' value='저가제한'></BidInfo>
            <BidInfo label='라운드' value='Q21104082-3'></BidInfo>
            <BidInfo label='라운드 시작/마감' value='2021-11-02-14:00(GMT+9:00) - 2022-05-19 10:00 (GMT+9:00)'></BidInfo>
            <BidInfo label='통화' value='KRW'></BidInfo>
            <BidInfo label='부가조건' value='TP 105'></BidInfo>
            <RuleTextArea label='안내사항' value={ruleTextArea}></RuleTextArea>
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

const StyledBidInfo = styled(BidInfo)`
  grid-column: 2 / span 2;
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
8
const SubTitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  //font-family: "Pretendard-SemiBold";
`;


const BiddingRuleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;

`;
const ThirdRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FourthRow = styled.div`
  display: flex;

`;