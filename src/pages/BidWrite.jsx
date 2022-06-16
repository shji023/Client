import { colors } from "assets/styles/color";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import BidWriteDataGrid from "components/bid/BidWriteDataGrid";
import BidInputSelect from "components/bid/BidInputSelect";
import { getKoreanNumber } from "hooks/GetKoreanNumber";
import QuotationInput from "components/bid/QuotationInput";
import { getQuotationItemInfo, postVendorComment } from "apis/bid.api";

function BidWrite() {
  const { id } = useParams();
  const [priceCondition, setPriceCondition] = useState({
    currency: "",
    quotation_total_price1: "",
  });
  const [vendorComment, setVendorComment] = useState({
    vendor_site_id: "689",
    rfq_no:"",
    bidding_no:"",
    quotation_comment:"",
  })
  const currencyLov = ["KRW", "USD", "JPY", "EUR"];
  const [itemListData, setItemListData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const result = getKoreanNumber(priceCondition.quotation_total_price1);

  const handleCondition = (key, value) => {
    const tempPriceCondition = { ...priceCondition };
    tempPriceCondition[key] = value;
    setPriceCondition(tempPriceCondition);
  };

  const handleVendorComment = (value)=>{
    const tempVendorComment = {...vendorComment};
    tempVendorComment["quotation_comment"] = value;
    setVendorComment(tempVendorComment);
  }

  const getItemList = async () => {
    const quotationItem = await getQuotationItemInfo(id);
    quotationItem && setItemListData(quotationItem);
    console.log(quotationItem);
    
  };

  const postVendorInfo = async () => {
    const data = await postVendorComment(vendorComment);
    console.log(data);
    if(data === true){
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    getItemList();
    setVendorComment({...vendorComment,
      ["rfq_no"]:itemListData[0]?.rfq_no,
      ["bidding_no"]:id,
    })
  }, []);
  
  useEffect(() => {
    // * 헤더 총 금액 계산
    const tempConditions = priceCondition;
    const tempRowData = itemListData;
    let total = 0;
    tempRowData.forEach((element) => {
      if (element.quotation_total_price1) {
        total += element.quotation_total_price1 * 1;
      }
    });
    tempConditions.quotation_total_price1 = total;

    setPriceCondition({ ...tempConditions });
  }, [itemListData]);

  return (
    <StyledRoot>
      <Title>응찰서 작성 {id}</Title>
      <section>
        <SubTitle>견적정보</SubTitle>
        <QuotationInfoContainer>
          <InputWrapper>
            <BidInputSelect
              id="currency"
              inputLabel="견적총금액"
              handleCondition={handleCondition}
              lov={currencyLov}
            />
            <QuotationInput
              id="quotation_total_price1"
              priceLabel={result}
              currencyLabel={priceCondition.currency}
              handleCondition={handleCondition}
              inputValue={priceCondition.quotation_total_price1}
            />
          </InputWrapper>
          <BidWriteDataGrid 
            itemListData={itemListData}
            setItemListData={setItemListData} />
        </QuotationInfoContainer>
      </section>
      <section>
        <SubTitle>견적서 제출</SubTitle>
        <SubmitQuotationContainer></SubmitQuotationContainer>
      </section>
      <section>
        <SubTitle>공급사 의견</SubTitle>
        <VendorCommentContainer>
          <TextAreaWrapper>
            <TextArea onChange={(e)=>{handleVendorComment(e.target.value)}} disabled={isSubmit}/>
          </TextAreaWrapper>
        </VendorCommentContainer>
      </section>
      <ButtonWrapper>
        <Button onClick={postVendorInfo}>응찰서 확정</Button>
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
  justify-content: flex-start;
  width: 100%;
  & > div:nth-child(n+1):nth-child(-n+2){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const TextAreaWrapper = styled.div`
  font-size: 1.6rem;
  width: 100%;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
`;

const TextArea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  padding: 2rem;
  line-height: 2.3rem;
  outline: none;
  resize: none;
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
