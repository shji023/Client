import { colors } from "assets/styles/color";
import InputInfo from "components/common/InputInfo";
import InputSelect from "components/common/InputSelect";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AgVendorSelect from "components/common/AgVendorSelect";
import AgProductInfo from "components/common/AgProductInfo";
import {
  getProductInfoList,
  getBuyerInfo,
  insertRfqInfo,
  insertVendorInfo,
  deleteRfqInfo,
  selectRfq,
  updateRfqInfo,
} from "apis/RfqCreate.api";
import {
  getCycleLov,
  getCollaboLov,
  getPaymentLov,
  getFobLov,
  getshipToLov,
} from "apis/RfqCreate.api";
import CustomModal from "components/common/CustomModal";
import { popUpVendorColFields } from "stores/colData";
import { getVendorList } from "apis/public.api";
import InputOneDate from "components/common/InputOneDate";
import InputOneDateGrid from "components/common/InputOneDateGrid";
import InputInfoGrid from "components/common/InputInfoGrid";
import { useNavigate, useParams } from "react-router-dom";
import { Button, DeleteButton } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import pageData from "stores/PageData";
import { reload } from "hooks/CommonFunction";
import useDidMountEffect from "hooks/useDidMountEffect";
import { uploadFile, uploadContent, getRfqFileList } from "apis/file.api";
import QuotationSubmitTable from "components/bidWrite/QuotationSubmitTable";

