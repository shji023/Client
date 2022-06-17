import { getPoApproveLov, getPoLov, getSasoLov, getSearchPoList, getPoTypeLov } from "apis/po.api";
import { colors } from "assets/styles/color";
import PoListAgGrid from "components/po/PoListAgGrid";
import InputInfo from "components/po/PoInputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/po/PoInputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getBuyerList, getItemList, getVendorList } from "apis/public.api";
import { ItemInfoColFields, popUpBuyerColFields, popUpItemColFields, popUpVendorColFields } from "stores/colData";

function SelectPoList() {
  const [poCondition, setPoCondition] = useState({
    COMMENTS: "",
    VENDOR_ID: "",
    ATTRIBUTE_CATEGORY: "",
    AUTHORIZATION_STATUS: "",
    PO_NUM: "",
    ITEM_ID: "",
    RFQ_NO: "",
    ORGANIZATION_CODE: "",
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

  // #region 팝업
  const [popUpPreparerRowData, setPopUpPreparerRowData] = useState([]);

  const onHandleSearchVendor= async (value)=>{

    console.log("value : ", value);

    const sendData = {"vendor_name" : value};
    const resultList = await getVendorList(sendData);

    console.log("resultList", resultList);

    return resultList;
    
  }

  const onHandleOkVendor = ({selectedRows, idx}) => {
    const row = selectedRows[0];
    const temp = poCondition;
    console.log(row);

    temp.VENDOR_ID = row.vendor_id;
    setPoCondition(temp);
    
    return temp.VENDOR_ID;
  }


  const onHandleSearchItem = async (searchWord) => {
    const resultList = await getItemList(searchWord);
    return resultList;
  }

  const onHandleOkItem = ({selectedRows}) => {
    const row = selectedRows[0];

    const temp = poCondition;
    console.log(row);
    temp.ITEM_ID = row.item;
    setPoCondition(temp);
    
    return temp.ITEM_ID;
  }

  const onHandleSearchBuyer = async (value) => {
    
    const resultList = await getBuyerList(value);
    return resultList;
  }

  const onHandleOkBuyer = ({selectedRows}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = poCondition;
    temp.BUYER_ID = row.buyer_name;
    setPoCondition(temp);
    
    return temp.BUYER_ID;

  }
  // #endregion 팝업

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <section>
        <ButtonWrapper>
          <Title>PO 목록조회</Title>
          <Button onClick={selectPoList}>조회</Button>
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="COMMENTS"
            inputLabel="계약명"
            handlePoCondition={handlePoCondition}
            inputValue={poCondition.COMMENTS}
            mySize={200}
          />
          <InputSearch
            id="VENDOR_ID"
            title="공급사 선택"
            inputLabel="공급사"
            initValue={poCondition.VENDOR_ID}
            onHandleSearch={onHandleSearchVendor}
            onHandleOk={onHandleOkVendor}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpVendorColFields,
              rowData : popUpPreparerRowData,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
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
            inputValue={poCondition.SEGMENT}
            mySize={200}
          />
          <InputSearch
            id="ITEM_ID"
            title="물품선택"
            inputLabel="Item"
            initValue={poCondition.ITEM_ID}
            onHandleSearch={onHandleSearchItem}
            onHandleOk={onHandleOkItem}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpItemColFields,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
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
            id="BUYER_ID"
            title="바이어선택"
            inputLabel="Buyer"
            initValue={poCondition.BUYER_ID}
            onHandleSearch={onHandleSearchBuyer}
            onHandleOk={onHandleOkBuyer}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpBuyerColFields,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputSelect
            id="TYPE_LOOKUP_CODE"
            inputLabel="Type"
            handlePoCondition={handlePoCondition}
            lov={poTypeLov}
          />
        </InputContainer>
      </section>
      {/* <ListCount>건수: 2,164</ListCount> */}
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

// const InputContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   border: 1px solid rgb(225 225 225 / 87%);
//   border-radius: 0.5rem;
//   padding: 2rem 0.5rem;
//   gap: 1rem;
// `;


const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(27rem, 1fr));
  padding: 2rem 0rem;
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
  & > div:nth-child(n+11):nth-child(-n+14){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
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
  justify-content: space-between;
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
