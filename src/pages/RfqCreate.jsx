import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import InputInfo from "components/common/InputInfo";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputSearch from "components/common/InputSearch";
import AgVendorSelect from "components/common/AgVendorSelect";
import AgRfqInsert from "components/common/AgRfqInsert";
import AgProductInfo from "components/common/AgProductInfo";
import BidInfo from "components/common/BidInfo";
import { getProductInfoList } from "apis/RfqCreate.api";
function RfqCreate() {
  const [rfqCondition, setRfqCondition] = useState({
    item: "",
    description: "",
    uom: "",
    group_name: "",
    requisition_number: "",
    requisition_line_number: "",
    dept_name: "",
    name: "",
    staff_contact_number: "",
  });  
  const [productInfoData, setProductInfoData] = useState([]);

  const selectProductInfo = async () => {
    console.log("liauwjefoaijwef;oiajwe;ofij");
    const data = await getProductInfoList();
    console.log("여기가 찍히는거냐?" );
    console.log(data);
    setProductInfoData(data);
  };
  // const handleRfqCondition = (key, value) => {
  //   const tempRfqCondition = { ...rfqCondition };

  //   tempRfqCondition[key] = value;
  //   setRfqCondition(tempRfqCondition);
  // };
  // const getLov = async () => {
  //   const poCategory = await getPoLov();
  //   const poApprove = await getPoApproveLov();
  //   const saso = await getSasoLov();
  //   const poType = await getPoApproveLov();

  //   poCategory && setPoCategoryLov(poCategory);
  //   poApprove && setPoApproveLov(poApprove);
  //   saso && setSasoLov(saso);
  //   poType && setPoTypeLov(poType);
  // };
  useEffect(() => {
    // getLov();
    selectProductInfo();
  }, []);

    return (
    <StyledRoot>
        <Title>RFQ 생성</Title>

        <section>
          <SmallTitle>🌐 RFQ 정보</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
            <Button onClick={() => {
              let save = confirm("최종 저장 하시겠습니까?");
              if(save == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>저장</Button>
          </ButtonWrapper>
          
          <InputContainer>
          <BidInfo
            label= "RFQ 번호"
            value= "123"
          />

        </InputContainer>
        </section>

        <section>
          <SmallTitle>🌐 공급사선정</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
                let del = confirm("삭제 하시겠습니까?");
                if(del == true)
                  alert("확인 누름") 
                else
                  alert("취소 누름")
            }}>공급사선정</Button>
          </ButtonWrapper>
          <AgVendorSelect ></AgVendorSelect>
        </section>

        <section>
          <SmallTitle>🌐 RFQ첨부(공급사배포)</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
          </ButtonWrapper>
          <AgRfqInsert></AgRfqInsert>
        </section>


        <section>
          <SmallTitle>🌐 RFQ첨부(내부결제)</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
          </ButtonWrapper>
          <AgRfqInsert></AgRfqInsert>

        </section>


        <section>
          <SmallTitle>🌐 품목정보</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("행복사 하쉴?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>행 복사</Button>
            <Button onClick={() => {
              let save = confirm("행삭제 하쉴?");
              if(save == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>행 삭제</Button>
          </ButtonWrapper>
          <AgProductInfo productInfoData={productInfoData} ></AgProductInfo>
        </section>

    </StyledRoot>
    );
}

export default RfqCreate;

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
  margin-left: 1rem;
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
