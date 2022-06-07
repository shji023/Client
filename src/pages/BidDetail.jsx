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
function BidDetail() {
  const { id } = useParams();
  return (
    <StyledRoot>
      <Title>입찰정보조회 {id}</Title>
      <section>
        <SubTitle>RFQ정보</SubTitle>
          <RFQInfoContainer>
            <BidInfo label='RFQ번호' value='6445454'></BidInfo>
            <BidInfo label='단계' value='6445454'></BidInfo>
            <BidInfo label='Status' value='6445454'></BidInfo>
            <BidInfo label='Type' value='6445454'></BidInfo>
            <BidInfo label='건명' value='6445454'></BidInfo>
            <BidInfo label='담당자' value='6445454'></BidInfo>
            <BidInfo label='정산주기' value='6445454'></BidInfo>
            <BidInfo label='협업유형' value='6445454'></BidInfo>
            <BidInfo label='계약기간(BPA)' value='6445454'></BidInfo>
            <BidInfo label='Amount Limit' value='6445454'></BidInfo>
            <BidInfo label='납품지역' value='6445454'></BidInfo>
            <BidInfo label='지불조건' value='6445454'></BidInfo>
            <BidInfo label='인도조건' value='6445454'></BidInfo>
          </RFQInfoContainer>
      </section>
      <section>
        <SubTitle>RFQ첨부(공급사배포)</SubTitle>
      </section>
      <section>
        <SubTitle>입찰 룰</SubTitle>
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
const RFQInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
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

const SubTitle = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;


