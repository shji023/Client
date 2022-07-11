import { Input, Button, Modal } from "antd";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import ModalSearch from "components/common/ModalSearch";
import Draggable from "react-draggable";
import FatFingerDataGrid from "./FatFingerDataGrid";
import BidInfo from "components/bid/BidInfo";
import { colors } from "assets/styles/color";

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
function FatFingerModal({
  title,
  labelTitle,
  idx,

  searchedWord,
  setSearchedWord,

  onHandleOk,
  onHandleCancel,
  onHandleSearch,

  visible,
  setVisible,
  inputRef,

  continueButtonEvent,
  itemInfoTableData,
  itemGridRef,
  itemGridRowData,
  onItemRowClicked,
  poGridRef,
  poGridRowData,

}) {

  // #region 그리드(좌측)
  const ItemGridColFields = [
    { field: "item", headerName: "아이템", minWidth: 100 },
  ];

  const itemGridOptions = {
    columnDefs: ItemGridColFields,
    rowSelection: "single",
    suppressRowClickSelection: false,
  }
  // #endregion 그리드(좌측)

  // #region 그리드(우측)
  const PoGridColFields = [
    { field: "po_num",        headerName: "계약번호", minWidth: 150 },
    { field: "comments",      headerName: "계약명",   minWidth: 150 },
    { field: "unit_price",    headerName: "단가",     minWidth: 150 },
    { field: "currency_code", headerName: "통화",     minWidth: 150 },
    { field: "contract_date", headerName: "계약일",   minWidth: 150 },
    { field: "vendor_name",   headerName: "공급사",   minWidth: 150 },
  ];

  const poGridOptions = {
    columnDefs: PoGridColFields,
    rowSelection: "single",
    suppressRowClickSelection: false,
  }
  // #endregion 그리드(우측)

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
  };
  // #endregion 마우스 드래그

  !title && (title = "선택");

  !onHandleSearch && (onHandleSearch = (value) => {});

  !onHandleOk &&
    (onHandleOk = () => {
      return "검색단어";
    });

  !onHandleCancel && (onHandleCancel = () => {});

  // 검색어
  const [searchWord, setSearchWord] = useState("");

  // modal
  const [confirmLoading, setConfirmLoading] = useState(false);
  const gridRef = useRef();
  const [gridRowData, setGridRowData] = useState([]);

  // const [modalText, setModalText] = useState('Content of the modal');

  // 팝업 OK 버튼 이벤트
  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');

    // setConfirmLoading(true);
    // const rows = gridRef.current.api.getSelectedNodes();
    const selectedRows = gridRef.current.api.getSelectedRows();

    if (setSearchedWord) {
      onHandleOk && setSearchedWord(onHandleOk({ selectedRows, idx }));
    } else {
      onHandleOk && onHandleOk({ selectedRows });
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
    onHandleCancel && onHandleCancel({ idx });
    if (setSearchedWord) setSearchedWord("");

    setVisible(false);

    initPopUp();
  };

  const initPopUp = () => {
    setSearchWord("");
  };

  // #region 마우스 드래그
  const Title = (props) => {
    return (
      <div
        style={{
          width: "100%",
          cursor: "move",
        }}
        onMouseOver={() => {
          if (disabled) {
            setDisabled(false);
          }
        }}
        onMouseOut={() => {
          setDisabled(true);
        }}
        onFocus={() => {}}
        onBlur={() => {}}
      >
        {"FatFinger Checker"}
      </div>
    );
  };
  // #endregion 마우스 드래그

  return (
    <Modal
      width={"900px"}
      title={<Title title={title} />}
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      // footer={null}
      okButtonProps={{ style: { display: 'none' } }}
      // #region 마우스 드래그
      modalRender={(modal) => (
        <Draggable
          nodeRef={draggleRef}
          disabled={disabled}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
          onStop={() => {
            onStop();
          }}
        >
          <div
            ref={draggleRef}
          >
            {modal}
          </div>
        </Draggable>
      )}
      // #endregion 마우스 드래그
    >
      <ModalHeader>
        <section>
          <Button onClick={continueButtonEvent}>반영</Button>
        </section>
        <section>
          <RfqInfoContainer>
            <BidInfo label="품명"        value = {itemInfoTableData.item}/>
            <BidInfo label="사양"        value = {itemInfoTableData.description}/>
            <BidInfo label="카테고리"    value = {itemInfoTableData.category}/>
            <BidInfo label="단위"        value = {itemInfoTableData.uom}/>
            <BidInfo label="평균단가"    value = {itemInfoTableData.avg_unit_price}/>
            <BidInfo label="오차범위(%)" value = {itemInfoTableData.error_range}/>
          </RfqInfoContainer>
        </section>
      </ModalHeader>

      <GridWrapper>
        <FatFingerDataGrid 
          width        = {"20%"} 
          height       = {"80%"} 
          gridRef      = {itemGridRef} 
          gridRowData  = {itemGridRowData} 
          gridOptions  = {itemGridOptions} 
          onRowClicked = {onItemRowClicked}
        />
        <FatFingerDataGrid 
          width       = {"80%"} 
          height      = {"80%"} 
          gridRef     = {poGridRef} 
          gridRowData = {poGridRowData} 
          gridOptions = {poGridOptions} 
        />
      </GridWrapper>
    </Modal>
  );
}

export default FatFingerModal;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const RfqInfoContainer = styled.div`
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
  & > div:nth-child(n + 11):nth-child(-n + 14) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;