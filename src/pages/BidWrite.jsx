import { colors } from "assets/styles/color";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';
import BidWriteDataGrid from "components/bid/BidWriteDataGrid";
import BidInputSelect from "components/bid/BidInputSelect";
import { Input } from "antd";
import { getKoreanNumber } from "hooks/GetKoreanNumber";
import QuotationInput from "components/bid/QuotationInput";
import { getQuotationItemInfo } from "apis/bid.api";

function BidWrite() {
  const { id } = useParams();
  const [priceCondition, setPriceCondition] = useState({
    currency: "",
    quotation_total_price1: "",
  });
  const currencyLov = ['KRW','USD','JPY','EUR'];
  const [itemListData, setItemListData] = useState([]);

  const result = getKoreanNumber(priceCondition.quotation_total_price1);

  const handleCondition = (key, value) => {
    const tempPriceCondition = { ...priceCondition };

    tempPriceCondition[key] = value;
    setPriceCondition(tempPriceCondition);
  };

  const getItemList = async () => {
    const quotationItem = await getQuotationItemInfo(id);
    quotationItem && setItemListData(quotationItem);
  };

  useEffect(() => {
    getItemList();
  }, []);
  return (
    <StyledRoot>
      <Title>응찰서 작성 {id}</Title>
      <section>
        <SubTitle>견적정보</SubTitle>
        <QuotationInfoContainer>
          <InputWrapper>
            <BidInputSelect 
              id='currency' 
              inputLabel='견적총금액'
              handleCondition={handleCondition} 
              lov={currencyLov} />
            <QuotationInput
              id="quotation_total_price1"
              priceLabel={result}
              currencyLabel={priceCondition.currency}
              handleCondition={handleCondition}
              inputValue={priceCondition.quotation_total_price1}
            />
          </InputWrapper>
          <BidWriteDataGrid itemListData={itemListData} ></BidWriteDataGrid>
        </QuotationInfoContainer>
      </section>
      <section>
        <SubTitle>견적서 제출</SubTitle>
        <SubmitQuotationContainer>

        </SubmitQuotationContainer>
      </section>
      <section>
        <SubTitle>공급사 의견</SubTitle>
        <VendorCommentContainer>

        </VendorCommentContainer>
      </section>
      <ButtonWrapper>
        <Button>응찰서 확정</Button>
      </ButtonWrapper>
    </StyledRoot>
  );
}

export default BidWrite;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const QuotationInfoContainer = styled.div`
  padding: 2rem 2rem 2rem 0.5rem;
`;

const SubmitQuotationContainer = styled.div`
  padding: 2rem 2rem 2rem 0.5rem;
`;

const VendorCommentContainer = styled.div`
  padding: 2rem 2rem 2rem 0.5rem;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Button = styled.button`
  width: 12rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;