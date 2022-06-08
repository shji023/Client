import { getPoApproveLov, getPoLov, getSasoLov, getSearchPoList } from "apis/po.api";
import { colors } from "assets/styles/color";
import DataGridDemo from "components/common/DataGridDemo";
import InputInfo from "components/po/PoInputInfo";
import InputSearch from "components/po/PoInputSearch";
import InputSelect from "components/po/PoInputSelect";
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
function PoRegist() {
  const [poCondition, setPoCondition] = useState({
    RFQ_DESCRIPTION: "",
    VENDOR_ID: "",
    ATTRIBUTE_CATEGORY: "",
    AUTHORIZATION_STATUS: "",
    PO_NUM: "",
    ITEM_ID: "",
    PO_HEADER_ID: "",
    RFQ_NO: "",
    ORGANIZATION_CODE: "",
    REQUEST_PERSON_ID: "",
    BUYER_ID: "",
    TYPE_LOOKUP_CODE: "",
    VENDOR_SITE:"",
    BUYER_NAME_SEARCH:"",
  });

  const [poCategoryLov, setPoCategoryLov] = useState([]);
  const [poApproveLov, setPoApproveLov] = useState([]);
  const [sasoLov, setSasoLov] = useState([]);
  const [poTypeLov, setPoTypeLov] = useState([]);
  const [poListData, setPoListData] = useState([]);
  const [poFobLov, setPoFobLov] = useState([]);
  


  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...poCondition };

    tempPoCondition[key] = value;
    setPoCondition(tempPoCondition);
  };

  const PoRegist = async () => {
    const data = await getSearchPoList(poCondition);

    setPoListData(data);
  };

  const getLov = async () => {
    const poCategory = await getPoLov();
    const poApprove = await getPoApproveLov();
    const saso = await getSasoLov();
    const poType = await getPoApproveLov();
    const poFob = await getPoFobLov();

    poCategory && setPoCategoryLov(poCategory);
    poFobLov && setPoFobLov(poFob);
    poApprove && setPoApproveLov(poApprove);
    saso && setSasoLov(saso);
    poType && setPoTypeLov(poType);
  };

  useEffect(() => {
    getLov();
  }, []);

  return (

    
    <StyledRoot>
      <Title>PO 등록</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={PoRegist}>저장</Button>
        </ButtonWrapper>
        <InputContainer>
          <Test>
            <InputInfo
              id="PO_NUM"
              inputLabel="PO 번호"
              handlePoCondition={handlePoCondition}
              inputValue={poCondition.PO_NUM}
              mySize={200}
              isDisabled={true}
            />
            <InputInfo
              id="Rev"
              inputLabel="Rev."
              handlePoCondition={handlePoCondition}
              inputValue={poCondition.REV}
              mySize={75}
              isDisabled={true}
            />
          </Test>
          <InputInfo
            id="TYPE"
            inputLabel="Type"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.TYPE}
            mySize={200}
            isDisabled={true}
          />
          <InputSelect
            id="ATTRIBUTE_CATEGORY"
            inputLabel="계약구분"
            handlePoCondition={handlePoCondition}
            lov={poCategoryLov}

          />
          <div></div>
          <InputInfo
            id="PO_DISTRIBUTION"
            inputLabel="계약명"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.PO_DISTRIBUTION}
            mySize={350}
            isDisabled={false}
          />
          <div></div>
          <Test>
            <InputInfo
            id="VENDOR_NAME"
            inputLabel="공급사"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.VENDOR_NAME}
            mySize={300}
            isDisabled={true}
            />
            <InputSearch
            id="VENDOR_SITE"
            //inputLabel="Item"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.VENDOR_SITE}
          />
          </Test>
          <div></div>
          <Test>
            <InputSearch
            id="BUYER_NAME_SEARCH"
            //inputLabel="Item"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.BUYER_NAME_SEARCH}
          />
          <InputInfo
            id="BUYER_ID"
            //inputLabel="바이어"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.BUYER_ID}
            mySize={150}
            isDisabled={true}
            />
          </Test>
          <Test>
          <InputInfo
            id="VENDOR_NAME"
            inputLabel="PO 승인일"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.VENDOR_NAME}
            mySize={200}
            isDisabled={true}
            />
            <InputInfo
            id="VENDOR_NAME"
            //inputLabel="PO 승인일"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.VENDOR_NAME}
            mySize={200}
            isDisabled={true}
            />
          </Test>
          <InputSelect
            id="PO_FOB"
            inputLabel="인도조건"
            handlePoCondition={handlePoCondition}
            lov={poApproveLov}
          />
          <InputInfo
            id="PO_NUM"
            inputLabel="PO 번호"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.PO_NUM}
          />
          <InputSearch
            id="ITEM_ID"
            inputLabel="Item"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.ITEM_ID}
          />
          <InputInfo
            id="PO_HEADER_ID"
            inputLabel="PR 번호"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.PO_HEADER_ID}
          />
          <InputInfo
            id="RFQ_NO"
            inputLabel="RFQ번호"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.RFQ_NO}
          />
          <InputSelect
            id="ORGANIZATION_CODE"
            inputLabel="사소"
            handlePoCondition={handlePoCondition}
            lov={sasoLov}
          />
          <InputSearch
            id="REQUEST_PERSON_ID"
            inputLabel="PR 신청자"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.REQUEST_PERSON_ID}
          />
          <InputSearch
            id="BUYER_ID"
            inputLabel="Buyer"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.BUYER_ID}
          />
          <InputSelect
            id="TYPE_LOOKUP_CODE"
            inputLabel="Type"
            handlePoCondition={handlePoCondition}
            lov={poTypeLov}
          />
        </InputContainer>
      </section>
      <ListCount>건수: 2,164</ListCount>
      <section>
        {/* <DataGridDemo poListData={poListData} /> */}
      </section>

    </StyledRoot>
  );
}

export default PoRegist;

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
  :hover {
    cursor: pointer;
  }
  margin-bottom: 2rem;
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
`;

const Test = styled.div`
  display:flex;
`;
