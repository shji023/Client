import { getSearchPrList, getPrSatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/common/PrGrid";
// import DataGridPrLine from "components/common/DataGridPrLine";
import { prCreateColFields } from "stores/colData"
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function selectPrList() {

  // 조회 데이터
  const [prCondition, setPrCondition] = useState({
    REQUISITION_NUMBER : "",
  });
  
  // * DataGrid Row 데이터
  // TODO: 변수명 Po -> Pr 로 변경하기
  const [listData, setListData]   = useState([
    // requisition_number : pr 번호
    // preparer_name : Preparer
    // description : PR 명
    // date : PR 승인일
    // status : 수의사유
    //  : 금액
    // currencyCode : 단위
    
  ]);
  
  const [prData, setPrData] = useState({
    header: {
      req_num:  "", preparer_name: "이동현", auth_date: "", description: "", amount: 0, currency_code: "KRW", status: ""
    },
    lines: [
      {
        line: 1, 
        item: "Q2065363", 
        category: "Q.Burnt Chaff_B", 
        spec: "Thermal Insulation 1400...", 
        unit: "kilogram", 
        cnt: 100000, 
        amount: 0,
        total_amount: 0,
        tax_code: "P매입세공제",
        buyer: "김서정",
        note_to_buyer: "note_to_buyer",
        requester: "조학식",
        need_to_date: "2022-06-30",
        destination_type: "EXPENSE",
        organization: "POSCO 포항자재/외주...",
        location: "PEA000Q",
        warehouse: "QEJ01",
        dist_num: "1",
        charge_account: "01-PEO31-602021-00001",
      }
    ]
  })

  const [prStatusLov, setPrStatusLov] = useState([]);

  const handlePrCondition = (key, value) => {
    const tempPoCondition = { ...prCondition };
    tempPoCondition[key] = value;
    setPrCondition(tempPoCondition);
  };

  const savePr = async () => {
    console.log("savePr called");

    // !: axios 비동기
    // const data = await getSearchPrList(prCondition);
    // console.log("savePr Data", data);
    // setPoListData(data);
  };

  const removePr = () => {
    console.log("removePr called");

  }

  const getLov = async () => {
    const statusLov = await getPrSatusLov();
    statusLov && setPrStatusLov(statusLov);
  };

  const createRow = () => {
    console.log("createRow called" );

  };

  const handleAddRow = () => {
   
  };
  
  const copyRow = () => {
    console.log("copyRow called" );
    
  }
  
  const deleteRow = () => {
    console.log("deleteRow called" );
   
  }

  useEffect(() => {
    getLov();
  }, []);

  return (
    <StyledRoot>
      <Title>구매신청</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={savePr}>저장</Button>
          {/* <Button onClick={removePr}>삭제</Button> */}
        </ButtonWrapper>
        <InputContainer>
          <InputInfo
            id="REQUISITION_NUMBER"
            inputLabel="PR 번호"
            handlePoCondition={handlePrCondition}
            inputValue={prData.header.req_num}
          />
          <InputInfo
            id="PREPARER_ID"
            inputLabel="Preparer"
            handlePoCondition={handlePrCondition}
            inputValue={prData.header.preparer_name}
          />
          <InputSearch
            id="PREPARER_ID"
            inputLabel="PR 승인일"
            handlePoCondition={handlePrCondition}
            inputValue={prData.header.auth_date}
          />
          <InputInfo
            id="DESCRIPTION"
            inputLabel="PR 명"
            handlePoCondition={handlePrCondition}
            inputValue={prData.header.description}
          />
          <InputInfo
            id="ITEM_DESCRIPTION"
            inputLabel="금액"
            handlePoCondition={handlePrCondition}
            inputValue={prData.header.amount}
          />
          <InputSelect
            id="LINE_STATUS"
            inputLabel="수의사유"
            handlePoCondition={handlePrCondition}
            lov={prStatusLov}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapper>
          <Button onClick={handleAddRow}>Line 추가</Button>
          <Button onClick={copyRow}>행 복사</Button>
          <Button onClick={deleteRow}>행 삭제</Button>
        </ButtonWrapper>
      </section>
      <section>
        <AgGrid 
          resvRowData    = { prData.lines }
          resvColumnDefs = { prCreateColFields }
        />
      </section>
    </StyledRoot>
  );
}

export default selectPrList;

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
