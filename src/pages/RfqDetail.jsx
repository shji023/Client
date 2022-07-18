import { getRfqInfo, updateRfqStatus } from "apis/rfq.api";
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
import BidInsertTextArea from "components/bid/BidInsertTextArea";
import RfqVendorGrid from "components/rfq/RfqSelectVendor";
import { HeaderWrapper } from "components/common/CustomWrapper";
import useDidMountEffect from "hooks/useDidMountEffect";
import { uploadContent, uploadFile } from "apis/file.api";
import { DeleteButton, GetDataButton } from "components/common/CustomButton";
import QuotationSubmitTable from "components/bidWrite/QuotationSubmitTable";
import InputSelect from "components/common/InputSelect";
import InputInfo from "components/common/InputInfo";
import InputOneDate from "components/common/InputOneDate";
import { getFormattedDate } from "hooks/CommonFunction";

function RfqDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [bidCondition, setBidCondition] = useState({});

  const handleAuto = () => {
    setBidCondition({
      ...bidCondition,
      rfq_no: id,

      bid_type_code: "BID",
      bid_price_method: "Item by Item",
      bid_method_type: "A",
      max_round: 1,

      main_currency: "KRW",
      side_conditions: "TP 105",
      target_price: 50000000,

      note_to_bidder: "안내사항 입니다.",
      bidding_rule_approval_comment: "내부보고 입니다.",

      simple_quotation_flag: null,
      category_id: 0,
      bidding_fob: "",

      roundPeriod: "2022-07-102022-07-16",
    });
  };
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
  const [isHidden, setIsHidden] = useState(false);
  const roundPeriod = ruleInfoData.round_start_date + " - " + ruleInfoData.round_end_date;
  // const stage = rfqListData?.simple_quotation_flag === 'Y'? '단순견적':'입찰';
  const stage = rfqListData?.simple_quotation_flag === "1" ? "단순견적" : "입찰";

  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);
    if (data && data[0].cd_v_meaning_status === "완료") {
      setIsHidden(true);
    }
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
  const [vendorFile, setVendorFile] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const nextId = useRef(0);
  const [deleteFileIdList, setDeleteFileIdList] = useState([]);

  // #region File Input 관련 이벤트
  // file 변경 내용 입력
  const handleInputChange = async (e, id) => {
    const formData = new FormData();
    e.target.files[0] && formData.append("file", e.target.files[0]);

    const returnData = await uploadFile(formData);

    let tempList = vendorFile;
    let tempIdx = tempList.length - 1;
    tempList.forEach((e, idx) => {
      if (e.id === id) tempIdx = idx;
    });

    if (tempList[tempIdx].file_id) {
      // 기존 파일 변경
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name: returnData[0].originFile,
        save_name: returnData[0].saveFile,
        size: returnData[0].size + "Bytes",
        upload_date: returnData[0].uploadDate,
        file_path: returnData[0].saveFolder,
        query_type: "update",
      };
    } else {
      // 새 파일 추가
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name: returnData[0].originFile,
        save_name: returnData[0].saveFile,
        size: returnData[0].size + "Bytes",
        upload_date: returnData[0].uploadDate,
        file_path: returnData[0].saveFolder,
        query_type: "insert",
      };
    }

    setVendorFile([...tempList]);

    // 마지막 행에 파일이 추가된 경우, 새 줄 추가
    if (tempIdx === tempList.length - 1) {
      setIsAdd(!isAdd);
    }
  };

  // const handleInputChange = async (e) => {
  //   const formData = new FormData();
  //   e.target.files[0] && formData.append("file", e.target.files[0]);

  //   // 파일 정보를 db에 저장
  //   const returnData = await uploadFile(formData);
  //   setVendorFile(
  //     vendorFile.map((q) =>
  //       q.id === nextId.current
  //         ? {
  //             ...q,
  //             origin_name: returnData[0].originFile,
  //             save_name: returnData[0].saveFile,
  //             size: returnData[0].size + "Bytes",
  //             upload_date: returnData[0].uploadDate,
  //             file_path: returnData[0].saveFolder,
  //             query_type  : "insert",
  //           }
  //         : q,
  //     ),
  //   );
  //   setIsAdd(!isAdd);
  // };

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
      temp = temp.filter((q, idx) => {
        return q.id !== r || idx === temp.length - 1;
      });
    });
    setVendorFile([...temp]);
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
    };
    setVendorFile([...vendorFile, newFile]);
  };

  // file content 내용 등록
  const handleFileContent = (key, value) => {
    setVendorFile(
      vendorFile.map((q) =>
        // q.id === nextId.current
        q.id === key
          ? {
              ...q,
              type: value,
            }
          : q,
      ),
    );
  };
  // #endregion File Input 관련 이벤트

  const onSaveContents = () => {
    console.log("bidCondition", bidCondition);
    confirm("입찰룰 작성을 완료하시겠습니까?") ? saveContents() : null;
  };

  const saveContents = async () => {
    const data = await insertOneBid(bidCondition);
    console.log("bidding no : ", data);

    // #region DB에 파일 정보저장
    let temp = vendorFile;
    temp.forEach((t) => {
      t.bidding_no = data;
    });
    setVendorFile([...temp]);
    const returnData = await uploadContent(vendorFile, deleteFileIdList);
    // #endregion DB에 파일 정보 저장

    if (data && returnData) {
      await updateRfqStatus(id);
      confirm("입찰룰이 완료되었습니다. 입찰진행현황조회 페이지로 이동하겠습니까?")
        ? navigate(`/bidList`)
        : null;
    } else {
      alert("입찰룰이 실패했습니다.");
    }
  };

  // #region useEffect
  useDidMountEffect(() => {
    onCreate();
  }, [isAdd]);

  useDidMountEffect(() => {}, [vendorFile]);

  useEffect(() => {
    selectRFQDetail(id);
    getLov();
  }, []);
  // #endregion useEffect

  return (
    <StyledRoot>
      <HeaderWrapper>
        <Title>입찰룰</Title>
        <section>
          <GetDataButton onClick={handleAuto}>AUTO</GetDataButton>
          <Button isHidden={isHidden} onClick={() => { onSaveContents(); }}>저장</Button>
        </section>
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
          <BidInfo label="계약 기간(BPA)" value={getFormattedDate(rfqListData.end_date)} />
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
        <RfqVendorGrid id={id}></RfqVendorGrid>
      </RfqSelectVendorContainer>
      <SubTitle>입찰 룰</SubTitle>
      <section>
        <BidInfoContainer>
          <InputSelect
            id="bid_type_code"
            inputLabel="입찰유형"
            initValue={bidCondition.bid_type_code}
            handlePoCondition={handleCondition}
            lov={bidTypeLov}
          />
          <InputSelect
            id="bid_price_method"
            inputLabel="단가입력방식"
            initValue={bidCondition.bid_price_method}
            handlePoCondition={handleCondition}
            lov={bidPriceMethodLov}
          />
          <InputSelect
            id="bid_method_type"
            inputLabel="낙찰제도"
            initValue={bidCondition.bid_method_type}
            handlePoCondition={handleCondition}
            lov={bidMethodTypeLov}
          />
          <InputSelect
            id="max_round"
            inputLabel="Max 라운드"
            initValue={bidCondition.max_round}
            handlePoCondition={handleCondition}
            lov={bidMaxRoundLov}
          />
          <InputOneDate
            id="roundPeriod"
            inputLabel="라운드 시작/마감"
            initValue={bidCondition.roundPeriod}
            handleCondition={handleCondition}
          />
          <InputSelect
            id="main_currency"
            inputLabel="통화"
            initValue={bidCondition.main_currency}
            handlePoCondition={handleCondition}
            lov={bidCurrencyCodeLov}
          />
          <InputInfo
            id="side_conditions"
            inputLabel="부가조건"
            handlePoCondition={handleCondition}
            inputValue={bidCondition.side_conditions}
          />
          <InputInfo
            id="target_price"
            inputLabel="Target Price"
            handlePoCondition={handleCondition}
            type={"number"}
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

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.5rem;
  :hover {
    cursor: pointer;
    background-color: ${colors.subBlue};
  }
  margin-left: 1rem;
  // margin-bottom: 1rem;
  margin-right: 2rem;
  display: ${({ isHidden }) => (isHidden ? "none" : undefined)};
`;
