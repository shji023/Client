import { getRfqInfo, getSearchVendorList } from "apis/rfq.api";
import { getBidTypeLov, getBidPriceMethodLov, getBidMethodTypeLov, getBidMaxRoundLov, getBidCurrencyCodeLov, insertOneBid} from "apis/bid.api";
import { colors } from "assets/styles/color";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
// import InputDate from "components/common/InputDate";
import { useParams } from "react-router-dom";
import BidInfo from "components/bid/BidInfo";
import Upload from "./Upload";
import RuleTextArea from "components/bid/RuleTextArea";
import BidInsertTextArea from "components/bid/BidInsertTextArea";

import InputSelect from "components/common/InputSelect";
import InputDate from "components/common/InputDate";
import InputInfo from "components/common/InputInfo";
import BidInputSelect from "components/bid/BidInputSelect";
import RfqSelectVendor from "components/rfq/RfqSelectVendor";
import BidInputInfo from "components/bid/BidInputInfo";
import BidInputDate from "components/bid/BidInputDate";

function RfqDetail() {
  const {id} = useParams();
  console.log("id : ", id);

  const [bidCondition, setBidCondition] = useState({
    "rfq_no" : id,
    
    "bid_type_code" : "",
    "bid_price_method" : "",
    "bid_method_type" : "",
    "max_round" : 0,

    "main_currency" : "",
    "side_conditions" : "",
    "target_price" : 0,

    "note_to_bidder" : "",
    "bidding_rule_approval_comment" : "",
    
    "simple_quotation_flag" : "",
    "category_id": 0,
    "bidding_fob": "",
  });
  const [rfqListData, setRfqListData] = useState({}); 
  const [ruleInfoData, setRuleInfoData] = useState([]);

  const roundPeriod = ruleInfoData.round_start_date + ' - ' + ruleInfoData.round_end_date;
  const stage = rfqListData?.simple_quotation_flag === 'Y'? '단순견적':'입찰';

  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);
    console.log("rfq select data",data);
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

  const handleCondition = (key, value) => {
    const tempBidCondition = { ...bidCondition };
    tempBidCondition[key] = value;
    setBidCondition(tempBidCondition);
  };

  const saveContents = async () => {
    console.log("onSaveContents called");

    // !: axios 비동기
    const data = await insertOneBid(bidCondition);
    console.log("완료 : ", data);

    if(data === 'success'){
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
    // selectVendorList(id);
    getLov(); 
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
        <RfqInfoContainer>
          <BidInfo label="RFQ 번호" value={id}/>
          {/* <BidInfo label="RFQ 번호" value={rfqListData.rfq_no}/> */}
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
          <BidInfo label="" value={null}/>
        </RfqInfoContainer>
      </section>
      <SubTitle>공급사 선정</SubTitle><br/>
        <RfqSelectVendor id={id} ></RfqSelectVendor><br/>
      <SubTitle>입찰 룰 (승인상태 : 미승인)</SubTitle>
        <section>
          <BidInfoContainer>
            <BidInputSelect
              id="bid_type_code"
              inputLabel="입찰유형"
              handleCondition={handleCondition}
              lov={bidTypeLov}
            />
            <BidInputSelect
              id="bid_price_method"
              inputLabel="단가입력방식"
              handleCondition={handleCondition}
              lov={bidPriceMethodLov}
            />
            <BidInputSelect
              id="bid_method_type"
              inputLabel="낙찰제도"
              handleCondition={handleCondition}
              lov={bidMethodTypeLov}
            />
            <BidInputSelect
              id="max_round"
              inputLabel="Max 라운드"
              handleCondition={handleCondition}
              lov={bidMaxRoundLov}
            />
            <BidInputDate
              id="roundPeriod"
              inputLabel="라운드 시작/마감"
              handleCondition={handleCondition}
            />
            {/* <BidInfo label='라운드 시작/마감' value={roundPeriod}></BidInfo> */}
            <BidInputSelect
              id="main_currency"
              inputLabel="통화"
              handleCondition={handleCondition}
              lov={bidCurrencyCodeLov}
            />
            <BidInputInfo
              id="side_conditions"
              inputLabel="부가조건"
              handleCondition={handleCondition}
              inputValue={bidCondition.side_conditions}
            />
            <BidInputInfo
              id="target_price"
              inputLabel="Target Price"
              handleCondition={handleCondition}
              inputValue={bidCondition.target_price}
            />
            <BidInsertTextArea id="note_to_bidder" inputLabel='안내사항' handleCondition={handleCondition} inputValue={bidCondition.note_to_bidder}></BidInsertTextArea>
            <BidInsertTextArea id="bidding_rule_approval_comment" inputLabel='내부 보고' handleCondition={handleCondition} inputValue={bidCondition.bidding_rule_approval_comment}></BidInsertTextArea>
          </BidInfoContainer>
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

const RfqInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(6) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(10) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(14) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n+11):nth-child(-n+14){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const BidInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(7) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(8) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
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
  width: 93%;
  height: 100%;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-top: 1rem;
  margin-left: 1rem;
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