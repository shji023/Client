import { getPoApproveLov, getPoLov, getSasoLov, getSearchPoList } from "apis/po.api";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import styled from "styled-components";

function SelectPoList() {
  const columns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
  ];

  const initialRows = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];

  const [rows, setRows] = useState(initialRows);
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

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...poCondition };
    tempPoCondition[key] = value;
    setPoCondition(tempPoCondition);
  };

  const selectPoList = async () => {
    console.log(poCondition);
    const poListData = await getSearchPoList(poCondition);
    console.log(poListData);
  };

  const getLov = async () => {
    const poCategory = await getPoLov();
    const poApprove = await getPoApproveLov();
    const saso = await getSasoLov();
    const poType = await getPoApproveLov();

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
      <section>
        <div>
          <button onClick={selectPoList}>조회</button>
        </div>
        <InputContainer>
          <InputWrapper>
            <InputInfo
                id="RFQ_DESCRIPTION"
                inputLabel="계약명"
                handlePoCondition={handlePoCondition}
                inputValue={poCondition.RFQ_DESCRIPTION}
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
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          <InputWrapper>
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
          </InputWrapper>
          
        </InputContainer>
      </section>
      <section>
        <DataGrid columns={columns} rows={rows} onRowsChange={setRows} />
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
  display: flex;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
`;
