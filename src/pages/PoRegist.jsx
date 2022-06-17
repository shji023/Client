import { getPrReasonLov, insertOnePr, deleteOnePr, getOrgLov, getDestLov, getTaxCodeLov, updateOnePr, getPr, } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import { prCreateColDef, popUpStaffColFields, popUpBuyerColFields, popUpItemColFields, popUpVendorColFields } from "stores/colData";
import InputInfo from "components/po/PoInputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import InputSelectGrid from "components/common/InputSelectGrid";
import InputInfoGrid from "components/common/InputInfoGrid";
import InputOneDateGrid from "components/common/InputOneDateGrid";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { getBuyerList, getItemList, getStaffList } from "apis/public.api";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import InputOneDate from "components/common/InputOneDate";
import { getPoRegistLov, getPoSearch } from "apis/po.api";


function PoRegist() {
  const { id } = useParams();
  const navigate = useNavigate();

  const testData = [
    {
      closed_code : "",
      line : "",
      item : "",
      category : "",
      description : "",
      uom : "",
      quantity : "",
      unit_price : "",
      total_amount : "",
      shipment : "",
      ship_quantity : "",
      total_amount : "",
      need_by_date : "",
      promised_date : "",
      organization : "",
      tax_code : "",
      match_option : "",
      over_receipt_tol : "",
      action : "",
      quantity_recevied : "",
      quantity_accepted : "",
      quantity_rejected : "",
      quantity_billed : "",
      quantity_cancelled : "",
      distribution : "",
      requisition : "",
      req_line : "",
      requester : "",
      deliver_to_location : "",
      subinventory : "",
      charge_account : "",
    },
    {
      closed_code : "",
      line : "",
      item : "",
      category : "",
      description : "",
      uom : "",
      quantity : "",
      unit_price : "",
      total_amount : "",
      shipment : "",
      ship_quantity : "",
      total_amount : "",
      need_by_date : "",
      promised_date : "",
      organization : "",
      tax_code : "",
      match_option : "",
      over_receipt_tol : "",
      action : "",
      quantity_recevied : "",
      quantity_accepted : "",
      quantity_rejected : "",
      quantity_billed : "",
      quantity_cancelled : "",
      distribution : "",
      requisition : "",
      req_line : "",
      requester : "",
      deliver_to_location : "",
      subinventory : "",
      charge_account : "",
    },
    {
      closed_code : "",
      line : "",
      item : "",
      category : "",
      description : "",
      uom : "",
      quantity : "",
      unit_price : "",
      total_amount : "",
      shipment : "",
      ship_quantity : "",
      total_amount : "",
      need_by_date : "",
      promised_date : "",
      organization : "",
      tax_code : "",
      match_option : "",
      over_receipt_tol : "",
      action : "",
      quantity_recevied : "",
      quantity_accepted : "",
      quantity_rejected : "",
      quantity_billed : "",
      quantity_cancelled : "",
      distribution : "",
      requisition : "",
      req_line : "",
      requester : "",
      deliver_to_location : "",
      subinventory : "",
      charge_account : "",
    },
  ];
  const [rowData, setRowData] = useState([...testData]);

  const [conditions, setConditions] = useState({
    // lov
    attributeCategory : "",
    fobLookupCodeLov : "",
    termsIdLov : "",
    bidMethodTypeLov : "",
    invoiceTypeLov : "",
    replyMethodLookupCode1Lov : "",
    controlConfirmFlagLov : "",
    organizationLov : "",
    taxCodeLov : "",
    matchOptionLov : "",
    actionLov : "",
    
    // input
    po_num : "",
    revision_num : "",
    type_lookup_code : "",
    attribute_category : "",
    comments : "",
    vendor_id : "",
    buyer_id : "",
    approved_date : "",
    authorization_status : "",
    contract_date : "",
    acceptance_due_date : "",
    fob_lookup_code : "",
    terms_id : "10010",
    blanket_total_amount : "",
    currency_code : "",
    bid_method_type : "",
    invoice_type : "",
    reply_method_lookup_code1 : "",
    note_to_vendor : "",
    note_to_receiver : "",
    control_confirm_flag : "",
  });

  const [selectedIds, setSelectedIds] = useState([]);

  // 수의사유 Lov
  const [prReasonLov, setPrReasonLov] = useState([]);
  const [orgLov, setOrgLov] = useState([]);
  const [destLov, setDestLov] = useState([]);


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

  const gridRef = useRef();

  // Input 컴포넌트 onChange 이벤트
  const handleCondition = (key, value) => {
    const tempCondition = { ...conditions };
    tempCondition[key] = value;
    setConditions({ ...tempCondition });
  };

  // PR 저장 버튼 이벤트
  const onSaveContents = () => {
    confirm(
      "구매 신청서 작성을 완료하시겠습니까?"
    ) ? saveContents() : null;
  }

  const saveContents = async () => {
    console.log("onSaveContents called!!!!!!!!!!!");

    // !: axios 비동기
    const data = await insertOnePr(conditions, rowData);
    if(data){
      alert("구매 신청이 완료되었습니다.");
      const temp = conditions;
      temp.req_num = data;
      setConditions({...temp});
      navigate(`/createPr/${temp.req_num}`)
      
    } else {
      alert("구매 신청이 실패했습니다.");
    }
  };

  const onUpdateContents = async () => {
    confirm(
      "구매 신청서 수정을 완료하시겠습니까?"
      ) ? updateContent() : null;
  }

  const updateContent = async () => {
    console.log("onUpdateContents called");

    // !: axios 비동기
    const data = await updateOnePr(conditions, rowData);
    if(data.res){
      alert("구매 신청 수정이 완료되었습니다.");
    } else {
      alert("구매 신청 수정이 실패했습니다.");
    }
  }
  
  // PR 삭제 버튼 이벤트
  const onDeleteContents = () => {
    confirm(
      "삭제 시 해당 신청서를 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?"
      ) ? deleteContent() : null;
  }
  
  const deleteContent = async () => {
    console.log("onDeleteContents called");

    // !: axios 비동기
    // const data = await deleteOnePr(conditions.req_num);
    if(data.res){
      alert("구매 신청 삭제가 완료되었습니다.");
    } else {
      alert("구매 신청 삭제가 실패했습니다.");
    }
    navigate(`/createPr`);
  }

  // #region 그리드 관련 이벤트
  // 그리드 행 추가
  // TODO: 체크항목 유지하기
  const onInsertOne = useCallback( ()=>{
    console.log("onInsertOne called!")
    
    const newRecord = createOneRecord();
    const records = [ ...rowData, newRecord];
    setRowData(records);
  } )
  const createOneRecord = () => {
    return {
      
    }
  }
  

  // 그리드 행 복사
  const onCopySelected = useCallback( ()=>{
    copyRow();

  })
  const copyRow = () => {
    console.log("copyRow called" );
    let id = 1;
    const tempData = [];
    const ids = [];

    gridRef.current.api.forEachNode(function (node) {
      tempData.push({...node.data, id: id++});
      if(node.isSelected()){
        ids.push(id-1);
        tempData.push({...node.data, id: id++});
      }
    });

    setRowData([...tempData]);
    setSelectedIds([...ids]);
  }
  

  // 그리드 행 삭제
  const deleteRow = useCallback( () => {
    console.log("deleteRow called" );

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    if(selectedRowNodes.length === 0) return;

    const selectedIds = selectedRowNodes.map( rowNode => rowNode.data.id );
    const filteredData = rowData.filter( dataItem => selectedIds.indexOf(dataItem.id) < 0 );
    setRowData([...filteredData]);
    setSelectedIds([]);
  } );

  // 그리드 체크항목 유지
  const onRowDataChanged = () => {
    // console.log("row changed!!", selectedIds);

    gridRef.current.api.forEachNode( 
      node => selectedIds.includes(node.data.id) && node.setSelected(true)
    )
  }
// #endregion 그리드 관련 이벤트

// #region Line 아이템 이벤트
  const onHandleSearchItem = async (searchWord) => {
    const resultList = await getItemList(searchWord);
    return resultList;
  }

  const onHandleOkItem = ({selectedRows, idx}) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].item_id = row.item_id;
    temp[idx].item_name = row.item;
    temp[idx].category = row.category;
    temp[idx].category_id = row.category_id;
    temp[idx].description = row.description;
    temp[idx].uom = row.uom;
    // temp[idx].unit = row.unit;

    setRowData([...temp]);
    
    return temp[idx].item_name;
  }
  // #endregion Line 아이템 이벤트

  
