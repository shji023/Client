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
import { uploadContent, uploadFile } from "apis/file.api";

function BidWrite() {
  const { id } = useParams();
  const currencyLov = ["KRW", "USD", "JPY", "EUR"];
  const [updateItem, setUpdateItem] = useState({
    vendor_site_id: "822",
    quotation_total_price: "",
    rfq_no: "",
    main_currency: "",
  });
  const [itemListData, setItemListData] = useState([]);
  const [quotationFile, setQuotationFile] = useState([
    // {
    //   id: 0,
    //   fileType: "",
    //   fileName: "",
    //   size: "",
    //   registerDate: "",
    // },
  ]);
  // const [content, setContent] = useState({});
  const [vendorComment, setVendorComment] = useState({
    vendor_site_id: "822",
    rfq_no: "",
    bidding_no: "",
    quotation_comment: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const nextId = useRef(0);
  const result = getKoreanNumber(updateItem.quotation_total_price);

  // Item 견적가 입력
  const handleCondition = (key, value) => {
    const tempUpdateItem = { ...updateItem };
    tempUpdateItem[key] = value;
    setUpdateItem(tempUpdateItem);
  };

  // file 변경 내용 입력
  const handleInputChange = async (e) => {
    const formData = new FormData();
    e.target.files[0] && formData.append("file", e.target.files[0]);

    const returnData = await uploadFile(formData);
    console.log(returnData[0].originFile);

    setQuotationFile(
      quotationFile.map((q) =>
        q.id === nextId.current
          ? {
              ...q,
              fileName: returnData[0].originFile,
              size: "123byte",
              registerDate: "202206021",
            }
          : q,
      ),
    );
    setIsAdd(!isAdd);
    // setTimeout(() => {
    //   onCreate();
    // }, 3000);
    //
    //console.log(q.id, nextId.current)
    //await uploadContent(content);
  };

  useEffect(() => {
    console.log("--------------");
    onCreate();
  }, [isAdd]);

  // fileTable row추가
  const onCreate = () => {
    nextId.current += 1;
    const newFile = {
      id: nextId.current,
      fileType: "기타",
      fileName: "",
      size: "",
      registerDate: "",
    };
    setQuotationFile([...quotationFile, newFile]);
  };
  // file content 내용 등록
  const handleFileContent = (key, value) => {
    // const tempFileContent = { ...content };
    // tempFileContent[key] = value;
    // setQuotationFile(tempFileContent);
    console.log(key, value);
    console.log(quotationFile);

    setQuotationFile(
      console.log("ffff"),
      quotationFile.map((q) =>
        q.id === nextId.current
          ? {
              ...q,
              fileType: value,
            }
          : q,
      ),
    );
  };

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
    const data = await postVendorComment(vendorComment);
    if (data === true) {
      setIsSubmit(true);
    }
    // 견적정보 update
    const data2 = await postQuotationInfo(updateItem);
    if (data2 === true) {
      setIsSubmit(true);
    }
    // file정보 insert
  };

  useEffect(() => {
    getItemList();
  }, []);

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

  return (
    <StyledRoot>
      <Title>응찰서 작성</Title>
      <section>
        <SubTitle>견적정보</SubTitle>
        <QuotationInfoContainer>
          <InputWrapper>
            <BidInputSelect
              id="main_currency"
              inputLabel="견적총금액"
              handleCondition={handleCondition}
              lov={currencyLov}
              isDisabled={isSubmit}
            />
            <QuotationInput
              id="quotation_total_price"
              priceLabel={result}
              currencyLabel={updateItem.main_currency}
              handleCondition={handleCondition}
              inputValue={updateItem.quotation_total_price}
              isDisabled={isSubmit}
            />
          </InputWrapper>
          <BidWriteDataGrid
            itemListData={itemListData}
            setItemListData={setItemListData}
            isDisabled={isSubmit}
          />
        </QuotationInfoContainer>
      </section>
      <section>
        <SubmitTitle>
          <p>견적서 제출</p>
          <DeleteButton>삭제</DeleteButton>
        </SubmitTitle>
        <SubmitQuotationContainer>
          <QuotationSubmitTable
            quotationFile={quotationFile}
            onCreate={onCreate}
            handleFileContent={handleFileContent}
            handleInputChange={handleInputChange}
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
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        postVendorInfo={postVendorInfo}
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
`;

const SubTitle = styled.p`
  font-size: 1.6rem;
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
  font-size: 1.6rem;
`;
