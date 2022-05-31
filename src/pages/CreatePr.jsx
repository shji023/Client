import { getSearchPrList, getPrSatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import DataGridPrLine from "components/common/DataGridPrLine";
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
  const [poListData, setPoListData]   = useState([
    { /* id: 0, */ line_NUM: "이동현"},
    { /* id: 1, */ line_NUM: "임지연"},
    { /* id: 2, */ line_NUM: "현지영"},
    { /* id: 3, */ line_NUM: "장정우"},
    { /* id: 4, */ line_NUM: "이윤성"}
  ]);
  const [prStatusLov, setPrStatusLov] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  const handlePoCondition = (key, value) => {
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
    return { id: selectionModel.length, line_NUM: "123123"};
  };

  const handleAddRow = () => {
    setPoListData((prevRows) => {
      console.log("prevRows", prevRows);
      return [...prevRows, createRow()]
    });
  };
  
  const copyRow = () => {
    console.log("copyRow called" );
    let temp = [...poListData];

    // 선택된 row index 값
    console.log("selectionModel", selectionModel); 
  
    const arr = [];

    // TODO: 반복횟수 줄이기
    poListData.forEach((element, idx) => {
      // console.log("element", element);
      arr.push(element);

      selectionModel.forEach(id => {
        if(id === idx) {
          element = { ...poListData[idx] };
          arr.push(element);
        }
      })
      
    })
    // console.log("arr", arr);
    
    setPoListData(arr);

    const tempModel = selectionModel; // [1, 3, 4]
    tempModel.sort();
    tempModel.forEach((value, index) => {
      tempModel[index] = value + index;
      tempModel.sort();
    })
    tempModel.sort();
    console.log("tempModel", tempModel);
    setSelectionModel([...tempModel]);
    
  }
  
  const deleteRow = () => {
    console.log("deleteRow called" );
    let temp = [...poListData];
    selectionModel.reverse().forEach(element => {
      const row = temp.splice(element, 1);
      console.log("deleted row", row);
    });
    
    setPoListData(temp);
    // getDataGridCheckedId([]);
    setSelectionModel([]);
  }

  const getDataGridCheckedId = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
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
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.REQUISITION_NUMBER}
          />
          <InputInfo
            id="PREPARER_ID"
            inputLabel="Preparer"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.DESCRIPTION}
          />
          <InputSearch
            id="PREPARER_ID"
            inputLabel="PR 승인일"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.PREPARER_ID}
          />
          <InputInfo
            id="DESCRIPTION"
            inputLabel="PR 명"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_ID}
          />
          <InputInfo
            id="ITEM_DESCRIPTION"
            inputLabel="금액"
            handlePoCondition={handlePoCondition}
            inputValue={prCondition.ITEM_DESCRIPTION}
          />
          <InputSelect
            id="LINE_STATUS"
            inputLabel="수의사유"
            handlePoCondition={handlePoCondition}
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
        {/* // TODO: 변수명 바꾸기 poListData -> ??(팀원상의하기) */}
        <DataGridPrLine 
          poListData={poListData} 
          onSelectionModelChange={getDataGridCheckedId}
          selectionModel={selectionModel}
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
