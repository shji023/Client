import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getBidResult, getSuccessBid } from "apis/SuccessBid.api";
import AgSuccessBidResult from "components/common/AgSuccessBidResult";
import BidInfo from "components/common/BidInfo";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import { useParams } from "react-router-dom";
import { getNumberFormat } from "hooks/CommonFunction";
import { successbid } from "apis/bid.api";

function SuccessBid() {
  // #region state
  const { rfq_no } = useParams();

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
  const [bidResultData, setBidResultData] = useState([
    {
      id: 1,
      main_currency: null,
      quotation_comment: "",
      quotation_total_price: "",
      vendor_name: "",
    },
  ]);

  // #endregion state


  const gridRef = useRef();


  // #region 버튼 이벤트
  const nakchalButtonEvent = () => {
    confirm("최종낙찰 하시겠습니까?") ? updateNakchal() : null;
  }
  
  const updateNakchal = async ()=>{
    console.log("1", successBidCondition)
    console.log("2", bidResultData)

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    let selectedIdx;
    selectedRowNodes.forEach((e) => {
      selectedIdx = e.rowIndex;
    });

    const data = await successbid(successBidCondition, bidResultData[selectedIdx]);
    if (data) {
      alert("낙찰 처리가 완료 되었습니다..");
      navigate(`/bidList`);
      reload();
    } else {
      alert("구매 계약 등록이 실패했습니다.");
    }
  }

  // #endregion 버튼 이벤트



  // #region useEffect
  const initPage = async () => {
    const bidding_no = await selectSuccessBid();
    await selectBidResult(bidding_no);
  }

  // * 낙찰처리 헤더 값 넣는 곳
  const selectSuccessBid = async () => {
    const data = await getSuccessBid(rfq_no);

    console.log("낙찰처리 헤더 데이터", data);

    setSuccessBidCondition({...data});
    return data.bidding_no
  };

  // * 낙찰처리 바디 그리드 값 넣는 곳
  const selectBidResult = async (bidding_no) => { 
    const data = await getBidResult(rfq_no, bidding_no);

    console.log("낙찰처리 바디 그리드 데이터", data);

    // 표에 나타날 금액 단위 표시
    let temp = data;
    temp.forEach((e)=>{
      e.quotation_total_price2 = getNumberFormat(e.quotation_total_price)
    })

    setBidResultData([...temp]);
  };
  
  useEffect(() => {
    initPage();
    
  }, []);
  
  // #endregion useEffect
  

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>낙찰처리</Title>
          <Button
            onClick={nakchalButtonEvent}
          >
            낙찰확정
          </Button>
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
            value={ getNumberFormat(successBidCondition.target_price) }
          />
        </InputContainer>
      </section>

      <SubTitle>공급사별 투찰결과</SubTitle>

      <section>
        <AgSuccessBidResult 
          resvGridRef   = {gridRef}
          bidResultData = {bidResultData} 
        />
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
  font-family: "Pretendard-SemiBold";
`;
const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
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
  & > div:nth-child(n + 4):nth-child(-n + 5) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;
