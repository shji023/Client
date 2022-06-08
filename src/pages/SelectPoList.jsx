import { getPoApproveLov, getPoLov, getSasoLov, getSearchPoList, getPoTypeLov } from "apis/po.api";
import { colors } from "assets/styles/color";
import PoListAgGrid from "components/po/PoListAgGrid";
import InputInfo from "components/po/PoInputInfo";
import InputSearch from "components/po/PoInputSearch";
import InputSelect from "components/po/PoInputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
function SelectPoList() {
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
  });
  const [poCategoryLov, setPoCategoryLov] = useState([]);
  const [poApproveLov, setPoApproveLov] = useState([]);
  const [sasoLov, setSasoLov] = useState([]);
  const [poTypeLov, setPoTypeLov] = useState([]);
  const [poListData, setPoListData] = useState([]);

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...poCondition };

    tempPoCondition[key] = value;
    setPoCondition(tempPoCondition);
  };

  const selectPoList = async () => {
    const data = await getSearchPoList(poCondition);
    
    setPoListData(data);
  };

  const getLov = async () => {
    const poCategory = await getPoLov();
    const poApprove = await getPoApproveLov();
    const saso = await getSasoLov();
    const poType = await getPoTypeLov();

    poCategory && setPoCategoryLov(poCategory);
    poApprove && setPoApproveLov(poApprove);
    saso && setSasoLov(saso);
    poType && setPoTypeLov(poType);
  };

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <Title>PO 목록조회</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={selectPoList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="RFQ_DESCRIPTION"
            inputLabel="계약명"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.RFQ_DESCRIPTION}
            mySize={200}
          />
          <InputSearch
            id="VENDOR_ID"
            inputLabel="공급사"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.VENDOR_ID}
          />
          <InputSelect
            id="ATTRIBUTE_CATEGORY"
            inputLabel="계약구분"
            handlePoCondition={handlePoCondition}
            lov={poCategoryLov}
          />
          <InputSelect
            id="AUTHORIZATION_STATUS"
            inputLabel="PO 승인"
            handlePoCondition={handlePoCondition}
            lov={poApproveLov}
          />
          <InputInfo
            id="PO_NUM"
            inputLabel="PO 번호"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.PO_NUM}
            mySize={200}
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
            mySize={200}
          />
          <InputInfo
            id="RFQ_NO"
            inputLabel="RFQ번호"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.RFQ_NO}
            mySize={200}
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
        <PoListAgGrid poListData={poListData} />
      </section>
    </StyledRoot>
  );
}

export default SelectPoList;

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
