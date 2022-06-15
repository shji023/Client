import { Input, Button, Modal } from "antd";
import React, { useState, useRef }  from "react";
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
  inputLabel,
  
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
  console.log("1", gridOptions);  
  const [searchedWord, setSearchedWord] = useState("");

  const handleInputChange = (id, value) => {
    setSearchedWord(value);
  }
  
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
};

  return (
    <>
     <CustomModal
      title={title}
      labelTitle={labelTitle}
      onHandleOk ={onHandleOk}
      onHandleCancel={onHandleCancel}
      onHandleSearch={onHandleSearch}
      gridOptions={gridOptions}
      visible={visible}
      setVisible={setVisible}
     />

      {/* 화면에 보여지는 코드 */}
      <StyledRoot>
        <Label htmlFor={id}>{inputLabel}</Label>
        <Input.Search
          allowClear
          type="text"
          id={id}
          value={searchedWord}
          onChange={(e) => handleInputChange(e.target.value)}
          onSearch = {showModal}  // modal     
          style={{ width: 200 }}
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
