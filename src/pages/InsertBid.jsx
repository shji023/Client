import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList, getRfqInfo } from "apis/rfq.api";
import { colors } from "assets/styles/color";
import RFQAgGridInsertBid from "components/rfq/RFQAgGridInsertBid";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
// import InputDate from "components/common/InputDate";
import { useParams } from "react-router-dom";
import BidInfo from "components/bidding/BidInfo";


function InsertBid() {

  const {id} = useParams();
  console.log("id : ", id);

  // const [rfqListData, setRfqListData] = useState({
  //   rfq_no: "",
  //   simple_quotation_flag:"",
  //   rfq_status:"",
  //   line_type_id :"",

  //   rfq_description:"",
  //   buyer_id: "",

  //   // 정산주기 칼럼명 넣기
  //   pur_cptz_tp_tp:"",
  //   start_date:"",
  //   end_date:"",
  //   amount_limit:"",

  //   rfq_ship_to:"",
  //   rfq_payment_terms:"",
  //   bidding_fob:"",
  // });

  
  const [rfqListData, setRfqListData] = useState([]);


  // Buyer id 검색창 추가시 사용하기
  // const [rfqBuyerLov, setRfqBuyerLov] = useState([]);
  // const [rfqStatusLov, setRfqStatusLov] = useState([]);
  // const [rfqCategoryLov, setRfqCategoryLov] = useState([]);
  // const [rfqListData, setRfqListData] = useState([]);

  // const handleBidCondition = (key, value) => {
  //   const tempRfqCondition = { ...rfqListData };

  //   tempRfqCondition[key] = value;
  //   setRfqListData(tempRfqCondition);
  // };

  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);
    console.log("data~~~~",data);
    // handleBidCondition(data);

    setRfqListData(data[0]);

  };

  // const getLov = async () => {
  //   const rfqStatusLov = await getRfqStatusLov();
  //   const rfqCategoryLov = await getRfqCategoryLov();

  //   rfqStatusLov && setRfqStatusLov(rfqStatusLov);
  //   rfqCategoryLov && setRfqCategoryLov(rfqCategoryLov);
  // };

  useEffect(() => {
    selectRFQDetail(id);
   
  }, []);

  return (
    <StyledRoot>
      <ButtonWrapper>   
        <Title>입찰룰</Title>
        {/* <Button onClick={selectRFQList}>저장</Button> */}
      </ButtonWrapper>
      <SubTitle>RFQ 정보</SubTitle>
      <section>
        <InputContainer>
        <InputContainerShort>
        <BidInfo
            label="RFQ 번호"
            value={rfqListData.rfq_no}
        />
        <BidInfo
            label="단계"
            value={rfqListData.simple_quotation_flag}
        />
        <BidInfo
            label="Status"
            value={rfqListData.rfq_status}
        />
        <BidInfo
            label="Type"
            value={rfqListData.line_type_id}
        />
        
        {/* <InputContainerLong> */}
        <BidInfo
            label='건명'
            value={rfqListData.rfq_description}
        /> 
        <BidInfo
            label='담당자'
            value={rfqListData.buyer_id}
        />
        {/* </InputContainerLong> */}
        
        <BidInfo
            label="정산주기"
            value={rfqListData.rfq_no}
        />
        <BidInfo
            label="협업 유형"
            value={rfqListData.pur_cptz_tp_tp}
        />
        <BidInfo
            label="계약 기간(BPA)"
            value={rfqListData.start_date}
        />
        {/* <BidInfo
            label="계약 기간(BPA)"
            value={rfqCondition.END_DATE}
        /> */}
        <BidInfo
            label="Amount Limit"
            value={rfqListData.amount_limit}
        />
        <BidInfo
            label="납품 지역"
            value={rfqListData.rfq_ship_to}
        />
        <BidInfo
            label="지불 조건"
            value={rfqListData.rfq_payment_terms}
        />
        <BidInfo
            label="인도 조건"
            value={rfqListData.bidding_fob}
        />
        </InputContainerShort>
        </InputContainer>
      </section>
      <section>
        <SubTitle>공급사 선정</SubTitle>
        {/* <RFQAgGridInsertBid listData={rfqListData}/> */}
      </section>
    </StyledRoot>
  );
}
export default InsertBid;


const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
//   gap: 1rem;
`;

const InputContainerShort = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;

const InputContainerLong = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2rem 0.5rem;
  gap: 1rem;
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
  margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex; 
`;

const ListCount = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  width: 90%;
  height: 100%;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;