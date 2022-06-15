import { Input, Button, Modal } from "antd";
import React, { useState, useRef, useEffect }  from "react";
import styled from "styled-components";
import ModalSearch from "components/common/ModalSearch";
import DataGridModal from "components/common/DataGridModal";

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

  !title && (title = "선택");
  labelTitle = "검색어";
  
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

  const [gridRowData, setGridRowData] = useState([]);

  // 검색어
  const [searchWord, setSearchWord] = useState("");
  console.log("initValue", initValue);
  
  const [searchedWord, setSearchedWord] = useState("");
 
  // modal
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const gridRef = useRef();

  const showModal = () => {
    setVisible(true);
  };

  // 팝업 검색 버튼 이벤트
  const handleSearch = async () => {
    console.log('Clicked search button');

    const resultList = await onHandleSearch(searchWord);
    console.log("resultList", resultList);
    setGridRowData([...resultList]);

  }

  // 팝업 OK 버튼 이벤트
  const handleOk = () => {
    console.log('Clicked ok button');
    // setModalText('The modal will be closed after two seconds');

    // setConfirmLoading(true);
    // const rows = gridRef.current.api.getSelectedNodes();
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log("selectedRows", selectedRows);

    if(onHandleOk) {
      initValue = onHandleOk({selectedRows, idx});
    }

    // ! 비동기
    // setTimeout(() => {
      setVisible(false);
    //   setConfirmLoading(false);
    // }, 1000);

    initPopUp();
  };

  // 팝업 취소 버튼 이벤트
  const handleCancel = () => {
    console.log('Clicked cancel button');

    onHandleCancel && onHandleCancel();

    setVisible(false);
    
    initPopUp();
  };

  const initPopUp = () => {
    setSearchWord("");
  }

  const InputLabel = (props) => {
    if(props.inputLabel) {
      return <Label htmlFor={props.id}>{props.inputLabel}</Label>

    }
  }

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        
        {/* modal 창 안의 내용> */}
        {/* <p>{modalText}</p> */}
        <ModalHeader>
          <ModalSearch
            inputLabel={labelTitle}
            id="id"
            inputValue={searchWord}
            setInputValue={setSearchWord}
          />
          <Button onClick={handleSearch}>검색</Button>
        </ModalHeader>

        <section>
          <DataGridModal 
            gridRef={gridRef}
            gridRowData = {gridRowData}
            gridOptions={gridOptions}
          />
        </section>
      </Modal>

      {/* 화면에 보여지는 코드 */}
      <StyledRoot>
        <InputLabel id={id} inputLabel={inputLabel} />
        <Input.Search
          type="text"
          id={id}
          value={initValue}
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
