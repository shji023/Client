import { colors } from "assets/styles/color";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { getKoreanNumber } from "hooks/GetKoreanNumber";
import { getQuotationItemInfo, updateQuotationInfo, insertVendorComment, getVendorComment, getItemInfo, getVendorItemList } from "apis/bid.api";
import { Button, DeleteButton } from "components/common/CustomButton";
import BidWriteDataGrid from "components/bidWrite/BidWriteDataGrid";
import BidInputSelect from "components/bid/BidInputSelect";
import QuotationInput from "components/bidWrite/QuotationInput";
import ConfirmModal from "components/bidWrite/ConfirmModal";
import QuotationSubmitTable from "components/bidWrite/QuotationSubmitTable";
import { downloadFile, getBidVendorFileList, uploadContent, uploadFile } from "apis/file.api";
import useDidMountEffect from "hooks/useDidMountEffect";
import { getCookie } from "util/cookie";
import { reload } from "hooks/CommonFunction";
import InputSelect from "components/common/InputSelect";

function BidWrite() {
  const { bidding_no, bid_vendor_id } = useParams();
  const navigate = useNavigate();
  const currencyLov = [ 
    ["KRW", "KRW"], 
    ["USD", "USD"], 
    ["JPY", "JPY"], 
    ["EUR", "EUR"]
  ];
  const [updateItem, setUpdateItem] = useState({
    vendor_site_id: getCookie("site_id"),
    quotation_total_price: "",
    rfq_no: "",
    main_currency: "",
  });
  const [itemListData, setItemListData] = useState([]);
  // RenderingData
  const [quotationFile, setQuotationFile] = useState([]);
  const [vendorComment, setVendorComment] = useState({
    vendor_site_id: getCookie("site_id"),
    rfq_no: "",
    bidding_no: "",
    quotation_comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [removeList, setRemoveList] = useState([]);
  const [deleteFileIdList, setDeleteFileIdList] = useState([]);


  // #region 수정 모드 변경용 State
  const [disabled, setDisabled] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("inline-block");
  const [buttonDisplayToggle, setButtonDisplayToggle] = useState("none");
  const showDisplay = (isDisplay) => {
    isDisplay ? setButtonDisplay("inline-block") : setButtonDisplay("none");
  };
  const showDisplayToggle = (isDisplay) => {
    isDisplay ? setButtonDisplayToggle("inline-block") : setButtonDisplayToggle("none");
  };
  const setReadOnly = (isReadOnly) => {
    if (isReadOnly) {
      setDisabled(true);
      showDisplay(false);
      showDisplayToggle(true);
    } else {
      setDisabled(false);
      showDisplay(true);
      showDisplayToggle(false);
    }
  };
  // #endregion 수정 모드 변경용 State


  const nextId = useRef(0);
  const result = getKoreanNumber(updateItem.quotation_total_price);

  // Item 견적가 입력
  const handleCondition = (key, value) => {
    const tempUpdateItem = { ...updateItem };
    tempUpdateItem[key] = value;
    setUpdateItem(tempUpdateItem);
  };

  // #region File Input 관련 이벤트


  // file 변경 내용 입력
  const handleInputChange = async (e, id) => {
    const formData = new FormData();
    e.target.files[0] && formData.append("file", e.target.files[0]);

    const returnData = await uploadFile(formData);

    let tempList = quotationFile;
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

    setQuotationFile([...tempList]);

    // 마지막 행에 파일이 추가된 경우, 새 줄 추가
    if (tempIdx === tempList.length - 1) {
      setIsAdd(!isAdd);
    }
  };
  // const handleInputChange = async (e) => {
  //   const formData = new FormData();
  //   e.target.files[0] && formData.append("file", e.target.files[0]);

  //   const returnData = await uploadFile(formData);
  //   setQuotationFile(
  //     quotationFile.map((q) =>
  //       q.id === nextId.current
  //         ? {
  //             ...q,
  //             origin_name : returnData[0].originFile,
  //             save_name   : returnData[0].saveFile,
  //             size        : returnData[0].size + "Bytes",
  //             upload_date : returnData[0].uploadDate,
  //             file_path   : returnData[0].saveFolder,
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
    let temp = quotationFile;
    let delTemp = [];

    removeList.map((r) => {
      temp = temp.filter((q, idx) => {
        if (q.id !== r || idx === temp.length - 1) {
          // 유지될 항목
          return true;
        } else {
          // 삭제될 항목
          if (q.file_id) delTemp.push(q.file_id);
          return false;
        }
      });
    });
    setQuotationFile([...temp]);
    setRemoveList([]);

    setDeleteFileIdList([...deleteFileIdList, ...delTemp]);
  };

  // fileTable row추가
  const onCreate = () => {
    nextId.current += 1;
    const newFile = {
      id: nextId.current,
      type: "기타",
      origin_name: "",
      save_name: "",
      size: "",
      upload_date: "",
      file_path: "",
      vendor_site_id: getCookie("site_id"),
    };
    setQuotationFile([...quotationFile, newFile]);
  };

  // file content 내용 등록
  const handleFileContent = (key, value) => {
    setQuotationFile(
      quotationFile.map((q) =>
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

  // 공급사 의견 입력
  const handleVendorComment = (value) => {
    const tempVendorComment = { ...vendorComment };
    tempVendorComment["quotation_comment"] = value;
    setVendorComment(tempVendorComment);
  };

  const getFileInfo = async (bid_vendor_id) => {
    // #region File
    let fileData = await getBidVendorFileList(bid_vendor_id);
    console.log("fileData", fileData);
    if(fileData){
      fileData.forEach((element) => {
        element.id = nextId.current++;
        // element.query_type = "update";
      });

    } else {
      fileData = [];
    }
    

    const newFile = {
      id          : nextId.current,
      type        : "",
      origin_name : "",
      save_name   : "",
      size        : "",
      upload_date : "",
      file_path   : "",
    };
    setQuotationFile([...fileData, newFile]);
    console.log("nextId.current", nextId.current);
    // #endregion File
  }

  // 견적정보 가져오기
  const initPage = async () => {
    // 수정 페이지
    if(bid_vendor_id) {
      console.log(updateItem);
      // 품목 견적가 가져오기
      const itemInfo = await getVendorItemList(bidding_no, bid_vendor_id, getCookie("site_id"));
      console.log("itemInfo", itemInfo);
      itemInfo && setItemListData([...itemInfo]);


      // 파일 목록 가져오기
      const fileData = await getFileInfo(bid_vendor_id);

      // 코멘트 가져오기
      const vendorCommentData = await getVendorComment(bid_vendor_id);
      setVendorComment({...vendorCommentData, /*vendor_site_id : getCookie("site_id")*/})

      setReadOnly(true);
    }
    // 생성 페이지
    else {
      const quotationItem = await getQuotationItemInfo(bidding_no);
      quotationItem && setItemListData(quotationItem);
      console.log(quotationItem)
      setUpdateItem({ ...updateItem, ["rfq_no"]: quotationItem[0].rfq_no });
      setVendorComment({ ...vendorComment, ["rfq_no"]: quotationItem[0].rfq_no, ["bidding_no"]: bidding_no });

      setReadOnly(false);
    }
    

  };

  const insertVendorInfo = async () => {
    // 공급사 의견 insert
    
    console.log("itemListData", itemListData);
    console.log("vendorComment", vendorComment);
    const bid_vendor_id = await insertVendorComment(itemListData, vendorComment);
    console.log("bid vendor id", bid_vendor_id);

    // 견적정보 update
    const data2 = await updateQuotationInfo(updateItem);

    // 파일 정보 DB에 저장
    let temp = quotationFile;
    temp.forEach((t) => {
      t.bid_vendor_id = bid_vendor_id;
    });
    setQuotationFile([...temp]);
    await uploadContent(quotationFile, deleteFileIdList);

    if(bid_vendor_id) {
      alert("작성이 완료되었습니다.");
      // 수정 페이지로 이동
      navigate(`/bidWrite/${bidding_no}/${bid_vendor_id}` /* , { replace: true} */);
      reload();
    } else {
      alert("작성이 완료되지 않았습니다.");
    }
   
  };

  // #region 버튼
  const onClickChangeReadOnly = () => {
    setReadOnly(false);
  };
  const onClickUpdateRfq = async () => {
    let res = confirm("수정 하시겠습니까?");
    if (res) {
      // TODO : 필수 입력사항 입력했는지 체크하기
      // const data = await updateRfqInfo(
      //   rfqListData,
      //   selectedVendorList,
      //   productInfoData,
      //   deletedVendorIdList,
      //   deletedProductIdList,
      // );

      // const rfqNum = data;

      await updateFileContent();

      if (res) {
        alert("수정이 완료되었습니다.");
        reload();
      } else {
        alert("수정이 되지 않았습니다.");
      }
    }
  };

  const updateFileContent = async ()=> {
      let temp = quotationFile;
      temp.forEach((t) => {
        t.bid_vendor_id = bid_vendor_id;
      });
      setQuotationFile([...temp]);
      const data = await uploadContent(quotationFile, deleteFileIdList);
      return data;
  }

  // 버튼 컴포넌트
  const ButtonSelector = () => {
    if (bid_vendor_id) {
      // 수정
      return (
        <section>
          <Button style={{ display: buttonDisplayToggle }} onClick={onClickChangeReadOnly}>
            응찰서 수정
          </Button>
          <Button style={{ display: buttonDisplay }} onClick={onClickUpdateRfq}>
            응찰서 저장
          </Button>
        </section>
      );
    } else {
      // 생성
      return  <Button onClick={() => {setIsModalOpen(true);}}>
        응찰서 확정
      </Button>;
    }
  };
  // #endregion 버튼

  // #region useEffect
  useEffect(() => {
    initPage();
  }, []);

  useDidMountEffect(() => {
    onCreate();
  }, [isAdd]);

  useDidMountEffect(() => {
    console.log(quotationFile);
  }, [quotationFile]);

  useEffect(() => {
    // * 헤더 총 금액 계산
    const tempConditions = updateItem;
    const tempRowData = itemListData;
    let total = 0;
    tempRowData.forEach((element) => {
      if (element.unit_price) {
        total += element.unit_price * 1;
      }
    });
    tempConditions.quotation_total_price = total;

    setUpdateItem({ ...tempConditions });

    console.log("itemListData", itemListData)
  }, [itemListData]);

  // #endregion useEffect

  return (
    <StyledRoot>
      <Title>응찰서 작성</Title>
      <section>
        <SubTitle>견적정보</SubTitle>
        <QuotationInfoContainer>
          <InputWrapper>
            <InputSelect
              id="main_currency"
              inputLabel="견적총금액"
              initValue={updateItem.main_currency}
              handlePoCondition={handleCondition}
              lov={currencyLov}
              disabled={disabled}
            />
            <QuotationInput
              id="quotation_total_price"
              priceLabel={result}
              currencyLabel={updateItem.main_currency}
              handleCondition={handleCondition}
              inputValue={updateItem.quotation_total_price}
              isDisabled={true}
              readOnly={true}
            />
          </InputWrapper>
          <BidWriteDataGrid
            itemListData={itemListData}
            setItemListData={setItemListData}
            isDisabled={disabled}
          />
        </QuotationInfoContainer>
      </section>
      <section>
        <SubmitTitle>
          <p>견적서 제출</p>
          <DeleteButton onClick={onRemove}>삭제</DeleteButton>
        </SubmitTitle>
        <SubmitQuotationContainer>
          <QuotationSubmitTable
            quotationFile={quotationFile}
            handleFileContent={handleFileContent}
            handleInputChange={handleInputChange}
            handleRemoveList={handleRemoveList}
            isCheckDisabled={disabled}
            isSelectDisabled={disabled}
            isBtnDisabled={disabled}
          ></QuotationSubmitTable>
        </SubmitQuotationContainer>
      </section>
      <section>
        <SubTitle>공급사 의견</SubTitle>
        <VendorCommentContainer>
          <TextAreaWrapper>
            <TextArea

              onChange={(e) => {
                handleVendorComment(e.target.value);
              }}
              disabled={disabled}
              value = {vendorComment.quotation_comment}
            />
          </TextAreaWrapper>
        </VendorCommentContainer>
      </section>
      <ButtonWrapper>
        <ButtonSelector />
      </ButtonWrapper>
      <ConfirmModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        postVendorInfo={insertVendorInfo}
      />
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
  & > div:nth-child(n + 1):nth-child(-n + 2) {
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
  font-family: "Pretendard-SemiBold";
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const SubmitTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 2rem;
  font-size: 1.8rem;
`;
