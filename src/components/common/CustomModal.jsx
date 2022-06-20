import { Input, Button, Modal } from "antd";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import ModalSearch from "components/common/ModalSearch";
import DataGridModal from "components/common/DataGridModal";
import Draggable from "react-draggable";

/**
 * 
 * @param {*} title 
 * @param {*} labelTitle 
 * @param {*} onHandleOk 
 * @param {*} onHandleCancel 
 * @param {*} onHandleSearch 
 * @param {*} gridOptions 
 * @returns 
 */
function CustomModal({
  title,
  labelTitle,
  idx,

  searchedWord,
  setSearchedWord,

  onHandleOk,
  onHandleCancel,
  onHandleSearch,

  gridOptions,

  visible,
  setVisible
}) {

  // #region 마우스 드래그
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef();
  const [Opacity, setOpacity] = useState(false);

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });

    setOpacity(true);
  };

  const onStop = () => {
    setOpacity(false);
  }
  // #endregion 마우스 드래그

  !title && (title = "선택");
  !labelTitle && (labelTitle = "검색어");

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
  const [searchWord, setSearchWord] = useState("");

  // modal
  const [confirmLoading, setConfirmLoading] = useState(false);
  const gridRef = useRef();
  const [gridRowData, setGridRowData] = useState([]);


  // const [modalText, setModalText] = useState('Content of the modal');

  // 팝업 검색 버튼 이벤트
  const handleSearch = async () => {
    console.log('Clicked search button');

    const resultList = await onHandleSearch(searchWord);
    console.log("resultList  : :::::", resultList);
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

    if (setSearchedWord) {
      onHandleOk && setSearchedWord(onHandleOk({ selectedRows, idx }));
    } else {
      onHandleOk && (onHandleOk({ selectedRows }));
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

    onHandleCancel && onHandleCancel({ idx });
    if (setSearchedWord) setSearchedWord("");

    setVisible(false);

    initPopUp();
  };

  const initPopUp = () => {
    setSearchWord("");
  }

  // #region 마우스 드래그
  const Title = (props) => {
    return <div
      style={{
        width: '100%',
        cursor: 'move',
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
      onFocus={() => { }}
      onBlur={() => { }}
    >
      {props.title}
    </div>
  }
  // #endregion 마우스 드래그

  return (
    <Modal
      // title={title}
      title={<Title title={title} />}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      // #region 마우스 드래그
      modalRender={(modal) => (
        <Draggable
          nodeRef={draggleRef}
          disabled={disabled}
          bounds={bounds}
          // onDrag={(e, data) => trackPos(data)}
          onStart={(event, uiData) => onStart(event, uiData)}
          onStop={() => {onStop()}}
        >
          <div 
          ref={draggleRef}
          style={{ opacity: Opacity ? "0.6" : "1" }}
          >
            {modal}
          </div>
        </Draggable>
      )}
    // #endregion 마우스 드래그
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
          gridRowData={gridRowData}
          gridOptions={gridOptions}
        />
      </section>
    </Modal>
  )
}

export default CustomModal;


const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