// #region Line 바이어 이벤트
  const onHandleSearchBuyer = async (searchWord) => {
    const resultList = await getBuyerList(searchWord);
    return resultList;
  }

  const onHandleOkBuyer = ({selectedRows, idx}) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].buyer_id = row.buyer_id;
    temp[idx].buyer_name = row.buyer_name;

    setRowData([...temp]);
    
    return temp[idx].buyer_name;
  }
  // #endregion Line 바이어 이벤트

// #region Line Requester 이벤트
  const onHandleSearchRequester = async (searchWord) => {
    const resultList = await getStaffList(searchWord);
    return resultList;
  }

  const onHandleOkRequester = ({selectedRows, idx}) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].requester_id = row.id;
    temp[idx].requester_name = row.name;

    setRowData([...temp]);
    
    return temp[idx].requester_name;
  }
  // #endregion Line Requester 이벤트


  // 그리드 컬럼
  const prCreateColFields = ([
    { field: null,                headerCheckboxSelection: true, maxWidth: 50, pinned:"left", checkboxSelection: true,},
    { field: "closed_code",              headerName:"상태",               maxWidth: 100, pinned:"left", editable: false,},
    { field: "line",              headerName:"Line",               maxWidth: 80, pinned:"left", editable: false,},
    { field: "item",              headerName:"Item",               minWidth: 150,  editable: false,
      cellRendererSelector : params => {
        const idx = params.node.rowIndex;
        const initValue = rowData[idx] ? rowData[idx].item_name : "";
        return {
          component: InputSearch,
          params : {
            idx: idx,
            title : "아이템 선택",
            initValue : initValue,
            onHandleSearch : onHandleSearchItem,
            onHandleOk : onHandleOkItem,
            gridOptions: {
              columnDefs : popUpItemColFields,
              rowSelection : "single",
              suppressRowClickSelection : false,
            },
          }
        }
      }
    },
    { field: "category",          headerName:"Category",           minWidth:150, editable: false, },
    { field: "description",       headerName:"사양",               minWidth:400, editable: false, },
    { field: "uom",              headerName:"단위",               minWidth:80, editable: false, },
    { field: "quantity",               headerName:"수량",               minWidth:100, editable: false,
      cellRendererSelector : params => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "unit_price",        headerName:"단가",               minWidth:100, editable: false,
      cellRendererSelector : params => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "total_amount",      headerName:"금액",               minWidth:100, editable: false,
      valueGetter: params => params.data.quantity * params.data.unit_price
    },
    { field: "shipment",          headerName:"shipment",           minWidth:80, editable: false, },
    { field: "ship_quantity",               headerName:"수량",               minWidth:100, editable: false,
      cellRendererSelector : params => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "total_amount",      headerName:"금액",               minWidth:100, editable: false,
      valueGetter: params => params.data.quantity * params.data.unit_price
    },
    { field: "need_by_date",      headerName:"Need By Date",         minWidth:150, editable: false, 
    cellRendererSelector : params => {
      return {
        component: InputOneDateGrid,
        params: {
          params: params,
          stateValue: rowData,
          setStateValue: setRowData,
        }
    }}
  },
  { field: "promised_date",      headerName:"Promised Date",         minWidth:150, editable: false, 
  cellRendererSelector : params => {
    return {
      component: InputOneDateGrid,
      params: {
        params: params,
        stateValue: rowData,
        setStateValue: setRowData,
      }
  }}
},
{ field: "organization",      headerName:"Organization",       minWidth:200, editable: false, 
      cellRendererSelector : params => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: organizationLov,
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "tax_code",          headerName:"Tax Code",           minWidth:180, editable: false, 
      cellRendererSelector : params => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: taxCodeLov, // TODO : 바꾸기
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "match_option",          headerName:"Match Option",           minWidth:180, editable: false, 
      cellRendererSelector : params => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: matchOptionLov, // TODO : 바꾸기
            stateValue: rowData,
            setStateValue: setRowData,
          }
      }}
    },
    { field: "over_receipt_tol",               headerName:"Over Receipt Tolerance",               minWidth:110, editable: false,
    cellRendererSelector : params => {
      return {
        component: InputInfoGrid,
        params: {
          params: params,
          stateValue: rowData,
          setStateValue: setRowData,
        }
    }}
  },
  { field: "action",          headerName:"action",           minWidth:180, editable: false, 
  cellRendererSelector : params => {
    return {
      component: InputSelectGrid,
      params: {
        params: params,
        lov: actionLov, // TODO : 바꾸기
        stateValue: rowData,
        setStateValue: setRowData,
      }
  }}
},
{ field: "quantity_recevied",          headerName:"Quantity Recevied",           minWidth:180, editable: false, },
{ field: "quantity_accepted",          headerName:"Quantity Accepted",           minWidth:180, editable: false, },
{ field: "quantity_rejected",          headerName:"Quantity Rejected",           minWidth:180, editable: false, },
{ field: "quantity_billed",          headerName:"Quantity Billed",           minWidth:180, editable: false, },
{ field: "quantity_cancelled",          headerName:"Quantity Cancelled",           minWidth:180, editable: false, },
{ field: "distribution",          headerName:"Distribution",           minWidth:180, editable: false, 
  valueGetter: params => 1
},
{ field: "requisition",          headerName:"Requisition",           minWidth:180, editable: false, },
{ field: "req_line",          headerName:"Req Line",           minWidth:180, editable: false, 
  valueGetter: params => 1
},
{ field: "requester",         headerName:"Requester",          minWidth:200, editable: false, 
cellRendererSelector : params => {
  const idx = params.node.rowIndex;
  const initValue = rowData[idx] ? rowData[idx].requester_name : "";
  return {
    component: InputSearch,
    params : {
      idx: idx,
      title : "직원 선택",
      initValue : initValue,
      onHandleSearch : onHandleSearchRequester,
      onHandleOk : onHandleOkRequester,
      gridOptions: {
        columnDefs : popUpStaffColFields,
        rowSelection : "single",
        suppressRowClickSelection : false,
      },
    }
  }
}  
},
{ field: "deliver_to_location",          headerName:"Deliver To Location",           minWidth:200, editable: false, 
cellRendererSelector : params => {
  return {
    component: InputInfoGrid,
    params: {
      params: params,
      stateValue: rowData,
      setStateValue: setRowData,
    }
}}
},
{ field: "subinventory",         headerName:"Subinventory",               minWidth:150, editable: false, 
cellRendererSelector : params => {
  return {
    component: InputInfoGrid,
    params: {
      params: params,
      stateValue: rowData,
      setStateValue: setRowData,
    }
}}
},
{ field: "charge_account",    headerName:"Charge Account",     minWidth:250, editable: false, 
cellRendererSelector : params => {
  return {
    component: InputInfoGrid,
    params: {
      params: params,
      stateValue: rowData,
      setStateValue: setRowData,
    }
}}
},
    ]);


  // Init Page
  useEffect(() => {
    getLov();
    getPoInit();
  }, []);

  useEffect(() => {
    // * 헤더 총 금액 계산
    const tempConditions = conditions;
    const tempRowData = rowData;
    let total = 0;
    tempRowData.forEach(element => {
      total += element.cnt * element.unit_price;
    });
    tempConditions.amount = total;
    setConditions({...tempConditions});

  }, [rowData])

  const getLov = async () => {
    // TODO : cd_v 넣기
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
    if( id ) {
      console.log("id : ", id);
      // TODO : axios로 불러온다.
      // const data = ...
      const data = await getPoSearch(id);

      // * Header 데이터 정리
      const temp_conditions = {
        po_num : data[0].po_num,
        revision_num : data[0].revision_num,
        type_lookup_code : data[0].type_lookup_code,
        attribute_category : data[0].attribute_category,
        comments : data[0].comments,
        vendor_id : data[0].vendor_id,
        buyer_id : data[0].buyer_id,
        approved_date : data[0].approved_date,
        authorization_status : data[0].authorization_status,
        contract_date : data[0].contract_date,
        acceptance_due_date : data[0].acceptance_due_date,
        fob_lookup_code : data[0].fob_lookup_code,
        terms_id : "10010",
        // terms_id : data[0].terms_id,
        blanket_total_amount : data[0].blanket_total_amount,
        currency_code : data[0].currency_code,
        bid_method_type : data[0].bid_method_type,
        invoice_type : data[0].invoice_type,
        reply_method_lookup_code1 : data[0].reply_method_lookup_code1,
        note_to_vendor : data[0].note_to_vendor,
        note_to_receiver : data[0].note_to_receiver,
        control_confirm_flag : data[0].control_confirm_flag,
      }
      console.log("temp:", temp_conditions);
      setConditions({...conditions, ...temp_conditions});

      // Line 데이터 정리
      const temp_lines = []
      data.forEach(( element )=>{
        
        let temp_line = {
          closed_code : element.closed_code,
          line : element.po_line_num,
          item : element.item_id,
          category : element.category_id,
          description : element.item_description,
          uom : element.unit_meas_lookup_code,
          quantity : element.mat_bpa_agree_qt,
          unit_price : element.unit_price,
          total_amount : element.contract_amount,
          shipment : 1, //po_shipment_num,
          ship_quantity : element.quantity,
          total_amount : element.amount,
          need_by_date : element.need_by_date,
          promised_date : element.promised_date,
          organization : element.ship_to_organization_id,
          tax_code : element.tax_code,
          match_option : element.inspection_required_flag,
          over_receipt_tol : element.qty_rcv_tolerance,
          action : element.qty_rcv_exception_code,
          quantity_recevied : element.quantity_received,
          quantity_accepted : element.quantity_accepted,
          quantity_rejected : element.quantity_rejected,
          quantity_billed : element.quantity_billed,
          quantity_cancelled : element.quantity_cancelled,
          distribution : 1,
          requisition : element.req_distribution_id,
          req_line : 1,
          requester : element.request_person_id,
          deliver_to_location : element.deliver_to_location_id,
          subinventory : element.destination_subinventory,
          charge_account : element.account_nm,
        }
        temp_lines.push(temp_line);
      })
      
      setRowData([...temp_lines]);

      console.log("condididi ::: ", conditions);

      // TODO : 불러온 데이터를 state에 넣어준다.
      // setState([...]);

    }
  }

  // #region 팝업 이벤트
  const onHandleSearch = async (value) => {
    
    // const resultList = await getStaffList(sendData);
    const resultList = await getStaffList(value);
    setPopUpPreparerRowData([...resultList]);
    return resultList;
  }

  const onHandleOk = ({selectedRows}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = conditions;
    temp.preparer_id = row.id;
    temp.preparer_name = row.name;
    setConditions(temp);
    
    return temp.preparer_name;

  }
  // #endregion 팝업 이벤트

  const ButtonSelector = () => {
    if(id) {
        // 수정 페이지
      return <>
        <Button onClick={onUpdateContents}>저장</Button>
        <Button onClick={onDeleteContents}>삭제</Button>
      </>

    } else {
      // 생성 페이지
      return <Button onClick={onSaveContents}>저장</Button>     
    }
  }

  

  return (
    <StyledRoot>
      <Title>구매계약</Title>
      <section>
        <ButtonWrapper>
          <ButtonSelector />
        </ButtonWrapper>
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
          />
          <InputSelect
            id="attribute_category"
            inputLabel="계약구분"
            initValue={conditions.attribute_category}
            handlePoCondition={handleCondition}
            lov={attributeCategory}
          />
          <InputInfo
            id="comments"
            inputLabel="계약명"
            handlePoCondition={handleCondition}
            inputValue={conditions.comments}
            
          />
          <InputInfo
            id="vendor_id"
            inputLabel="공급사"
            handlePoCondition={handleCondition}
            inputValue={conditions.vendor_id}
            disabled={true}
          />
          <InputSearch
            id="VENDOR_NAME"
            title="공급사 선택"
            initValue={conditions.VENDOR_NAME}
            onHandleSearch={onHandleSearch}
            onHandleOk={onHandleOk}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpVendorColFields,
              rowData : popUpPreparerRowData,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputSearch
            id="BUYER_NAME"
            title="바이어 선택"
            inputLabel="Preparer"
            initValue={conditions.BUYER_NAME}
            onHandleSearch={onHandleSearch}
            onHandleOk={onHandleOk}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpBuyerColFields,
              rowData : popUpPreparerRowData,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
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
            handleCondition={handleCondition}
          />
          <InputInfo
            id="acceptance_due_date"
            inputLabel="PO 수용일"
            handlePoCondition={handleCondition}
            inputValue={conditions.acceptance_due_date}
            disabled={true}
          />
          <InputSelect
            id="fob_lookup_code"
            inputLabel="인도조건"
            initValue={conditions.fob_lookup_code}
            handlePoCondition={handleCondition}
            lov={fobLookupCodeLov}
          />
          <InputSelect
            id="terms_id"
            inputLabel="지불조건"
            initValue={conditions.terms_id}
            handlePoCondition={handleCondition}
            lov={termsIdLov}
          />
          <InputInfo
            id="blanket_total_amount"
            inputLabel="공급가액"
            handlePoCondition={handleCondition}
            inputValue={conditions.blanket_total_amount}
            disabled={true}
          />
          <InputInfo
            id="currency_code"
            handlePoCondition={handleCondition}
            inputValue={conditions.currency_code}
            disabled={true}
          />
          <InputSelect
            id="bid_method_type"
            inputLabel="낙찰유형"
            initValue={conditions.bid_method_type}
            handlePoCondition={handleCondition}
            lov={bidMethodTypeLov}
          />
          <InputSelect
            id="invoice_type"
            inputLabel="Pay on"
            initValue={conditions.invoice_type}
            handlePoCondition={handleCondition}
            lov={invoiceTypeLov}
          />
          <InputSelect
            id="reply_method_lookup_code1"
            inputLabel="구매방법"
            initValue={conditions.reply_method_lookup_code1}
            handlePoCondition={handleCondition}
            lov={replyMethodLookupCode1Lov}
          />
          <InputInfo
            id="note_to_vendor"
            inputLabel="Note to Supplier"
            handlePoCondition={handleCondition}
            inputValue={conditions.note_to_vendor}
            disabled={true}
          />
          <InputInfo
            id="note_to_receiver"
            inputLabel="Note to Receiver"
            handlePoCondition={handleCondition}
            inputValue={conditions.note_to_receiver}
            disabled={true}
          />
          <InputSelect
            id="control_confirm_flag"
            inputLabel="계약수용방법"
            initValue={conditions.control_confirm_flag}
            handlePoCondition={handleCondition}
            lov={controlConfirmFlagLov}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapper>
          {/* <Button onClick={handleAddRow}>Line 추가</Button> */}
          <Button onClick = { onInsertOne }>Line 추가</Button>
          <Button onClick = { onCopySelected }>행 복사</Button>
          <Button onClick = { deleteRow }>행 삭제</Button>
        </ButtonWrapper>
      </section>
      <section>
        <AgGrid 
          resvRef           = { gridRef }
          resvRowData       = { rowData }
          resvDefaultColDef = { prCreateColDef }
          resvColumnDefs    = { prCreateColFields }
          onRowDataChanged  = { onRowDataChanged }
        />
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
// const InputContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   border: 1px solid rgb(225 225 225 / 87%);
//   border-radius: 0.5rem;
//   padding: 2rem 0.5rem;
//   gap: 1rem;
// `;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
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
  // & > div:nth-child(n+11):nth-child(-n+14){
  //   border-bottom: 1px solid ${colors.tableLineGray};
  // }
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