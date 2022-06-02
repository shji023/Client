import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getBidResult, getSuccessBid} from "apis/SuccessBid.api";
import SuccessBidGrid from "components/common/SuccessBidGrid";
import AgGrid from "components/common/AgGrid";



function SuccessBid(props) {
  const [successBidCondition, setSuccessBidCondition] = useState({
    RFQ_DESCRIPTION: "",
    RFQ_NO: "",
    BIDDING_NO: "",
    BID_TYPE_CODE: "",
    TARGET_PRICE: "",
  });
  // const [bidResultCondition, setBidResultCondition] = useState({
  //   VENDOR_NAME: "",
  //   MAIN_CURRENCY: "",
  //   QUOTATION_TOTAL_PRICE1: "",
  //   QUOTATION_COMMENT: "",
  // });
  const [bidResultData, setBidResultData] = useState([]);
  
  const selectSuccessBid = async () => {
    const data = await getSuccessBid({RFQ_NO: "6455407"});
    
    console.log(data);
    setSuccessBidCondition(data);
  };
  const selectBidResult = async () => {
    const data = await getBidResult({RFQ_NO: "6455407"});
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

          <InputContainer>
            <LabelInfo
              id="RFQ_DESCRIPTION"
              inputLabel="건명:"
              inputValue={successBidCondition.rfq_DESCRIPTION}
            />
            <LabelInfo
              id="BIDDING_NO"
              inputLabel="입찰번호:"
              inputValue={successBidCondition.bidding_NO}
            />
            <LabelInfo
              id="RFQ_NO"
              inputLabel="RFQ번호:"
              inputValue={successBidCondition.rfq_NO}
            />
            <LabelInfo
              id="BID_TYPE_CODE"
              inputLabel="입찰방법:"
              inputValue={successBidCondition.bid_TYPE_CODE}
            />
            <LabelInfo
              id="TARGET_PRICE"
              inputLabel="TargetPrice:"
              inputValue={successBidCondition.target_PRICE}
            />
          </InputContainer>
        </section>

        <SmallTitle>🌐 공급사별 투찰결과</SmallTitle>
        
        <section>
            
            {/* <SuccessBidGrid bidResultData={bidResultData}/> */}
            <AgGrid bidResultData={bidResultData}></AgGrid>
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
const SmallTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