function RfqCreate() {
  const { rfq_no } = useParams();
  const navigate = useNavigate();

  const [vendorFile, setVendorFile] = useState([]);
  const [innerFile, setInnerFile] = useState([]);
  const [deleteFileIdList, setDeleteFileIdList] = useState([]);

  const [isAdd, setIsAdd] = useState(false);
  const [isAdd2, setIsAdd2] = useState(false);
  const [removeList, setRemoveList] = useState([]);
  const [removeList2, setRemoveList2] = useState([]);
  const nextId = useRef(0);
  const nextId2 = useRef(0);

  const [disabled, setDisabled] = useState(false);
  const [hide, setHide] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState("inline-block");
  const [buttonDisplayToggle, setButtonDisplayToggle] = useState("none");

  const showDisplay = (isDisplay) => {
    isDisplay ? setButtonDisplay("inline-block") : setButtonDisplay("none");
  };
  const showDisplayToggle = (isDisplay) => {
    isDisplay ? setButtonDisplayToggle("inline-block") : setButtonDisplayToggle("none");
  };

  const setReadOnly = (isReadOnly) => {
    if (isReadOnly) {
      setDisabled(true);
      setHide(true);
      showDisplay(false);
      showDisplayToggle(true);
    } else {
      setDisabled(false);
      setHide(false);
      showDisplay(true);
      showDisplayToggle(false);
    }
  };

  const testConditions = {
    amount_limit: "1",
    bidding_fob: "당사지정장소",
    buyer_id: "17278",
    category_segment: "Q",
    end_date: "2022-06-01",
    po_collabo_type: "Consignment",
    po_payment_cycle: "15 Days",
    rfq_description: "테스트1",
    rfq_detail_status: "N",
    rfq_no: "",
    rfq_payment_terms: "10000",
    rfq_ship_to: "837",
    simple_quotation_flag: "null",
  };
  const defaultConditions = {
    rfq_no: "-",
    simple_quotation_flag: "null",
    rfq_detail_status: "N", //작성중

    // cd_v_meaning_status:"",
    // cd_v_meaning_type:"",
    category_segment: "Q", //자재
    // line_type_id :"",

    rfq_description: "",
    buyer_id: "17278",

    po_payment_cycle: "",
    po_collabo_type: "",

    end_date: "",
    amount_limit: "",

    rfq_ship_to: "",
    rfq_payment_terms: "",
    bidding_fob: "",
  };

  const [rfqListData, setRfqListData] = useState(
    // testConditions
    defaultConditions,
  );
  // 공급사선정
  const [selectedVendorList, setSelectedVendorList] = useState([]);

  // 품목정보
  const [productInfoData, setProductInfoData] = useState([]);
  const [deletedVendorIdList, setDeletedVendorIdList] = useState([]);
  const [deletedProductIdList, setDeletedProductIdList] = useState([]);

  const [buyerInfoData, setBuyerInfoData] = useState([]);

  //lov
  const [CycleLov, setCycleLov] = useState([]);
  const [CollaboLov, setCollaboLov] = useState([]);
  const [shipToLov, setshipToLov] = useState([]);
  const [PaymentLov, setPaymentLov] = useState([]);
  const [FobLov, setFobLov] = useState([]);

  const getRfqInfo = async (rfq_no) => {
    // #region RFQ
    const data = await selectRfq(rfq_no);
    // Rfq Header
    const rfqList = data;
    const po1 = data.po1List[0];
    const bid1 = data.bid1List[0];

    const temp = {
      rfq_no: rfqList.rfq_no,
      simple_quotation_flag: rfqList.simple_quotation_flag,
      rfq_detail_status: rfqList.rfq_detail_status,
      category_segment: rfqList.category_segment,
      rfq_description: rfqList.rfq_description,
      buyer_id: rfqList.buyer_id,
      po_payment_cycle: po1.po_payment_cycle,
      po_collabo_type: po1.po_collabo_type,
      end_date: po1.end_date,
      amount_limit: po1.amount_limit,
      rfq_ship_to: rfqList.rfq_ship_to,
      rfq_payment_terms: rfqList.rfq_payment_terms,
      // bidding_fob        : bid1.bidding_fob,
      bidding_fob: rfqList.fob_lookup_code,
    };
    setRfqListData({ ...temp });

    // Rfq Vendor
    const vendorList = data.rfq3List;
    setSelectedVendorList([...vendorList]);

    // Rfq Product = Rfq 2
    const productList = data.rfq2List;
    const tempProductList = [];
    productList.forEach((element) => {
      tempProductList.push({ ...element, rfq_id: element.id, query_type: "update" });
    });
    setProductInfoData([...tempProductList]);
    // #endregion RFQ

    // #region File
    const fileData = await getRfqFileList(rfq_no);
    console.log("fileData", fileData);
    fileData.forEach((element) => {
      element.id = nextId.current++;
      // element.query_type = "update";
    });

    const newFile = {
      id: nextId.current,
      type: "",
      origin_name: "",
      save_name: "",
      size: "",
      upload_date: "",
      file_path: "",
    };
    setVendorFile([...fileData, newFile]);
    console.log("nextId.current", nextId.current);
    // #endregion File
  };

  const selectProductInfo = async () => {
    const reqNumList = pageData.getPrNumList();
    const data = await getProductInfoList(reqNumList);

    const tempList = [];
    data.forEach((element) => {
      let temp = {
        request_dept: element.dept_name,
        description: element.description,
        group_name: element.group_name,
        item_name: element.item,
        item_id: element.item_id,
        request_name: element.name,
        requisition_num: element.requisition_num + "-" + element.requisition_line_number,
        request_phone: element.staff_contact_number,
        unit_meas_lookup_code: element.uom,
      };
      tempList.push(temp);
    });

    setProductInfoData([...tempList]);
  };

  const selectBuyerInfo = async (buyerId) => {
    //TODO: 로그인 한 buyer_id 받아와서 넣기
    const data = await getBuyerInfo(buyerId);
    setBuyerInfoData(data);
  };

  const handleCondition = (key, value) => {
    // const tempCondition = { ...conditions };
    // tempCondition[key] = value;
    // setConditions({ ...tempCondition });
  };

  const handleRfqInfoCondition = (key, value) => {
    const tempRfqInfoCondition = { ...rfqListData };

    tempRfqInfoCondition[key] = value;
    setRfqListData({ ...tempRfqInfoCondition });
  };

  const getLov = async () => {
    const Cycle = await getCycleLov();
    const Collabo = await getCollaboLov();
    const Payment = await getPaymentLov();
    const Fob = await getFobLov();
    const shipTo = await getshipToLov();

    Cycle && setCycleLov(Cycle);
    Collabo && setCollaboLov(Collabo);
    Payment && setPaymentLov(Payment);
    Fob && setFobLov(Fob);
    shipTo && setshipToLov(shipTo);
  };

  const getInitRfq = () => {
    getLov();

    if (rfq_no) {
      // * RFQ 수정
      // RFQ Create로 넘어온 경우
      selectBuyerInfo("17278");
      getRfqInfo(rfq_no);
      setReadOnly(true);
    } else {
      // * RFQ 생성
      // Pr에서 넘어온 경우
      // TODO: Buyer id 넣어주기
      selectBuyerInfo("17278");
      selectProductInfo();
      setRfqListData({ ...rfqListData, rfq_no: rfq_no });
      setReadOnly(false);
    }
  };

  useEffect(() => {
    getInitRfq();
  }, []);

  //modal 기능(onHandleOk, onHandleCancel, onHandleSearch)
  const [visible, setVisible] = useState(false);
  const onHandleOk = ({ selectedRows }) => {
    // 기존 목록 삭제
    let temp = [];
    selectedVendorList.forEach((element) => {
      temp.push(element.vendor_id);
    });

    setDeletedVendorIdList([...temp]);

    // 새 목록 갱신
    setSelectedVendorList([...selectedRows]);
  };
  const onHandleCancel = () => {};
  const onHandleSearch = async (value) => {
    const sendData = { vendor_name: value };
    const resultList = await getVendorList(sendData);
    return resultList;
  };
  const columnDefs = [
    {
      headerName: "",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 10,
      maxWidth: 100,
      width: 50,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
      hide: hide,
    },
    { field: "item_name", headerName: "Item", minWidth: 10 },
    { field: "description", headerName: "Description", minWidth: 10, maxWidth: 150 },
    { field: "unit_meas_lookup_code", headerName: "단위", minWidth: 10, maxWidth: 80 },
    {
      field: "pur_rfq_qt",
      headerName: "수량",
      minWidth: 10,
      maxWidth: 80,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: productInfoData,
            setStateValue: setProductInfoData,
            disabled: disabled,
          },
        };
      },
    },
    {
      field: "need_by_date",
      headerName: "납기",
      minWidth: 10,
      maxWidth: 120,
      cellRendererSelector: (params) => {
        return {
          component: InputOneDateGrid,
          params: {
            params: params,
            stateValue: productInfoData,
            setStateValue: setProductInfoData,
            disabled: disabled,
          },
        };
      },
    },
    { field: "request_dept", headerName: "사용부서", minWidth: 10, maxWidth: 120 },
    { field: "group_name", headerName: "그룹사", minWidth: 10, maxWidth: 100 },
    { field: "requisition_num", headerName: "PR번호-Line", minWidth: 10, maxWidth: 140 },
    { field: "request_name", headerName: "신청자", minWidth: 10, maxWidth: 100 },
    { field: "request_phone", headerName: "연락처", minWidth: 10, maxWidth: 120 },
  ];

  // #region 그리드 관련 이벤트
  const gridRef = useRef();
  const [selectedIds, setSelectedIds] = useState([]);

  // 그리드 행 복사
  const onCopySelected = useCallback(() => {
    copyRow();
  });
  const copyRow = () => {
    let id = 1;
    const tempData = [];
    const ids = [];
    const setRowData = setProductInfoData;

    gridRef.current.api.forEachNode(function (node) {
      tempData.push({ ...node.data, id: id++ });
      if (node.isSelected()) {
        ids.push(id - 1);
        // * id, query_type 새로 부여
        tempData.push({ ...node.data, id: id++, query_type: "insert" });
      }
    });

    setRowData([...tempData]);
    setSelectedIds([...ids]);
  };

  // 그리드 행 삭제
  const deleteRow = useCallback(() => {
    const rowData = productInfoData;
    const setRowData = setProductInfoData;

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    if (selectedRowNodes.length === 0) return;

    const selectedIds = selectedRowNodes.map((rowNode) => rowNode.data.id);
    const selectedData = rowData.filter((dataItem) => selectedIds.indexOf(dataItem.id) >= 0);

    // * 삭제한 행의 정보를 담는다.
    const tempList = deletedProductIdList;
    selectedData.forEach((element) => {
      // * 기존 행인 경우에만 담는다.
      // primary key 가져오기
      if (element.query_type === "update") tempList.push(element.rfq_id);
    });
    setDeletedProductIdList([...tempList]);

    const filteredData = rowData.filter((dataItem) => selectedIds.indexOf(dataItem.id) < 0);
    setRowData([...filteredData]);
    setSelectedIds([]);
  });

  // 그리드 체크항목 유지
  const onRowDataChanged = () => {
    gridRef.current.api.forEachNode(
      (node) => selectedIds.includes(node.data.id) && node.setSelected(true),
    );
  };
  // #endregion 그리드 관련 이벤트

  // #region 버튼
  // 저장 button
  const onClickSaveRfq = async () => {
    let res = confirm("최종 저장 하시겠습니까?");
    if (res) {
      // TODO : 필수 입력사항 입력했는지 확인시키기(alert?)
      // const data2 = await uploadContent(innerFile);
      // console.log("data2", data2)

      const data = await insertRfqInfo(
        rfqListData,
        selectedVendorList,
        productInfoData,
        // vendorFile
        // innerFile
      );

      const rfqNum = data;

      let temp = vendorFile;
      temp.forEach((t) => {
        t.rfq_no = rfqNum;
      });
      setVendorFile([...temp]);
      const data1 = await uploadContent(vendorFile, deleteFileIdList);

      if (rfqNum) {
        alert("저장이 완료되었습니다.");

        navigate(`/rfqCreate/${rfqNum}` /* , { replace: true} */);
        reload();
        setReadOnly(true);
      } else {
        alert("저장 되지 않았습니다.");
      }
    }
  };

  const onClickDeleteRfq = async () => {
    let res = confirm("삭제 하시겠습니까?");
    if (res) {
      const data = await deleteRfqInfo(rfq_no);
      if (data) {
        alert("삭제가 완료되었습니다.");
        // reload();
        navigate(`/selectPrList`);
      } else {
        alert("삭제가 되지 않았습니다.");
      }
    }
  };

  const onClickUpdateRfq = async () => {
    let res = confirm("수정 하시겠습니까?");
    if (res) {
      // TODO : 필수 입력사항 입력했는지 체크하기
      const data = await updateRfqInfo(
        rfqListData,
        selectedVendorList,
        productInfoData,
        deletedVendorIdList,
        deletedProductIdList,
      );

      const rfqNum = data;

      let temp = vendorFile;
      temp.forEach((t) => {
        t.rfq_no = rfqNum;
      });
      setVendorFile([...temp]);
      const data1 = await uploadContent(vendorFile, deleteFileIdList);

      if (rfqNum) {
        alert("수정이 완료되었습니다.");
        reload();
      } else {
        alert("수정이 되지 않았습니다.");
      }
    }
  };

  const onClickChangeReadOnly = () => {
    setReadOnly(false);
  };

  const ButtonSelector = () => {
    if (rfq_no) {
      // 수정
      return (
        <section>
          <Button style={{ display: buttonDisplayToggle }} onClick={onClickChangeReadOnly}>
            수정
          </Button>
          <Button style={{ display: buttonDisplay }} onClick={onClickUpdateRfq}>
            저장
          </Button>
          <Button style={{ display: buttonDisplay }} onClick={onClickDeleteRfq}>
            삭제
          </Button>
        </section>
      );
    } else {
      // 생성
      return <Button onClick={onClickSaveRfq}>저장</Button>;
    }
  };
  // #endregion 버튼

  // #region File Input 관련 이벤트
  const handleInputChange = async (e, id) => {
    const formData = new FormData();
    e.target.files[0] && formData.append("file", e.target.files[0]);

    const returnData = await uploadFile(formData);

    let tempList = vendorFile;
    let tempIdx = tempList.length - 1;
    tempList.forEach((e, idx) => {
      if (e.id === id) tempIdx = idx;
    });

    if (tempList[tempIdx].file_id) {
      // 기존 파일 변경
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name: returnData[0].originFile,
        save_name: returnData[0].saveFile,
        size: returnData[0].size + "Bytes",
        upload_date: returnData[0].uploadDate,
        file_path: returnData[0].saveFolder,
        query_type: "update",
      };
    } else {
      // 새 파일 추가
      tempList[tempIdx] = {
        ...tempList[tempIdx],
        origin_name: returnData[0].originFile,
        save_name: returnData[0].saveFile,
        size: returnData[0].size + "Bytes",
        upload_date: returnData[0].uploadDate,
        file_path: returnData[0].saveFolder,
        query_type: "insert",
      };
    }

    setVendorFile([...tempList]);

    // 마지막 행에 파일이 추가된 경우, 새 줄 추가
    if (tempIdx === tempList.length - 1) {
      setIsAdd(!isAdd);
    }
  };

  const handleRemoveList = (checked, id) => {
    if (checked) {
      setRemoveList([...removeList, id]);
    } else {
      setRemoveList(removeList.filter((r) => r !== id));
    }
  };

  const onRemove = () => {
    let temp = vendorFile;
    let delTemp = [];

    removeList.map((r) => {
      temp = temp.filter((q, idx) => {
        if (q.id !== r || idx === temp.length - 1) {
          // 유지될 항목
          return true;
        } else {
          // 삭제될 항목
          if (q.file_id) delTemp.push(q.file_id);
          return false;
        }
      });
    });
    setVendorFile([...temp]);
    setRemoveList([]);

    setDeleteFileIdList([...deleteFileIdList, ...delTemp]);
  };

  // fileTable row추가
  const onCreate = () => {
    nextId.current += 1;
    const newFile = {
      id: nextId.current,
      type: "",
      origin_name: "",
      save_name: "",
      size: "",
      upload_date: "",
      file_path: "",
    };
    setVendorFile([...vendorFile, newFile]);
  };

  // file content 내용 등록
  const handleFileContent = (key, value) => {
    setVendorFile(
      vendorFile.map((q) =>
        // q.id === nextId.current
        q.id === key
          ? {
              ...q,
              type: value,
            }
          : q,
      ),
    );
  };

  // #endregion File Input 관련 이벤트

  // #region useEffect
  useDidMountEffect(() => {
    onCreate();
  }, [isAdd]);

  useEffect(() => {}, [vendorFile]);
  // #endregion useEffect

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>RFQ 생성</Title>
          <ButtonSelector />
        </HeaderWrapper>
        <SubTitle>RFQ 정보</SubTitle>

        <RfqInfoContainer>
          <InputInfo
            id="rfq_no"
            inputLabel="RFQ번호"
            handlePoCondition={handleCondition}
            inputValue={rfqListData.rfq_no}
            disabled={true}
            spanCnt={1}
          />
          <InputInfo inputLabel="단계" inputValue={"입찰"} disabled={true} spanCnt={1} />
          {/* TODO: 값에 따라 바껴야됨 */}
          <InputInfo inputLabel="status" inputValue={"작성중"} disabled={true} spanCnt={1} />
          <InputInfo inputLabel="Type" inputValue={"자재"} disabled={true} spanCnt={1} />
          <InputInfo
            id="rfq_description"
            inputLabel="건명"
            handlePoCondition={handleRfqInfoCondition}
            inputValue={rfqListData.rfq_description}
            disabled={disabled}
            spanCnt={2}
          />
          <InputInfo
            inputLabel="담당자"
            inputValue={
              buyerInfoData.buyer_name +
              "/ " +
              buyerInfoData.buyer_dept_name +
              "/ " +
              buyerInfoData.buyer_contact
            }
            disabled={true}
            spanCnt={2}
          />
          <InputSelect
            id="po_payment_cycle"
            inputLabel="정산주기"
            // initValue={rfqListData.po_payment_cycle}
            initValue={rfqListData.po_payment_cycle}
            handlePoCondition={handleRfqInfoCondition}
            lov={CycleLov}
            disabled={disabled}
          />
          <InputSelect
            id="po_collabo_type"
            inputLabel="협업유형"
            initValue={rfqListData.po_collabo_type}
            handlePoCondition={handleRfqInfoCondition}
            lov={CollaboLov}
            disabled={disabled}
          />
          <InputOneDate
            id="end_date"
            inputLabel="계약기간(BPA)"
            initValue={rfqListData.end_date}
            handleCondition={handleRfqInfoCondition}
            disabled={disabled}
          />
          <InputInfo
            id="amount_limit"
            inputLabel="Amount Limit(%)"
            handlePoCondition={handleRfqInfoCondition}
            inputValue={rfqListData.amount_limit}
            disabled={disabled}
          />
          <InputSelect
            id="rfq_ship_to"
            inputLabel="납품지역"
            initValue={rfqListData.rfq_ship_to}
            handlePoCondition={handleRfqInfoCondition}
            lov={shipToLov}
            disabled={disabled}
            spanCnt={2}
          />
          <InputSelect
            id="rfq_payment_terms"
            inputLabel="지불조건"
            initValue={rfqListData.rfq_payment_terms}
            handlePoCondition={handleRfqInfoCondition}
            lov={PaymentLov}
            disabled={disabled}
          />
          <InputSelect
            id="bidding_fob"
            inputLabel="인도조건"
            initValue={rfqListData.bidding_fob}
            handlePoCondition={handleRfqInfoCondition}
            lov={FobLov}
            disabled={disabled}
          />
        </RfqInfoContainer>
      </section>

      <section>
        <CustomModal
          title={"공급사 선택"}
          labelTitle={"공급사명"}
          onHandleOk={onHandleOk}
          onHandleCancel={onHandleCancel}
          onHandleSearch={onHandleSearch}
          gridOptions={{
            columnDefs: popUpVendorColFields,
            rowSelection: "multiple", // single, multiple
            suppressRowClickSelection: false,
          }}
          visible={visible}
          setVisible={setVisible}
        ></CustomModal>
        <ButtonWrapper>
          <SubTitle>공급사선정</SubTitle>
          <Button
            style={{ display: buttonDisplay }}
            onClick={() => {
              setVisible(true);
            }}
          >
            공급사선정
          </Button>
        </ButtonWrapper>
        <AgVendorSelect selectedVendorList={selectedVendorList} hide={hide} />
      </section>

      <section>
        <ButtonWrapper>
          <SubTitle>🔹 RFQ첨부(공급사배포)</SubTitle>
          <DeleteButton onClick={onRemove}>삭제</DeleteButton>
        </ButtonWrapper>
        <RfqSelectVendorContainer>
          <QuotationSubmitTable
            quotationFile={vendorFile}
            handleFileContent={handleFileContent}
            handleInputChange={handleInputChange}
            handleRemoveList={handleRemoveList}
            isCheckDisabled={disabled}
            isSelectDisabled={disabled}
            isBtnDisabled={disabled}
          ></QuotationSubmitTable>
        </RfqSelectVendorContainer>
      </section>

      <section>
        <ButtonWrapper>
          <SubTitle>🔹 품목정보</SubTitle>
          <section>
            <Button style={{ display: buttonDisplay }} onClick={onCopySelected}>
              행 복사
            </Button>
            <Button style={{ display: buttonDisplay }} onClick={deleteRow}>
              행 삭제
            </Button>
          </section>
        </ButtonWrapper>
        <AgProductInfo
          gridRef={gridRef}
          productInfoData={productInfoData}
          columnDefs={columnDefs}
          onRowDataChanged={onRowDataChanged}
        />
      </section>
    </StyledRoot>
  );
}

export default RfqCreate;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  font-family: "Pretendard-SemiBold";
`;
// const SmallTitle = styled.p`
//   font-size: 1.6rem;
//   margin-bottom: 1rem;
//   margin-top: 1.5rem;
// `;
const RfqInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
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

const SubTitle = styled.p`
  font-size: 1.8rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const RfqSelectVendorContainer = styled.div`
  padding: 2rem 0rem;
`;
