import { getRfqStatusLov, getRfqCategoryLov, getSearchRfqList, getRfqInfo } from "apis/rfq.api";
import { colors } from "assets/styles/color";
import RFQAgGridInsertBid from "components/rfq/RFQAgGridInsertBid";
import React, { useEffect, useState} from "react";
import styled from "styled-components";
// import InputDate from "components/common/InputDate";
import { useParams } from "react-router-dom";
import BidInfo from "components/bid/BidInfo";


function InsertBid() {

  const {id} = useParams();
  console.log("id : ", id);

  const [rfqListData, setRfqListData] = useState({
    rfq_no: "",
    simple_quotation_flag:"",
    rfq_detail_status:"",

    cd_v_meaning_status:"",
    cd_v_meaning_type:"",
    category_segment:"",
    line_type_id :"",

    rfq_description:"",
    buyer_id: "",

    start_date:"",
    end_date:"",
    amount_limit:"",

    rfq_ship_to:"",
    rfq_payment_terms:"",
    bidding_fob:"",
  });


  const selectRFQDetail = async (id) => {
    const data = await getRfqInfo(id);
    console.log("data~~~~",data);

    setRfqListData(data[0]);
  };


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
        const result = await restClient.uploadFile(this.state.file, this.state.title, this.state.details)
        if (!result) this.displayTheError('No user found');
    } catch (e) {
        await this.toggleErrorAsync(e.message);
        return;
    }
    await this.fetchMetadata(0, pageSize);
  }

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'file' ? e.target.files[0] : target.value;
    const name = target.name;
    this.setState({
        [name]: value, error: ""
    });
  };



  // const getLov = async () => {
  //   const rfqStatusLov = await getRfqStatusLov();
  //   const rfqCategoryLov = await getRfqCategoryLov();

  //   rfqStatusLov && setRfqStatusLov(rfqStatusLov);
  //   rfqCategoryLov && setRfqCategoryLov(rfqCategoryLov);
  // };

  useEffect(() => {
    selectRFQDetail(id);
  }, []);

  return (
    <StyledRoot>
      <ButtonWrapper>   
        <Title>입찰룰</Title>
        {/* <Button onClick={selectRFQList}>저장</Button> */}
      </ButtonWrapper>
      <SubTitle>RFQ 정보</SubTitle>
      <section>
        <InputContainer>
        <BidInfo
            label="RFQ 번호"
            value={rfqListData.rfq_no}
        />
        <BidInfo
            label="단계"
            value={"입찰"}
        />
        <BidInfo
            label="Status"
            value={rfqListData.cd_v_meaning_status}
        />
        <BidInfo
            label="Type"
            value={rfqListData.cd_v_meaning_type}
        />
        <BidInfo
            label='건명'
            value={rfqListData.rfq_description}
        /> 
        <BidInfo
            label='담당자'
            value={rfqListData.buyer_name +" / "+rfqListData.buyer_dept_name +" / "+rfqListData.buyer_contact}
        />
        <BidInfo
            label="정산주기"
            value={rfqListData.po_payment_cycle}
        />
        <BidInfo
            label="협업 유형"
            value={rfqListData.po_collabo_type}
        />
        <BidInfo
            label="계약 기간(BPA)"
            value={rfqListData.start_date}
        />
        {/* <BidInfo
            label="계약 기간(BPA)"
            value={rfqCondition.END_DATE}
        /> */}
        <BidInfo
            label="Amount Limit"
            value={rfqListData.amount_limit}
        />
        <BidInfo
            label="납품 지역"
            value={rfqListData.rfq_ship_to}
        />
        <BidInfo
            label="지불 조건"
            value={rfqListData.rfq_payment_terms}
        />
        <BidInfo
            label="인도 조건"
            value={rfqListData.bidding_fob}
        />
        </InputContainer>
      </section>
     
        <SubTitle>공급사 선정</SubTitle>
        {/* <RFQAgGridInsertBid listData={rfqListData}/> */}

        <SubTitle>입찰 룰 (승인상태 : 미승인)</SubTitle>

        <ButtonWrapper>
          <SubTitle>RFQ 첨부 (공급사 배포)</SubTitle>
          <Button
                  disabled={fileUplaod.title === "" || fileUplaod.file === "" || fileUplaod.details === ""}
                  onClick={onUpload}>Upload</Button>
        </ButtonWrapper>
        <section>
            <UploadContainer>
              <Label htmlFor="check">선택</Label>
              <Label htmlFor="type">유형</Label>
              <Label htmlFor="file">첨부</Label>
              <Label htmlFor="title">첨부 파일명</Label>
              <Label htmlFor="size">Size</Label>
              <Label htmlFor="createDate">등록일</Label>
              
              <p>체크박스 표시</p>
              <p>유형 선택</p>
              <InputFile type="file" name="file" id="file"
                  placeholder="Select a file for upload"
                  onChange={handleInputChange}
                  valid={true}/>
              <InputFile type="text" name="title" id="title"
                  placeholder="변경할 파일 이름을 입력하세요"
                  onChange={handleInputChange}
                  valid={true}/>
              <p>사이즈 자동으로 등록</p>
              <p>등록일 자동으로 등록</p>
          </UploadContainer>  
     


      </section>
    </StyledRoot>
  );
}
export default InsertBid;


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

const UploadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 1fr 1.5fr 0.5fr 0.5fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 0rem 0.5rem;
  gap: 1rem;
`;

const StyledBidInfo = styled(BidInfo)`
  grid-column: 2 / span 2;
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