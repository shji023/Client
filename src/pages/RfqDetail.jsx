import { getRfqInfo } from "apis/rfq.api";
import {
  getBidTypeLov,
  getBidPriceMethodLov,
  getBidMethodTypeLov,
  getBidMaxRoundLov,
  getBidCurrencyCodeLov,
  insertOneBid,
} from "apis/bid.api";
import { colors } from "assets/styles/color";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import InputDate from "components/common/InputDate";
import { useNavigate, useParams } from "react-router-dom";
import BidInfo from "components/bid/BidInfo";
import FileManager from "fileUpload/FileManager";
import BidInsertTextArea from "components/bid/BidInsertTextArea";
import RfqSelectVendor from "components/rfq/RfqSelectVendor";
import RfqInputSelect from "components/rfq/RfqInputSelect";
import RfqInputDate from "components/rfq/RfqInputDate";
import RfqInputInfo from "components/rfq/RfqInputInfo";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import useDidMountEffect from "hooks/useDidMountEffect";
import { uploadContent, uploadFile } from "apis/file.api";
import { DeleteButton } from "components/common/CustomButton";
import QuotationSubmitTable from "components/bidWrite/QuotationSubmitTable";

function RfqDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [bidCondition, setBidCondition] = useState({
    rfq_no: id,

    bid_type_code: "",
    bid_price_method: "",
    bid_method_type: "",
    max_round: 0,

    main_currency: "",
    side_conditions: "",
    target_price: 0,

    note_to_bidder: "",
    bidding_rule_approval_comment: "",

    simple_quotation_flag: "null",
    category_id: 0,
    bidding_fob: "",
    side_conditions: "",
  });
  const [rfqListData, setRfqListData] = useState({});
  const rfqNull = {
    rfq_no: "",
    simple_quotation_flag: "",
    rfq_detail_status: "",
    cd_v_meaning_status: "",
    cd_v_meaning_type: "",

    rfq_description: "",
    buyer_name: "",
    buyer_dept_name: "",
    buyer_contact: "",
    po_payment_cycle: "",

    po_collabo_type: "",
    end_date: "",
    amount_limit: 0,

    rfq_ship_to: "",
    rfq_payment_terms: "",
    po_payment_term: "",
    fob_lookup_code: "",
  };
  const [ruleInfoData, setRuleInfoData] = useState([]);

  const roundPeriod = ruleInfoData.round_start_date + " - " + ruleInfoData.round_end_date;
  // const stage = rfqListData?.simple_quotation_flag === 'Y'? '단순견적':'입찰';
  const stage = rfqListData?.simple_quotation_flag === "1" ? "단순견적" : "입찰";

  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);

    if (data.length == 0) {
      setRfqListData(rfqNull);
    } else {
      setRfqListData(data[0]);
    }
    // setRfqListData(data);
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

  //------------------------------------------------------
  const [vendorFile, setvendorFile] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const nextId = useRef(0);

  // file 변경 내용 입력
  const handleInputChange = async (e) => {
    const formData = new FormData();
    e.target.files[0] && formData.append("file", e.target.files[0]);

    // 파일 정보를 db에 저장
    const returnData = await uploadFile(formData);
    setvendorFile(
      vendorFile.map((q) =>
        q.id === nextId.current
          ? {
              ...q,
              origin_name: returnData[0].originFile,
              save_name: returnData[0].saveFile,
              size: returnData[0].size + "Bytes",
              upload_date: returnData[0].uploadDate,
              file_path: returnData[0].saveFolder,
            }
          : q,
      ),
    );
    setIsAdd(!isAdd);
  };

  const handleRemoveList = (checked, id) => {
    if (checked) {
      setRemoveList([...removeList, id]);
    } else {
      setRemoveList(removeList.filter((r) => r !== id));
    }
  };

  const onRemove = () => {
    let temp = vendorFile;
    removeList.map((r) => {
      temp = temp.filter((q) => q.id !== r);
    });
    setvendorFile([...temp]);
    setRemoveList([]);
  };

  // fileTable row추가
  const onCreate = () => {
    nextId.current += 1;
    const newFile = {
      id: nextId.current,
      type: "",
      origin_name: "",
      save_name: "",
      size: "",
      upload_date: "",
      file_path: "",
      rfq_no: id,
    };
    setvendorFile([...vendorFile, newFile]);
  };

  // file content 내용 등록
  const handleFileContent = (key, value) => {
    setvendorFile(
      vendorFile.map((q) =>
        q.id === nextId.current
          ? {
              ...q,
              type: value,
            }
          : q,
      ),
    );
  };

  useDidMountEffect(() => {
    onCreate();
  }, [isAdd]);

  useDidMountEffect(() => {}, [vendorFile]);
  //--------------------------------------------------------------
  const saveContents = async () => {
    // 서버에 파일저장
    const returnData = await uploadContent(vendorFile);
    const data = await insertOneBid(bidCondition);

    if (data === "success" && returnData) {
      confirm("입찰룰이 완료되었습니다. 입찰진행현황조회 페이지로 이동하겠습니까?")
        ? navigate(`/bidList`)
        : null;
    } else {
      alert("입찰룰이 실패했습니다.");
    }
  };

  const onSaveContents = () => {
    confirm("입찰룰 작성을 완료하시겠습니까?") ? saveContents() : null;
  };

  useEffect(() => {
    selectRFQDetail(id);
    getLov();
  }, []);

  return (
    <StyledRoot>
      <HeaderWrapper>
        <Title>입찰룰</Title>
        <Button
          onClick={() => {
            onSaveContents();
          }}
        >
          저장
        </Button>
      </HeaderWrapper>
      <SubTitle>RFQ 정보</SubTitle>
      <section>
        <RfqInfoContainer>
          <BidInfo label="RFQ 번호" value={id} />
          <BidInfo label="단계" value={stage} />
          {/* <BidInfo label="Status" value={rfqListData.rfq_status}/> */}
          <BidInfo label="Status" value={rfqListData.cd_v_meaning_status} />
          <BidInfo label="Type" value={rfqListData.cd_v_meaning_type} />
          <BidInfo label="건명" value={rfqListData.rfq_description} />
          <BidInfo
            label="담당자"
            value={
              rfqListData.buyer_name +
              " / " +
              rfqListData.buyer_dept_name +
              " / " +
              rfqListData.buyer_contact
            }
          />
          <BidInfo label="정산주기" value={rfqListData.po_payment_cycle} />
          <BidInfo label="협업 유형" value={rfqListData.po_collabo_type} />
          <BidInfo label="계약 기간(BPA)" value={rfqListData.end_date} />
          <BidInfo label="Amount Limit" value={rfqListData.amount_limit} />
          <BidInfo label="납품 지역" value={rfqListData.rfq_ship_to} />
          <BidInfo label="지불 조건" value={rfqListData.rfq_payment_terms} />
          <BidInfo label="인도 조건" value={rfqListData.fob_lookup_code} />
          <BidInfo label="" value={null} />
        </RfqInfoContainer>
      </section>
      <SubTitle>공급사 선정</SubTitle>
      <br />
      <RfqSelectVendorContainer>
        <RfqSelectVendor id={id}></RfqSelectVendor>
      </RfqSelectVendorContainer>
      <SubTitle>입찰 룰</SubTitle>
      <section>
        <BidInfoContainer>
          <RfqInputSelect
            id="bid_type_code"
            inputLabel="입찰유형"
            handleCondition={handleCondition}
            lov={bidTypeLov}
          />
          <RfqInputSelect
            id="bid_price_method"
            inputLabel="단가입력방식"
            handleCondition={handleCondition}
            lov={bidPriceMethodLov}
          />
          <RfqInputSelect
            id="bid_method_type"
            inputLabel="낙찰제도"
            handleCondition={handleCondition}
            lov={bidMethodTypeLov}
          />
          <RfqInputSelect
            id="max_round"
            inputLabel="Max 라운드"
            handleCondition={handleCondition}
            lov={bidMaxRoundLov}
          />
          <RfqInputDate
            id="roundPeriod"
            inputLabel="라운드 시작/마감"
            handleCondition={handleCondition}
          />
          <RfqInputSelect
            id="main_currency"
            inputLabel="통화"
            handleCondition={handleCondition}
            lov={bidCurrencyCodeLov}
          />
          <RfqInputInfo
            id="side_conditions"
            inputLabel="부가조건"
            handleCondition={handleCondition}
            inputValue={bidCondition.side_conditions}
          />
          <RfqInputInfo
            id="target_price"
            inputLabel="Target Price"
            handleCondition={handleCondition}
            inputValue={bidCondition.target_price}
          />
          <BidInsertTextArea
            id="note_to_bidder"
            inputLabel="안내사항"
            handleCondition={handleCondition}
            inputValue={bidCondition.note_to_bidder}
          ></BidInsertTextArea>
          <BidInsertTextArea
            id="bidding_rule_approval_comment"
            inputLabel="내부 보고"
            handleCondition={handleCondition}
            inputValue={bidCondition.bidding_rule_approval_comment}
          ></BidInsertTextArea>
        </BidInfoContainer>
      </section>
      <RfqSelectVendorContainer>
        {/* <FileManager content={content} handleFileCondition={handleFileCondition} fileInfoList={fileInfoList}/> */}
        <SubmitQuotationContainer>
          <ButtonWrapper>
            <DeleteButton onClick={onRemove}>삭제</DeleteButton>
          </ButtonWrapper>
          <QuotationSubmitTable
            // fileInfoList={fileInfoList}
            quotationFile={vendorFile}
            handleFileContent={handleFileContent}
            handleInputChange={handleInputChange}
            handleRemoveList={handleRemoveList}
          ></QuotationSubmitTable>
        </SubmitQuotationContainer>
      </RfqSelectVendorContainer>
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

const SubmitQuotationContainer = styled.div`
  padding: 2rem 0rem;
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
  & > div:nth-child(n + 11):nth-child(-n + 14) {
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

const RfqSelectVendorContainer = styled.div`
  padding: 1rem 2rem 2rem 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0rem;
  gap: 1rem;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0rem;
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

const ListCount = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  width: 80%;
  height: 100%;
  font-family: "Pretendard-SemiBold";
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
