import { colors } from "assets/styles/color";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BidWriteDataGrid from "components/bidWrite/BidWriteDataGrid";
import BidInputSelect from "components/bid/BidInputSelect";
import { getKoreanNumber } from "hooks/GetKoreanNumber";
import QuotationInput from "components/bidWrite/QuotationInput";
import { getQuotationItemInfo, postQuotationInfo, postVendorComment } from "apis/bid.api";
import { Button, DeleteButton } from "components/common/CustomButton";
import ConfirmModal from "components/bidWrite/ConfirmModal";
import QuotationSubmitTable from "components/bidWrite/QuotationSubmitTable";
import { downloadFile, uploadContent, uploadFile } from "apis/file.api";
import useDidMountEffect from "hooks/useDidMountEffect";
import { getCookie } from "util/cookie";

function BidWrite() {
  const { id } = useParams();
  const currencyLov = ["KRW", "USD", "JPY", "EUR"];
  const [updateItem, setUpdateItem] = useState({
    vendor_site_id        : getCookie("site_id"),
    quotation_total_price : "",
    rfq_no                : "",
    main_currency         : "",
  });
  const [itemListData, setItemListData] = useState([]);
  // RenderingData
  const [quotationFile, setQuotationFile] = useState([]);
  const [vendorComment, setVendorComment] = useState({
    vendor_site_id    : getCookie("site_id"),
    rfq_no            : "",
    bidding_no        : "",
    quotation_comment : "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [removeList, setRemoveList] = useState([]);
  const [deleteFileIdList, setDeleteFileIdList] = useState([]);

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
      if(e.id === id) tempIdx = idx;
    });

    if(tempList[tempIdx].file_id) {
      // 기존 파일 변경
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name : returnData[0].originFile,
        save_name   : returnData[0].saveFile,
        size        : returnData[0].size + "Bytes",
        upload_date : returnData[0].uploadDate,
        file_path   : returnData[0].saveFolder,
        query_type  : "update",
      }
    } else {
      // 새 파일 추가
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name : returnData[0].originFile,
        save_name   : returnData[0].saveFile,
        size        : returnData[0].size + "Bytes",
        upload_date : returnData[0].uploadDate,
        file_path   : returnData[0].saveFolder,
        query_type  : "insert",
      }
    }
    
    setQuotationFile([...tempList]);

    // 마지막 행에 파일이 추가된 경우, 새 줄 추가
    if(tempIdx === tempList.length - 1) {
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
    
    removeList.map((r) => {
      temp = temp.filter((q, idx) => {
        return q.id !== r || idx === temp.length - 1;
      });
    });
    setQuotationFile([...temp]);
    setRemoveList([]);
  };

  // fileTable row추가
  const onCreate = () => {
    nextId.current += 1;
    const newFile = {
      id             : nextId.current,
      type           : "기타",
      origin_name    : "",
      save_name      : "",
      size           : "",
      upload_date    : "",
      file_path      : "",
      vendor_site_id : getCookie("site_id"),
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

  // 견적정보 가져오기
  const getItemList = async () => {
    const quotationItem = await getQuotationItemInfo(id);
    quotationItem && setItemListData(quotationItem);
    setVendorComment({ ...vendorComment, ["rfq_no"]: quotationItem[0].rfq_no, ["bidding_no"]: id });
    setUpdateItem({ ...updateItem, ["rfq_no"]: quotationItem[0].rfq_no });
  };

  const postVendorInfo = async () => {
    // 공급사 의견 insert
    console.log(vendorComment);
    const data = await postVendorComment(vendorComment);
    if (data) {
      setIsSubmit(true);
    }
    console.log("bid vendor id", data);

    // 견적정보 update
    const data2 = await postQuotationInfo(updateItem);
    if (data2 === true) {
      setIsSubmit(true);
    }
    // file정보 insert
    // if (data === "success") {
    //   return true;
    // }
    // return false;

    let temp = quotationFile;
    temp.forEach((t) => {
      t.bid_vendor_id = data;
    })
    setQuotationFile([...temp]);
    await uploadContent(quotationFile, deleteFileIdList);
  };



  // #region useEffect
  useEffect(() => {
    getItemList();
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
      if (element.quotation_total_price) {
        total += element.quotation_total_price * 1;
      }
    });
    tempConditions.quotation_total_price = total;

    setUpdateItem({ ...tempConditions });
  }, [itemListData]);

  // #endregion useEffect

  return (
    <StyledRoot>
      <Title>응찰서 작성</Title>
      <section>
        <SubTitle>🔹 견적정보</SubTitle>
        <QuotationInfoContainer>
          <InputWrapper>
            <BidInputSelect
              id              = "main_currency"
              inputLabel      = "견적총금액"
              handleCondition = {handleCondition}
              lov             = {currencyLov}
              isDisabled      = {isSubmit}
            />
            <QuotationInput
              id="quotation_total_price"
              priceLabel      = {result}
              currencyLabel   = {updateItem.main_currency}
              handleCondition = {handleCondition}
              inputValue      = {updateItem.quotation_total_price}
              isDisabled      = {isSubmit}
              readOnly        = {true}
            />
          </InputWrapper>
          <BidWriteDataGrid
            itemListData    = {itemListData}
            setItemListData = {setItemListData}
            isDisabled      = {isSubmit}
          />
        </QuotationInfoContainer>
      </section>
      <section>
        <SubmitTitle>
          <p>🔹 견적서 제출</p>
          <DeleteButton onClick={onRemove}>삭제</DeleteButton>
        </SubmitTitle>
        <SubmitQuotationContainer>
          <QuotationSubmitTable
            quotationFile     = {quotationFile}
            handleFileContent = {handleFileContent}
            handleInputChange = {handleInputChange}
            handleRemoveList  = {handleRemoveList}
            isCheckDisabled   = {isSubmit}
            isSelectDisabled  = {isSubmit}
            isBtnDisabled     = {isSubmit}
          ></QuotationSubmitTable>
        </SubmitQuotationContainer>
      </section>
      <section>
        <SubTitle>🔹 공급사 의견</SubTitle>
        <VendorCommentContainer>
          <TextAreaWrapper>
            <TextArea
              onChange={(e) => {
                handleVendorComment(e.target.value);
              }}
              disabled={isSubmit}
            />
          </TextAreaWrapper>
        </VendorCommentContainer>
      </section>
      <ButtonWrapper>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          응찰서 확정
        </Button>
      </ButtonWrapper>
      <ConfirmModal
        isModalOpen     = {isModalOpen}
        setIsModalOpen  = {setIsModalOpen}
        postVendorInfo  = {postVendorInfo}
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
