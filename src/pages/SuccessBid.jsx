import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getBidResult, getSuccessBid} from "apis/SuccessBid.api";
import AgSuccessBidResult from "components/common/AgSuccessBidResult";
import BidInfo from "components/common/BidInfo";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import { useParams } from "react-router-dom";



function SuccessBid(props) {
  const {rfq_no} = useParams(/* "6455407" */);

  const [successBidCondition, setSuccessBidCondition] = useState({
    rfq_description: "",
    rfq_no: "",
    bidding_no: "",
    bid_type_code: "",
    target_price: "",
  });
  // const [bidResultCondition, setBidResultCondition] = useState({
  //   VENDOR_NAME: "",
  //   MAIN_CURRENCY: "",
  //   QUOTATION_TOTAL_PRICE1: "",
  //   QUOTATION_COMMENT: "",
  // });
  const [bidResultData, setBidResultData] = useState([]);
  
  const selectSuccessBid = async () => {
    const data = await getSuccessBid({rfq_no: rfq_no});
    
    console.log(data);
    setSuccessBidCondition(data);
    console.log();
  };
  const selectBidResult = async () => {
    const data = await getBidResult({rfq_no: rfq_no});
    console.log("여기가 찍히는거냐?" );
    console.log(data);
    setBidResultData(data);
  };
  
  useEffect(() => {
    selectSuccessBid();
    selectBidResult();
  }, []);

    return (
    <StyledRoot>

        <section>
          <HeaderWrapper>
            <Title>낙찰처리</Title>
            <Button onClick={() => {
              let nakchal = confirm("최종낙찰 하시겠습니까?");
              if(nakchal == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>낙찰확정</Button>
          </HeaderWrapper>

          <InputContainer>
            <BidInfo
              label="건명"
              value={successBidCondition.rfq_description}
            />
            <BidInfo
              //id="BIDDING_NO"
              label="입찰번호"
              value={successBidCondition.bidding_no}
            />
            <BidInfo
              //id="RFQ_NO"
              label="RFQ번호"
              value={successBidCondition.rfq_no}
            />
            <BidInfo
              //id="BID_TYPE_CODE"
              label="입찰방법"
              value={successBidCondition.bid_type_code}
            />
            <BidInfo
              //id="TARGET_PRICE"
              label="TargetPrice"
              value={successBidCondition.target_price}
            />
            </InputContainer>

        </section>

        <SubTitle>공급사별 투찰결과</SubTitle>
        
        <section>
            <AgSuccessBidResult bidResultData={bidResultData}></AgSuccessBidResult>
        </section>

    </StyledRoot>
    );
}

export default SuccessBid;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(27rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(1) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(3) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(5) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n+4):nth-child(-n+5){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;
