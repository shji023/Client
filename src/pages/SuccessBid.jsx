import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getBidResult, getSuccessBid} from "apis/SuccessBid.api";
import AgSuccessBidResult from "components/common/AgSuccessBidResult";
import BidInfo from "components/common/BidInfo";
import { Button } from "components/common/CustomButton";



function SuccessBid(props) {
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
    const data = await getSuccessBid({rfq_no: "6455407"});
    
    console.log(data);
    setSuccessBidCondition(data);
    console.log();
  };
  const selectBidResult = async () => {
    const data = await getBidResult({rfq_no: "6455407"});
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
        <Title>낙찰처리</Title>

        <section>
          <ButtonWrapper>
            <Button onClick={() => {
              let nakchal = confirm("최종낙찰 하시겠습니까?");
              if(nakchal == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>낙찰확정</Button>
          </ButtonWrapper>

          <RfqInfoContainer>
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
            </RfqInfoContainer>

        </section>

        <SmallTitle>🌐 공급사별 투찰결과</SmallTitle>
        
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
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
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
const SmallTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
const RfqInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
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
