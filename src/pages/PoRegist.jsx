import {
  getPrReasonLov,
  insertOnePr,
  deleteOnePr,
  getOrgLov,
  getDestLov,
  getTaxCodeLov,
  updateOnePr,
  getPr,
} from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import {
  prCreateColDef,
  popUpStaffColFields,
  popUpBuyerColFields,
  popUpItemColFields,
  popUpVendorColFields,
} from "stores/colData";
// import InputInfo from "components/po/PoInputInfo";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import InputSelectGrid from "components/common/InputSelectGrid";
import InputInfoGrid from "components/common/InputInfoGrid";
import InputOneDateGrid from "components/common/InputOneDateGrid";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { getBuyerList, getItemList, getStaffList, getVendorList } from "apis/public.api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputOneDate from "components/common/InputOneDate";
import { checkFatFinger, deleteOnePo, getPoRegistLov, getPoSearch, insertOnePo, updateOnePo } from "apis/po.api";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import { getNumberFormat, reload } from "hooks/CommonFunction";
import TimeLine from "components/common/TimeLine/timelines";
import { TimeLineBuildStyle } from "components/common/TimeLine/utils";
import FatFingerModal from "components/common/FatFingerModal";
import { Switch } from "antd";

function PoRegist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const testData = [
    //   {
    //     action: "Warning",
    //     category: "test",
    //     category_id: 1111111,
    //     charge_account: "123",
    //     closed_code: "",
    //     deliver_to_location: "123",
    //     description: "test",
    //     distribution: "",
    //     id: 1,
    //     item: "",
    //     item_id: 2225850,
    //     item_name: "test",
    //     line: 1,
    //     match_option: "2-way",
    //     need_by_date: "2022-06-19",
    //     organization: "POSCO 포항자재/외주/투자(PM)",
    //     over_receipt_tol: "12",
    //     promised_date: "2022-06-22",
    //     quantity: "111",
    //     quantity_accepted: "",
    //     quantity_billed: "",
    //     quantity_cancelled: "",
    //     quantity_recevied: "",
    //     quantity_rejected: "",
    //     req_line: "",
    //     requester: "",
    //     requester_id: 1685,
    //     requester_name: "이동현",
    //     requisition: "",
    //     ship_quantity: "333",
    //     ship_total_amount: 999,
    //     shipment: "",
    //     subinventory: "123",
    //     tax_code: "P영세율매입",
    //     total_amount: 333,
    //     unit_price: "3",
    //     uom: "each",
    // }
    {
      closed_code: "",
      line: "",
      item: "",
      category: "",
      description: "",
      uom: "",
      quantity: "",
      unit_price: "",
      total_amount: "",
      shipment: "",
      ship_quantity: "",
      ship_total_amount: "",
      need_by_date: "",
      promised_date: "",
      organization: "",
      tax_code: "",
      match_option: "",
      over_receipt_tol: "",
      action: "",
      quantity_recevied: "",
      quantity_accepted: "",
      quantity_rejected: "",
      quantity_billed: "",
      quantity_cancelled: "",
      distribution: "",
      requisition: "",
      req_line: "",
      requester: "",
      deliver_to_location: "",
      subinventory: "",
      charge_account: "",
    },
  ];
  const [rowData, setRowData] = useState([...testData]);
  const [deletedIdList, setDeletedIdList] = useState({
    line: [],
    location: [],
    distribution: [],
  });
  const [trackData, setTrackData] = useState([
    {
      id: "1",
      title: "물품1",
      start: new Date("2021-08-31"),
      end: new Date("2021-09-21"),
      style: TimeLineBuildStyle,
      elements: [
        {
          id: "1",
          title: "물품1",
          start: new Date("2021-08-31"),
          end: new Date("2021-09-21"),
          style: TimeLineBuildStyle,
        }
      ],
    }
  ]);

  // const testCondition = {
  //   acceptance_due_date: "",
  //   actionLov: "",
  //   approved_date: "",
  //   attributeCategory: "",
  //   attribute_category: "MRO내자",
  //   authorization_status: "",
  //   bidMethodTypeLov: "",
  //   bid_method_type: "C",
  //   blanket_total_amount: 13332,
  //   buyer_id: 26833,
  //   buyer_name: "김성웅",
  //   comments: "111",
  //   contract_date: "2022-06-19",
  //   controlConfirmFlagLov: "",
  //   control_confirm_flag: "N",
  //   currency_code: "",
  //   fobLookupCodeLov: "",
  //   fob_lookup_code: "당사지정장소",
  //   invoiceTypeLov: "",
  //   invoice_type: "Receipt",
  //   matchOptionLov: "",
  //   note_to_receiver: "222",
  //   note_to_vendor: "111",
  //   organizationLov: "",
  //   po_num: "Create Fail",
  //   replyMethodLookupCode1Lov: "",
  //   reply_method_lookup_code1: "BS성과보상(직접지불)",
  //   revision_num: "",
  //   taxCodeLov: "",
  //   termsIdLov: "",
  //   terms_id: "10010",
  //   type_lookup_code: "",
  //   vendor_location: "본사",
  //   vendor_name: "(주)세화기계 / SAEHWA MACHINERY CO.",
  //   vendor_id : "2",
  // }
  const [conditions, setConditions] = useState({
    // lov
    attributeCategory: "",
    fobLookupCodeLov: "",
    termsIdLov: "",
    bidMethodTypeLov: "",
    invoiceTypeLov: "",
    replyMethodLookupCode1Lov: "",
    controlConfirmFlagLov: "",
    organizationLov: "",
    taxCodeLov: "",
    matchOptionLov: "",
    actionLov: "",

    // input
    po_num: "",
    revision_num: "",
    type_lookup_code: "",
    attribute_category: "",
    comments: "",
    vendor_location: "",
    vendor_name: "",
    vendor_id: "",
    buyer_id: "",
    buyer_name: "",
    approved_date: "",
    authorization_status: "",
    contract_date: "",
    acceptance_due_date: "",
    fob_lookup_code: "",
    terms_id: "",
    blanket_total_amount: "",
    currency_code: "",
    bid_method_type: "",
    invoice_type: "",
    reply_method_lookup_code1: "",
    note_to_vendor: "",
    note_to_receiver: "",
    control_confirm_flag: "",
  });

  const [selectedIds, setSelectedIds] = useState([]);

  // Lov
  const [attributeCategory, setAttributeCategory] = useState([]);
  const [fobLookupCodeLov, setFobLookupCodeLov] = useState([]);
  const [termsIdLov, setTermsIdLov] = useState([]);
  const [bidMethodTypeLov, setBidMethodTypeLov] = useState([]);
  const [invoiceTypeLov, setInvoiceTypeLov] = useState([]);
  const [replyMethodLookupCode1Lov, setReplyMethodLookupCode1Lov] = useState([]);
  const [controlConfirmFlagLov, setControlConfirmFlagLov] = useState([]);
  const [organizationLov, setOrganizationLov] = useState([]);
  const [taxCodeLov, setTaxCodeLov] = useState([]);
  const [matchOptionLov, setMatchOptionLov] = useState([]);
  const [actionLov, setActionLov] = useState([]);

  // 팝업 그리드 행 정보
  const [popUpPreparerRowData, setPopUpPreparerRowData] = useState([]);

  const [onFatFinger, setOnFatFinger] = useState(true);
  const [visibleFatFinger, setVisibleFatFinger] = useState(false);

  const gridRef = useRef();
  const itemGridRef = useRef();
  const poGridRef = useRef();

  const [itemGridRowData, setItemGridRowData] = useState([
    {
      item: "test1",
      description : "사양1",
      category : "카테고리1",
      uom : "단위1",
      avg_unit_price : "평균단가1",
      error_range : "오차범위1(%)",
    },
  ]);
  const [itemDetailGridRowData, setItemDetailGridRowData] = useState({});

  const [poGridRowData, setPoGridRowData] = useState([
    {
      item : "test1",
      content: [
        {
          po_num      : "test1_1",
          description : "test1_1",
          unit_price  : "test1_1",
          currency    : "test1_1",
          po_date     : "test1_1",
          vendor      : "test1_1",
        },
      ]
    },
    

  ]);
  const [poDetailGridRowData, setPoDetailGridRowData] = useState([]);

  // Input 컴포넌트 onChange 이벤트
  const handleCondition = (key, value) => {
    const tempCondition = { ...conditions };
    tempCondition[key] = value;
    setConditions({ ...tempCondition });
  };


  // #region Fat Finger
  const getFatFingerSendData = ()=>{
    let tempList = [];
    rowData.forEach((e)=>{
      if(e.item_id) {
        let temp = {
          id         : e.id,
          line       : e.line,
          item_id    : e.item_id,
          unit_price : e.unit_price,
        }
        tempList.push(temp);
      }
    })
    return tempList;
  }

  const isFatFingerError = async () => {
    if(!onFatFinger) {
      return true;
    }

    const tempList = getFatFingerSendData();
    if(!tempList.length) return true;

    const data = await checkFatFinger(tempList);
    if(data.itemList.length > 0) {
      setItemGridRowData([...data.itemList]);
      setPoGridRowData([...data.poList]);
      setItemDetailGridRowData(data.itemList[0]);
      setPoDetailGridRowData([...data.poList[0].content]);
      setVisibleFatFinger(true);
      return false;
    } else {
      return true;
    }
  }
  // #endregion Fat Finger


  // PO 저장 버튼 이벤트
  const onSaveContents = async () => {

    const bool = await isFatFingerError();
    if(bool) {
      saveContents();
    }

  };

  const saveContents = async () => {
    console.log("onSaveContents called!!!!!!!!!!!");

    if(confirm("구매계약 등록을 완료 하시겠습니까?")) {
      // !: axios 비동기
      const data = await insertOnePo(conditions, rowData);
      if (data) {
        alert("구매계약 등록이 완료되었습니다.");
        const temp = conditions;
        temp.po_num = data;
        setConditions({ ...temp });
        navigate(`/poRegist/${temp.po_num}`);
        reload();
      } else {
        alert("구매 계약 등록이 실패했습니다.");
      }
    }
    
  };

  const onUpdateContents = async () => {
    console.log("rowData", rowData);
    const bool = await isFatFingerError();
    if(bool) {
      updateContent();
    }

  };

  const updateContent = async () => {
    console.log("onUpdateContents called");

    if(confirm("구매 계약서 수정을 완료하시겠습니까?")){
      // !: axios 비동기
      const data = await updateOnePo(conditions, rowData, deletedIdList);
      if (data) {
        alert("구매 계약 수정이 완료되었습니다.");
        const temp = conditions;
        temp.po_num = data;
        setConditions({ ...temp });
        reload();
      } else {
        alert("구매 계약 수정이 실패했습니다.");
      }
    }
    
  };

  // PR 삭제 버튼 이벤트
  const onDeleteContents = () => {
    confirm("삭제 시 해당 계약서를 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?")
      ? deleteContent()
      : null;
  };

  const deleteContent = async () => {
    console.log("onDeleteContents called");

    // !: axios 비동기
    const data = await deleteOnePo(conditions.po_num);
    if (data) {
      alert("구매 계약 삭제가 완료되었습니다.");
      navigate(`/selectPoList`);
    } else {
      alert("구매 계약 삭제가 실패했습니다.");
    }
    // navigate.replace(`/createPr`);
  };

  // #region 그리드 관련 이벤트
  // 그리드 행 추가
  // TODO: 체크항목 유지하기
  const onInsertOne = useCallback(() => {
    console.log("onInsertOne called!");

    const newRecord = createOneRecord();
    const records = [...rowData, newRecord];
    setRowData(records);
  });
  const createOneRecord = () => {
    return {
      closed_code: "",
      line: "",
      item: "",
      category: "",
      description: "",
      uom: "",
      quantity: "",
      unit_price: "",
      total_amount: "",
      shipment: "",
      ship_quantity: "",
      ship_total_amount: "",
      need_by_date: "",
      promised_date: "",
      organization: "",
      tax_code: "",
      match_option: "",
      over_receipt_tol: "",
      action: "",
      quantity_recevied: "",
      quantity_accepted: "",
      quantity_rejected: "",
      quantity_billed: "",
      quantity_cancelled: "",
      distribution: "",
      requisition: "",
      req_line: "",
      requester: "",
      requester_id: "",
      deliver_to_location: "",
      subinventory: "",
      charge_account: "",
      query_type: "insert",
    };
  };

  // 그리드 행 복사
  const onCopySelected = useCallback(() => {
    copyRow();
  });

  const copyRow = () => {
    console.log("copyRow called");
    let id = 1;
    const tempData = [];
    const ids = [];

    gridRef.current.api.forEachNode(function (node) {
      tempData.push({ ...node.data, id: id++ });
      if (node.isSelected()) {
        ids.push(id - 1);
        tempData.push({
          ...node.data,
          id: id++,
          po_line_id: null,
          po_line_location_id: null,
          po_distribution_id: null,
          query_type: "insert",
        });
      }
    });

    setRowData([...tempData]);
    setSelectedIds([...ids]);
  };

  // 그리드 행 삭제
  const deleteRow = useCallback(() => {
    console.log("deleteRow called");

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    if (selectedRowNodes.length === 0) return;

    const selectedIds = selectedRowNodes.map((rowNode) => rowNode.data.id);
    const selectedData = rowData.filter((dataItem) => selectedIds.indexOf(dataItem.id) >= 0);
    console.log("selectedData :::", selectedData);

    // * 삭제한 행의 정보를 담는다.
    //  const tempList = deletedIdList;
    const tempLineList = deletedIdList.line;
    const tempLocationList = deletedIdList.location;
    const tempDistList = deletedIdList.distribution;
    selectedData.forEach((element) => {
      // * 기존 행인 경우에만 담는다.
      if (element.query_type === "update") {
        tempLineList.push(element.po_line_id);
        tempLocationList.push(element.po_line_location_id);
        tempDistList.push(element.po_distribution_id);
      }
    });
    setDeletedIdList({
      line: [...tempLineList],
      location: [...tempLocationList],
      distribution: [...tempDistList],
    });

    const filteredData = rowData.filter((dataItem) => selectedIds.indexOf(dataItem.id) < 0);
    setRowData([...filteredData]);
    setSelectedIds([]);
  });

  // 그리드 체크항목 유지
  const onRowDataChanged = () => {
    // console.log("row changed!!", selectedIds);

    gridRef.current.api.forEachNode(
      (node) => selectedIds.includes(node.data.id) && node.setSelected(true),
    );
  };
  // #endregion 그리드 관련 이벤트

  // #region Line 아이템 이벤트
  const onHandleSearchItem = async (searchWord) => {
    const resultList = await getItemList(searchWord);
    return resultList;
  };

  const onHandleOkItem = ({ selectedRows, idx }) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].item_id = row.item_id;
    temp[idx].item = row.item;
    temp[idx].category = row.category;
    temp[idx].category_id = row.category_id;
    temp[idx].description = row.description;

    setRowData([...temp]);

    return temp[idx].item;
  };

  const onHandleCancelItem = ({}) => {
    const temp = conditions;
    temp.item_id = "";
    temp.item = "";
    temp.category = "";
    setConditions(temp);
  };
  // #endregion Line 아이템 이벤트

  // #region Line Requester 이벤트
  const onHandleSearchRequester = async (searchWord) => {
    const resultList = await getStaffList(searchWord);
    return resultList;
  };

  const onHandleOkRequester = ({ selectedRows, idx }) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].requester = row.name;
    temp[idx].requester_id = row.id;

    setRowData([...temp]);

    return temp[idx].requester;
  };

  const onHandleCanceRequester = ({}) => {
    const temp = conditions;
    temp.item_id = "";
    temp.item = "";
    temp.category = "";
    setConditions(temp);
  };
  // #endregion Line Requester 이벤트

  // 그리드 컬럼
  const prCreateColFields = [
    {
      field: null,
      headerCheckboxSelection: true,
      maxWidth: 50,
      pinned: "left",
      checkboxSelection: true,
    },
    { field: "closed_code", headerName: "상태", maxWidth: 100, pinned: "left", editable: false },
    { field: "line", headerName: "Line", maxWidth: 80, pinned: "left", editable: false },
    {
      field: "item",
      headerName: "Item",
      minWidth: 150,
      editable: false,
      cellRendererSelector: (params) => {
        const idx = params.node.rowIndex;
        const initValue = rowData[idx] ? rowData[idx].item : "";
        return {
          component: InputSearch,
          params: {
            idx: idx,
            title: "아이템 선택",
            initValue: initValue,
            onHandleSearch: onHandleSearchItem,
            onHandleOk: onHandleOkItem,
            onHandleCancel: onHandleCancelItem,
            gridOptions: {
              columnDefs: popUpItemColFields,
              rowSelection: "single",
              suppressRowClickSelection: false,
            },
          },
        };
      },
    },
    { field: "category", headerName: "Category", minWidth: 150, editable: false },
    { field: "description", headerName: "사양", minWidth: 400, editable: false },
    { field: "uom", headerName: "단위", minWidth: 80, editable: false },
    {
      field: "quantity",
      headerName: "수량",
      minWidth: 100,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "unit_price",
      headerName: "단가",
      minWidth: 100,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "total_amount",
      headerName: "금액",
      minWidth: 100,
      editable: false,
      valueGetter: (params) => getNumberFormat(params.data.quantity * params.data.unit_price),
    },
    {
      field: "shipment",
      headerName: "shipment",
      minWidth: 120,
      editable: false,
      valueGetter: (params) => 1,
    },
    {
      field: "ship_quantity",
      headerName: "수량",
      minWidth: 100,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "ship_total_amount",
      headerName: "금액",
      minWidth: 100,
      editable: false,
      valueGetter: (params) => getNumberFormat(params.data.ship_quantity * params.data.unit_price),
    },
    {
      field: "need_by_date",
      headerName: "Need By Date",
      minWidth: 150,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputOneDateGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "promised_date",
      headerName: "Promised Date",
      minWidth: 150,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputOneDateGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "organization",
      headerName: "Organization",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: organizationLov,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "tax_code",
      headerName: "Tax Code",
      minWidth: 180,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: taxCodeLov, // TODO : 바꾸기
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "match_option",
      headerName: "Match Option",
      minWidth: 180,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: matchOptionLov, // TODO : 바꾸기
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "over_receipt_tol",
      headerName: "Over Receipt Tolerance",
      minWidth: 110,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "action",
      headerName: "action",
      minWidth: 180,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: actionLov, // TODO : 바꾸기
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "quantity_recevied",
      headerName: "Quantity Recevied",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 0,
    },
    {
      field: "quantity_accepted",
      headerName: "Quantity Accepted",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 0,
    },
    {
      field: "quantity_rejected",
      headerName: "Quantity Rejected",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 0,
    },
    {
      field: "quantity_billed",
      headerName: "Quantity Billed",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 0,
    },
    {
      field: "quantity_cancelled",
      headerName: "Quantity Cancelled",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 0,
    },
    {
      field: "distribution",
      headerName: "Distribution",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 1,
    },
    { field: "requisition", headerName: "Requisition", minWidth: 180, editable: false },
    {
      field: "req_line",
      headerName: "Req Line",
      minWidth: 180,
      editable: false,
      valueGetter: (params) => 1,
    },
    {
      field: "requester",
      headerName: "Requester",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        const idx = params.node.rowIndex;
        const initValue = rowData[idx] ? rowData[idx].requester : "";
        return {
          component: InputSearch,
          params: {
            idx: idx,
            title: "직원 선택",
            initValue: initValue,
            onHandleSearch: onHandleSearchRequester,
            onHandleOk: onHandleOkRequester,
            onHandleCancel: onHandleCanceRequester,
            gridOptions: {
              columnDefs: popUpStaffColFields,
              rowSelection: "single",
              suppressRowClickSelection: false,
            },
          },
        };
      },
    },
    {
      field: "deliver_to_location",
      headerName: "Deliver To Location",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "subinventory",
      headerName: "Subinventory",
      minWidth: 150,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "charge_account",
      headerName: "Charge Account",
      minWidth: 250,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
  ];

  // Init Page
  useEffect(() => {
    getLov();
    getPoInit();
  }, []);

  useEffect(()=>{
    let tempList = [];
    rowData.forEach((e)=>{
      let temp = {
        id: e.id,
        title: e.item ? e.item : "",
        elements: [
          {
            id: e.id,
            title: e.item ? e.item : "",
            start: new Date(conditions.contract_date),
            end: new Date(e.need_by_date > e.promised_date ? e.need_by_date : e.promised_date),
            style: TimeLineBuildStyle,
          }
        ],
      }
      tempList.push(temp);
    })

    setTrackData([...tempList]);
  }, [conditions, rowData])

  useEffect(() => {
    // * 헤더 총 금액 계산
    const tempConditions = conditions;
    const tempRowData = rowData;
    let total = 0;
    tempRowData.forEach((element, idx) => {
      // console.log(element)
      const total_amount = element.quantity * element.unit_price;
      const ship_total_amount = element.ship_quantity * element.unit_price;
      tempRowData[idx].total_amount = total_amount;
      tempRowData[idx].ship_total_amount = ship_total_amount;

      total += ship_total_amount + total_amount;
    });
    tempConditions.blanket_total_amount = total;
    setConditions({ ...tempConditions });
  }, [rowData]);

  const getLov = async () => {
    const resv1  = await getPoRegistLov("PO_ATTRIBUTE_CATEGORY");
    const resv2  = await getPoRegistLov("PO_FOB");
    const resv3  = await getPoRegistLov("PO_PAYMENT_TERM");
    const resv4  = await getPoRegistLov("BID_METHOD_TYPE");
    const resv5  = await getPoRegistLov("PAY_ON_Pay");
    const resv6  = await getPoRegistLov("PO_PURCHASE_METHOD");
    const resv7  = await getPoRegistLov("ACCEPTANCE_REQUIRED_FLAG");
    const resv8  = await getPoRegistLov("SASO");
    const resv9  = await getPoRegistLov("TAX_CODE");
    const resv10 = await getPoRegistLov("MATCH_OPTION");
    const resv11 = await getPoRegistLov("ACTION_LOV");

    resv1  && setAttributeCategory([...resv1]);
    resv2  && setFobLookupCodeLov([...resv2]);
    resv3  && setTermsIdLov([...resv3]);
    resv4  && setBidMethodTypeLov([...resv4]);
    resv5  && setInvoiceTypeLov([...resv5]);
    resv6  && setReplyMethodLookupCode1Lov([...resv6]);
    resv7  && setControlConfirmFlagLov([...resv7]);
    resv8  && setOrganizationLov([...resv8]);
    resv9  && setTaxCodeLov([...resv9]);
    resv10 && setMatchOptionLov([...resv10]);
    resv11 && setActionLov([...resv11]);
  };

  const getPoInit = async () => {
    if (id) {
      console.log("id : ", id);
      const data = await getPoSearch(id);

      console.log("resv Data ", data);

      // * Header 데이터 정리
      const temp_conditions = {
        po_num                    : data[0].po_num,
        revision_num              : data[0].revision_num,
        type_lookup_code          : data[0].type_lookup_code,
        attribute_category        : data[0].attribute_category,
        comments                  : data[0].comments,
        vendor_id                 : data[0].vendor_id,
        vendor_name               : data[0].vendor_name,
        vendor_location           : data[0].vendor_location,
        buyer_id                  : data[0].buyer_id,
        buyer_name                : data[0].buyer_name,
        approved_date             : data[0].approved_date,
        authorization_status      : data[0].authorization_status,
        contract_date             : data[0].contract_date,
        acceptance_due_date       : data[0].acceptance_due_date,
        fob_lookup_code           : data[0].fob_lookup_code,
        vendor_location           : data[0].vendor_location,
        terms_id                  : data[0].terms_id,
        blanket_total_amount      : data[0].blanket_total_amount,
        currency_code             : data[0].currency_code,
        bid_method_type           : data[0].bid_method_type,
        invoice_type              : data[0].invoice_type,
        reply_method_lookup_code1 : data[0].reply_method_lookup_code1,
        note_to_vendor            : data[0].note_to_vendor,
        note_to_receiver          : data[0].note_to_receiver,
        control_confirm_flag      : data[0].control_confirm_flag,
      };
      console.log("temp:", temp_conditions);
      setConditions({ ...conditions, ...temp_conditions });

      // Line 데이터 정리
      const temp_lines = [];
      data.forEach((element) => {
        console.log("e", element);
        let temp_line = {
          // TODO: id 가져오기
          closed_code         : element.closed_code,
          line                : element.po_line_num,
          item                : element.test,
          item_id             : element.item_id,
          //category          : element.category_id,
          category            : element.category,
          description         : element.item_description,
          uom                 : element.unit_meas_lookup_code,
          quantity            : element.mat_bpa_agree_qt,
          unit_price          : element.unit_price,
          total_amount        : element.contract_amount,
          shipment            : 1, //po_shipment_num,
          ship_quantity       : element.quantity,
          ship_total_amount   : element.amount,
          need_by_date        : element.need_by_date,
          promised_date       : element.promised_date,
          organization        : element.ship_to_organization_id,
          tax_code            : element.tax_code,
          match_option        : element.inspection_required_flag,
          over_receipt_tol    : element.qty_rcv_tolerance,
          action              : element.qty_rcv_exception_code,
          quantity_recevied   : element.quantity_received,
          quantity_accepted   : element.quantity_accepted,
          quantity_rejected   : element.quantity_rejected,
          quantity_billed     : element.quantity_billed,
          quantity_cancelled  : element.quantity_cancelled,
          distribution        : 1,
          requisition         : element.req_distribution_id,
          req_line            : 1,
          requester           : element.request,
          requester_id        : element.request_person_id,
          deliver_to_location : element.deliver_to_location_id,
          subinventory        : element.destination_subinventory,
          charge_account      : element.account_nm,
          query_type          : "update",
          po_line_id          : element.po_line_id,
          po_line_location_id : element.po_line_location_id,
          po_distribution_id  : element.po_distribution_id,
        };
        temp_lines.push(temp_line);
      });

      setRowData([...temp_lines]);

      console.log("condididi ::: ", conditions);

    }
  };

  const onSwitchChange = (checked) => {
    setOnFatFinger(checked);
  }

  const ButtonSelector = () => {
    if (id) {
      // 수정 페이지
      return (
        <ButtonSection>
          <SwitchWrapper>
            <Switch style={{marginRight : "1rem"}} checked={onFatFinger} onChange={onSwitchChange} />
            <Label>적정가 오차 감지</Label>
          </SwitchWrapper>
          <Button onClick={onUpdateContents}>저장</Button>
          <Button onClick={onDeleteContents}>삭제</Button>
        </ButtonSection>
      );
    } else {
      // 생성 페이지
      return (
        <ButtonSection>
          <SwitchWrapper>
            <Switch style={{marginRight : "1rem"}} checked={onFatFinger} onChange={onSwitchChange} />
            <Label>적정가 오차 감지</Label>
          </SwitchWrapper>
          <Button onClick={onSaveContents}>저장</Button>
        </ButtonSection>
      )
      
    }
  };

  // #region 팝업 이벤트
  const onHandleSearchVendor = async (value) => {
    const sendData = { vendor_name: value };
    const resultList = await getVendorList(sendData);

    return resultList;
  };
  const onHandleOkVendor = ({ selectedRows }) => {
    const row = selectedRows[0];
    const temp = conditions;
    console.log(row);

    temp.vendor_location = row.vendor_location;
    temp.vendor_name = row.vendor_name;
    temp.vendor_id = row.vendor_id;
    setConditions({ ...temp });

    return temp.vendor_location;
  };
  const onHandleCanceVendor = ({}) => {
    const temp = conditions;
    temp.vendor_location = "";
    temp.vendor_name = "";
    setConditions({ ...temp });
  };

  const onHandleSearchBuyer = async (searchWord) => {
    const resultList = await getBuyerList(searchWord);
    return resultList;
  };
  const onHandleOkBuyer = ({ selectedRows }) => {
    const row = selectedRows[0];

    const temp = conditions;
    console.log(row);
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;

    setConditions({ ...temp });

    return temp.buyer_name;
  };
  const onHandleCanceBuyer = ({}) => {
    const temp = conditions;
    temp.buyer_id = "";
    temp.buyer_name = "";
    setConditions({ ...temp });
  };

  const onItemRowClicked = (e)=>{
    // console.log("e", e, e.data.item, e.rowIndex)
    const item = e.data.item;

    // 상단 정보 갱신
    const itemInfo = itemGridRowData.filter((e)=>{
      return e.item === item;
    })
    setItemDetailGridRowData(itemInfo[0]);


    // 우측 그리드 갱신
    const poInfo = poGridRowData.filter((e)=>{
      return e.item === item;
    });
    const temp = poInfo[0].content
    setPoDetailGridRowData([...temp]);

  }
  // #endregion 팝업 이벤트

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>구매계약</Title>
          <ButtonSelector />
          <FatFingerModal
            visible             = {visibleFatFinger}
            setVisible          = {setVisibleFatFinger}
            continueButtonEvent = {id?updateContent:saveContents}
            itemInfoTableData   = {itemDetailGridRowData}
            itemGridRef         = {itemGridRef}
            itemGridRowData     = {itemGridRowData}
            onItemRowClicked    = {onItemRowClicked}
            poGridRef           = {poGridRef}
            poGridRowData       = {poDetailGridRowData}
          />
        </HeaderWrapper>
        <InputContainer>
          <InputInfo
            id="po_num"
            inputLabel="PO 번호"
            handlePoCondition={handleCondition}
            inputValue={conditions.po_num}
            disabled={true}
          />
          <InputInfo
            id="revision_num"
            inputLabel="Rev."
            handlePoCondition={handleCondition}
            inputValue={conditions.revision_num}
            disabled={true}
          />
          <InputInfo
            id="type_lookup_code"
            inputLabel="Type"
            handlePoCondition={handleCondition}
            inputValue={conditions.type_lookup_code}
            disabled={true}
            spanCnt={2}
          />
          <InputSelect
            id="attribute_category"
            inputLabel="계약구분"
            initValue={conditions.attribute_category}
            handlePoCondition={handleCondition}
            lov={attributeCategory}
            spanCnt={2}
          />
          <InputInfo
            id="comments"
            inputLabel="계약명"
            handlePoCondition={handleCondition}
            inputValue={conditions.comments}
            spanCnt={2}
          />
          <InputInfo
            id="vendor_name"
            inputLabel="공급사"
            handlePoCondition={handleCondition}
            inputValue={conditions.vendor_name}
            disabled={true}
          />
          <InputSearch
            id="vendor_location"
            title="공급사 위치 선택"
            initValue={conditions.vendor_location}
            onHandleSearch={onHandleSearchVendor}
            onHandleOk={onHandleOkVendor}
            onHandleCancel={onHandleCanceVendor}
            gridOptions={{
              columnDefs: popUpVendorColFields,
              rowData: popUpPreparerRowData,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputSearch
            id="buyer_name"
            title="바이어 선택"
            inputLabel="Buyer"
            initValue={conditions.buyer_name}
            onHandleSearch={onHandleSearchBuyer}
            onHandleOk={onHandleOkBuyer}
            onHandleCancel={onHandleCanceBuyer}
            gridOptions={{
              columnDefs: popUpBuyerColFields,
              //rowData : popUpPreparerRowData,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputInfo
            id="buyer_id"
            handlePoCondition={handleCondition}
            inputValue={conditions.buyer_id}
            disabled={true}
          />
          <InputInfo
            id="approved_date"
            inputLabel="PO 승인일"
            handlePoCondition={handleCondition}
            inputValue={conditions.approved_date}
            disabled={true}
          />
          <InputInfo
            id="authorization_status"
            handlePoCondition={handleCondition}
            inputValue={conditions.authorization_status}
            disabled={true}
          />
          <InputOneDate
            id="contract_date"
            inputLabel="PO 계약일"
            initValue={conditions.contract_date}
            handleCondition={handleCondition}
            spanCnt={2}
          />
          <InputInfo
            id="acceptance_due_date"
            inputLabel="PO 수용일"
            handlePoCondition={handleCondition}
            inputValue={conditions.acceptance_due_date}
            disabled={true}
            spanCnt={2}
          />
          <InputSelect
            id="fob_lookup_code"
            inputLabel="인도조건"
            initValue={conditions.fob_lookup_code}
            handlePoCondition={handleCondition}
            lov={fobLookupCodeLov}
            spanCnt={2}
          />
          <InputSelect
            id="terms_id"
            inputLabel="지불조건"
            initValue={conditions.terms_id}
            handlePoCondition={handleCondition}
            lov={termsIdLov}
            spanCnt={2}
          />
          <InputInfo
            id="blanket_total_amount"
            inputLabel="공급가액"
            handlePoCondition={handleCondition}
            inputValue={conditions.blanket_total_amount}
            disabled={true}
            spanCnt={2}
          />
          {/* <InputInfo
            id="currency_code"
            handlePoCondition={handleCondition}
            inputValue={conditions.currency_code}
            disabled={true}
          /> */}
          <InputSelect
            id="bid_method_type"
            inputLabel="낙찰유형"
            initValue={conditions.bid_method_type}
            handlePoCondition={handleCondition}
            lov={bidMethodTypeLov}
            spanCnt={2}
          />
          <InputSelect
            id="invoice_type"
            inputLabel="Pay on"
            initValue={conditions.invoice_type}
            handlePoCondition={handleCondition}
            lov={invoiceTypeLov}
            spanCnt={2}
          />
          <InputSelect
            id="reply_method_lookup_code1"
            inputLabel="구매방법"
            initValue={conditions.reply_method_lookup_code1}
            handlePoCondition={handleCondition}
            lov={replyMethodLookupCode1Lov}
            spanCnt={2}
          />
          <InputInfo
            id="note_to_vendor"
            inputLabel="Note to Supplier"
            handlePoCondition={handleCondition}
            inputValue={conditions.note_to_vendor}
            disabled={false}
            spanCnt={2}
          />
          <InputInfo
            id="note_to_receiver"
            inputLabel="Note to Receiver"
            handlePoCondition={handleCondition}
            inputValue={conditions.note_to_receiver}
            disabled={false}
            spanCnt={2}
          />
          <InputSelect
            id="control_confirm_flag"
            inputLabel="계약수용방법"
            initValue={conditions.control_confirm_flag}
            handlePoCondition={handleCondition}
            lov={controlConfirmFlagLov}
            spanCnt={2}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapperLine>
          {/* <Button onClick={handleAddRow}>Line 추가</Button> */}
          <Button onClick={onInsertOne}>Line 추가</Button>
          <Button onClick={onCopySelected}>행 복사</Button>
          <Button onClick={deleteRow}>행 삭제</Button>
        </ButtonWrapperLine>
      </section>
      <section>
        <AgGrid
          resvRef={gridRef}
          resvRowData={rowData}
          resvDefaultColDef={prCreateColDef}
          resvColumnDefs={prCreateColFields}
          onRowDataChanged={onRowDataChanged}
        />
      </section>
      <section>
        <TimeLine title={"물품 요청 및 납기"} trackData={trackData}/>
      </section>
    </StyledRoot>
  );
}

export default PoRegist;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(20.7rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(10) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(10) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(13) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(17) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(21) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 20):nth-child(-n + 22) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const ButtonWrapperLine = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  // align-items: flex-end;
  align-items: baseline;
`;

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  font-family: "Pretendard-SemiBold";
`;

const Label = styled.label`
  font-size: 1.6rem;
  text-align: center;
  margin-right: 1rem;
`;