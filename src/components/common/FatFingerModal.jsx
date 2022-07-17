import { Input, Button, Modal } from "antd";
import React, { useState, useRef } from "react";
import styled from "styled-components";
import Draggable from "react-draggable";
import FatFingerDataGrid from "./FatFingerDataGrid";
import { colors } from "assets/styles/color";
import InputCell from "components/bid/InputCell";
import { getFormattedDate, getNumberFormat } from "hooks/CommonFunction";


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
    { field: "po_num",        headerName: "계약번호", minWidth: 120 },
    { field: "comments",      headerName: "계약명",   minWidth: 240 },
    { field: "unit_price",    headerName: "단가",     minWidth: 150, valueGetter: (params) => getNumberFormat(params.data.unit_price) },
    { field: "currency_code", headerName: "통화",     minWidth: 80 },
    { field: "contract_date", headerName: "계약일",   minWidth: 150, valueGetter: (params) => getFormattedDate(params.data.contract_date) },
    // { field: "vendor_name",   headerName: "공급사",   minWidth: 200 },
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
        {"적정가 오차 감지"}
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
      footer={null}
      // okButtonProps={{ style: { display: 'none' } }}
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
        <TitleWrapper>
          <Label>계속 진행하시겠습니까?</Label>
          <ButtonWrapper>
            <Button style={{marginRight:"1rem"}} onClick={handleCancel}>닫기</Button>
            <Button type="primary" onClick={continueButtonEvent} danger>진행</Button>
          </ButtonWrapper>
        </TitleWrapper>
        <section>
          <RfqInfoContainer>
            <InputCell label="품명"            value = {itemInfoTableData.item}/>
            <InputCell label="단위"            value = {itemInfoTableData.uom}/>
            <InputCell label="입력단가"        value = {getNumberFormat(itemInfoTableData.unit_price)} />
            <InputCell label="사양"            value = {itemInfoTableData.description} spanCnt = {2}  />
            <InputCell label="평균단가"        value = {getNumberFormat(Math.floor(itemInfoTableData.avg_unit_price))} />
            <InputCell label="카테고리"        value = {itemInfoTableData.category} spanCnt = {2}  />
            <InputCell label="설정오차범위(%)" value = {itemInfoTableData.error_range * 100}    />
          </RfqInfoContainer>
        </section>
      </ModalHeader>

      <GridWrapper>
        <FatFingerDataGrid 
          id           = {"fatFingerItemGrid"}
          width        = {"20%"} 
          height       = {"80%"} 
          gridRef      = {itemGridRef} 
          gridRowData  = {itemGridRowData} 
          gridOptions  = {itemGridOptions} 
          onRowClicked = {onItemRowClicked}
        />
        <FatFingerDataGrid 
          id           = {"fatFingerPoGrid"}
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
  flex-direction: column;
  // justify-content: space-between;
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
  & > div:nth-of-type(3) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(5) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(7) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 6):nth-child(-n + 7) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;


const Label = styled.label`
  font-size: 1.6rem;
  text-align: center;
`;


const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
