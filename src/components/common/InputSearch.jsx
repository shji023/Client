import { Input, Button, Modal } from "antd";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CustomModal from "components/common/CustomModal";
import { colors } from "assets/styles/color";

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
  !onHandleSearch &&
    (onHandleSearch = (value) => {
      console.log("value : ", value);
    });

  !onHandleOk &&
    (onHandleOk = () => {
      console.log("called onHandleOk");

      return "검색단어";
    });

  !onHandleCancel &&
    (onHandleCancel = () => {
      console.log("called onHandleCancel");
    });
  // 검색어
  const [searchedWord, setSearchedWord] = useState(initValue);

  // modal
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();

  const showModal = () => {
    setVisible(true);
    // focus
    try{
      // * display visible 되는 시간이 있어서 시간차를 줌
      setTimeout(()=> {inputRef.current.focus()}
      , 200);
    } catch(e) {
      console.log(e);
    }
    
  };

  const InputLabel = (props) => {
    if (props.inputLabel) {
      return (
        <TitleWrapper>
          <Title htmlFor={props.id}>{props.inputLabel}</Title>
        </TitleWrapper>
      );
    }
  };

  return (
    <>
      <CustomModal
        title={title}
        idx={idx}
        labelTitle={labelTitle}
        searchedWord={searchedWord}
        setSearchedWord={setSearchedWord}
        onHandleOk={onHandleOk}
        onHandleCancel={onHandleCancel}
        onHandleSearch={onHandleSearch}
        gridOptions={gridOptions}
        visible={visible}
        setVisible={setVisible}
        inputRef={inputRef}
      />

      {/* 화면에 보여지는 코드 */}
      <StyledRoot>
        <InputLabel id={id} inputLabel={inputLabel} />
        <DataWrapper>
          <Input.Search
            type="text"
            id={id}
            // value={searchedWord}
            value={initValue}
            onSearch={showModal} // modal
            style={{ width: "100%" }}
            allowClear={false}
            readOnly
          />
        </DataWrapper>
      </StyledRoot>
    </>
  );
}

export default InputSearch;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TitleWrapper = styled.div`
  font-size: 1.4rem;
  min-width: 14rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.tableGray};
  border: 1px solid ${colors.tableLineGray};
  border-right: none;
  border-bottom: none;
`;

const DataWrapper = styled.div`
  font-size: 1.4rem;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${colors.tableLineGray};
  border-right: none;
  border-bottom: none;
`;
const Title = styled.p`
  font-size: 1.4rem;
  text-align: center;
  font-family: "Pretendard-SemiBold";
`;
