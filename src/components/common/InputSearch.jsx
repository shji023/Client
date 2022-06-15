import { Input, Button, Modal } from "antd";
import React, { useState, useRef, useEffect }  from "react";
import styled from "styled-components";
import ModalSearch from "components/common/ModalSearch";
import DataGridModal from "components/common/DataGridModal";
import CustomModal from "components/common/CustomModal";

/**
 * PopUp 버튼이 추가된 Input 태그
 * @param { id }              id              Input 관련 - Id
 * @param { inputLabel }      inputLabel      Input 관련 - 라벨
 * @param { title }           title           PopUp 관련 - 팝업 제목
 * @param { labelTitle }      labelTitle      PopUp 관련 - 검색창 라벨
 * @param { onHandleSearch }  onHandleSearch  Button 이벤트 - 검색 버튼
 * @param { onHandleOk }      onHandleOk      Button 이벤트 - Ok 버튼
 * @param { onHandleCancel }  onHandleCancel  Button 이벤트 - Cancel 버튼
 * @param { gridOptions }     gridOptions     DataGrid 관련 - DataGrid 옵션
 *                                                            { columnDefs : columnDefs,
 *                                                              rowData : rowData,
 *                                                              rowSelection : "single", "multiple",
 *                                                              suppressRowClickSelection : true, false }
 * @returns 
 */
function InputSearch({ 
  // Input 관련
  id,
  idx,  
  inputLabel,
  initValue,

  // PopUp 관련
  title,
  labelTitle,
  
  // Button 이벤트
  onHandleSearch,
  onHandleOk,
  onHandleCancel,
  
  // DataGrid
  gridOptions,
}) {
  
  !onHandleSearch && (onHandleSearch = (value) => {
    console.log("value : ", value);
    
  });

  !onHandleOk && (onHandleOk = () => {
    console.log("called onHandleOk");

    return "검색단어";

  });

  !onHandleCancel && (onHandleCancel = () => {
    console.log("called onHandleCancel");

  })
  // 검색어
  console.log("initValue", initValue);
  
  const [searchedWord, setSearchedWord] = useState("");
 
  // modal
  const [visible, setVisible] = useState(false);
  
  const showModal = () => {
    setVisible(true);
};

  const InputLabel = (props) => {
    if(props.inputLabel) {
      return <Label htmlFor={props.id}>{props.inputLabel}</Label>

    }
  }

  return (
    <>
     <CustomModal
      title={title}
      idx={idx}
      labelTitle={labelTitle}
      searchedWord={searchedWord}
      setSearchedWord={setSearchedWord}
      onHandleOk ={onHandleOk}
      onHandleCancel={onHandleCancel}
      onHandleSearch={onHandleSearch}
      gridOptions={gridOptions}
      visible={visible}
      setVisible={setVisible}
     />

      {/* 화면에 보여지는 코드 */}
      <StyledRoot>
        <InputLabel id={id} inputLabel={inputLabel} />
        <Input.Search
          type="text"
          id={id}
          value={searchedWord}
          onSearch = {showModal}  // modal     
          style={{ width: 200 }}
          allowClear={false}
          readOnly
        />
      </StyledRoot>
    </>
  );
}

export default InputSearch;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.6rem;
  width: 8rem;
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
