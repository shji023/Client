import { getRfqInfo } from "apis/rfq.api";
import { getBidTypeLov, getBidPriceMethodLov, getBidMethodTypeLov, getBidMaxRoundLov, getBidCurrencyCodeLov, insertOneBid} from "apis/bid.api";
import { colors } from "assets/styles/color";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
// import InputDate from "components/common/InputDate";
import { useParams } from "react-router-dom";
import BidInfo from "components/bid/BidInfo";
import Upload from "./Upload";
import RuleTextArea from "components/bid/RuleTextArea";
import InputSelect from "components/common/InputSelect";
import InputDate from "components/common/InputDate";
import InputInfo from "components/common/InputInfo";

function RfqDetail() {
  const {id} = useParams();
  console.log("id : ", id);

  const [bidCondition, setBidCondition] = useState({});
  const [rfqListData, setRfqListData] = useState({});
  const [ruleInfoData, setRuleInfoData] = useState([]);
  const [rfqInfoData, setRfqInfoData] = useState([]);
 
  // const selectInfo = async () => {
  //   const ruleInfo = await getRuleInfo(id);
  //   const rfqInfo = await getRfqInfo(id);
  //   ruleInfo && setRuleInfoData(ruleInfo[0]);
  //   rfqInfo && setRfqInfoData(rfqInfo[0]);
  // };
  const roundPeriod = ruleInfoData.round_start_date + ' - ' + ruleInfoData.round_end_date;
  const stage = rfqListData?.simple_quotation_flag === 'Y'? '단순견적':'입찰';

  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);
    // console.log("rfq select data",data);
    setRfqListData(data[0]);
  };


  // Lov
  const [bidTypeLov, setBidTypeLov] = useState([]);
  const [bidPriceMethodLov, setBidPriceMethodLov] = useState([]);
  const [bidMethodTypeLov, setBidMethodTypeLov] = useState([]);
  const [bidMaxRoundLov, setBidMaxRoundLov] = useState([]);
  const [bidCurrencyCodeLov, setBidCurrencyCodeLov] = useState([]);

  const getLov = async () => {
    const bidTypeLov = await getBidTypeLov();
    const bidPriceMethodLov = await getBidPriceMethodLov();
    const bidMethodTypeLov = await getBidMethodTypeLov();
    const bidMaxRoundLov = await getBidMaxRoundLov();
    const bidCurrencyCodeLov = await getBidCurrencyCodeLov();
    
    bidTypeLov && setBidTypeLov(bidTypeLov);
    bidPriceMethodLov && setBidPriceMethodLov(bidPriceMethodLov);
    bidMethodTypeLov && setBidMethodTypeLov(bidMethodTypeLov);
    bidMaxRoundLov && setBidMaxRoundLov(bidMaxRoundLov);
    bidCurrencyCodeLov && setBidCurrencyCodeLov(bidCurrencyCodeLov);
  };

  const handleBidCondition = (key, value) => {
    const tempBidCondition = { ...bidCondition };
    tempBidCondition[key] = value;
    setBidCondition(tempBidCondition);
  };

  const saveContents = async () => {
    console.log("onSaveContents called");

    // !: axios 비동기
    const data = await insertOneBid(bidCondition);
    if(data.res){
      alert("입찰룰이 완료되었습니다.");
    } else {
      alert("입찰룰이 실패했습니다.");
    }
  };

  const onSaveContents = () => {
    confirm(
      "입찰룰 작성을 완료하시겠습니까?"
    ) ? saveContents() : null;
  }

  // 파일 업로드
  const pageSize = 10;
  const initMetaDataPaged = {
      content: [],
      totalSize: 0,
      page: 0
  };

  const [fileUplaod, setFileUpload] = useState({
    file: "",
    title: "",
    details: "",
    error: "",
    metaDataPaged: initMetaDataPaged,
    modalMessage: "",
    modal: false,
    blocking: false
  });

  const onUpload = async () => {
    try {
        const result = await uploadFile(fileUplaod.file, fileUplaod.title, fileUplaod.details)
        console.log("result : : ", result);
        if (!result) this.displayTheError('No user found');
    } catch (e) {
        await this.toggleErrorAsync(e.message);
        return;
    }
    await this.fetchMetadata(0, pageSize);
  }

  const handleInputChange = (e) => {
    const target = e.target;
    console.log("target : ", target); // target
    console.log("type : ", e.target.type); // text
    // console.log("files : ", e.target.files[0]);
    console.log("value : ", target.value); // 사용자가 입력한 파일명
    console.log("name : ", target.name); // title

    const value = target.type === 'file' ? e.target.files[0] : target.value;
    const name = target.name;
    this.setState({
        [name]: value, error: ""
    });
  };

  useEffect(() => {
    selectRFQDetail(id);
    getLov();
    
    // selectInfo();
  }, []);

  console.log("insert - bidCondition : ", bidCondition);

  return (
    <StyledRoot>
      <ButtonWrapper>   
        <Title>입찰룰</Title>
        {/* <Button onClick={selectRFQList}>저장</Button> */}
        <Button onClick={onSaveContents}>저장</Button>
      </ButtonWrapper>
      <SubTitle>RFQ 정보</SubTitle>
      <section>
        <InputContainer>
        <BidInfo label="RFQ 번호" value={rfqListData.rfq_no}/>
        <BidInfo label="단계" value={stage}/>
        <BidInfo label="Status" value={rfqListData.cd_v_meaning_status}/>
        <BidInfo label="Type" value={rfqListData.cd_v_meaning_type}/>
        <BidInfo label='건명' value={rfqListData.rfq_description}/> 
        <BidInfo label='담당자' value={rfqListData.buyer_name +" / "+rfqListData.buyer_dept_name +" / "+rfqListData.buyer_contact}/>
        <BidInfo label="정산주기" value={rfqListData.po_payment_cycle}/>
        <BidInfo label="협업 유형" value={rfqListData.po_collabo_type}/>
        <BidInfo label="계약 기간(BPA)" value={rfqListData.start_date}/>
        {/* <BidInfo label="계약 기간(BPA)" value={rfqCondition.END_DATE}/> */}
        <BidInfo label="Amount Limit" value={rfqListData.amount_limit}/>
        <BidInfo label="납품 지역" value={rfqListData.rfq_ship_to}/>
        <BidInfo label="지불 조건" value={rfqListData.rfq_payment_terms}/>
        <BidInfo label="인도 조건" value={rfqListData.bidding_fob}/>
        </InputContainer>
      </section>
        <SubTitle>공급사 선정</SubTitle>
       
        {/* <RFQAgGridInsertBid listData={rfqListData}/> */}
        <SubTitle>입찰 룰 (승인상태 : 미승인)</SubTitle>
        <section>
        <InfoContainer>
          <InputSelect
            id="bid_type_code"
            inputLabel="입찰유형"
            handlePoCondition={handleBidCondition}
            lov={bidTypeLov}
          />
          <InputSelect
            id="bid_price_method"
            inputLabel="단가입력방식"
            handlePoCondition={handleBidCondition}
            lov={bidPriceMethodLov}
          />
          <InputSelect
            id="bid_method_type"
            inputLabel="낙찰제도"
            handlePoCondition={handleBidCondition}
            lov={bidMethodTypeLov}
          />
          <InputInfo
            id="bid_method_type"
            inputLabel="허용통화"
            handlePoCondition={handleBidCondition}
            inputValue={bidCondition.bid_method_type}
          />
          <InputSelect
            id="max_round"
            inputLabel="Max 라운드"
            handlePoCondition={handleBidCondition}
            lov={bidMaxRoundLov}
          />
          <InputDate
            id="roundPeriod"
            inputLabel="라운드 시작/마감"
            handleCondition={handleBidCondition}
          />
          {/* <BidInfo label='라운드 시작/마감' value={roundPeriod}></BidInfo> */}
           <InputSelect
            id="main_currency"
            inputLabel="통화"
            handlePoCondition={handleBidCondition}
            lov={bidCurrencyCodeLov}
          />
          <InputInfo
            id="side_conditions"
            inputLabel="부가조건"
            handlePoCondition={handleBidCondition}
            inputValue={bidCondition.side_conditions}
          />
          <InputInfo
            id="target_price"
            inputLabel="Target Price"
            handlePoCondition={handleBidCondition}
            inputValue={bidCondition.target_price}
          />
          <RuleTextArea label='안내사항' value={bidCondition.note_to_bidder}></RuleTextArea>
          <RuleTextArea label='내부 보고' value={bidCondition.note_to_bidder}></RuleTextArea>
        </InfoContainer>
        </section>

        {/* RFQ 첨부 */}
        <Upload/>
    </StyledRoot>
  );
}
export default RfqDetail;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 2rem 2rem 0.5rem;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 2rem 2rem 0.5rem;
  gap: 1rem;
`;

const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 1fr 1.5fr 0.5fr 0.5fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
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
  margin-bottom: 1.0rem;
  // margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex; 
  justify-content: flex-end;
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

const Label = styled.label`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 90%;
  height: 100%;
`;

const InputFile = styled.input`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  // margin-top: 1rem;
  width: 90%;
  height: 100%;
`;