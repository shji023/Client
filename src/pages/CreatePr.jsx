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
} from "stores/colData";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import InputSelectGrid from "components/common/InputSelectGrid";
import InputInfoGrid from "components/common/InputInfoGrid";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { getBuyerList, getItemList, getStaffList } from "apis/public.api";
import InputOneDateGrid from "components/common/InputOneDateGrid";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import { getNumberFormat, reload } from "hooks/CommonFunction";

function selectPrList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const testData = [  
    {
      buyer_id: 26833,
      buyer_name: "김성웅",
      category: "Q.Electrical & Electron...",
      category_id: 19103,
      charge_account: "110-328-279900",
      cnt: 50,
      cnt_dept: 50,
      description: "Circuit Breaker ELCB,[EBN103C/LS] OR[HGE100E/HYUNDAI ELECTRIC],AC 220/460V,100A,18kA,3P,100AF,30mA,100/200/500MA",
      destination_type: "EXPENSE",
      dist_num: 1,
      id: 1,
      item: "Q1051234",
      item_id: 242339,
      line: 1,
      location: "POSCO 포항",
      need_to_date: "2022-08-30",
      note_to_buyer: "바이어에게 남길 메세지",
      organization: "PM",
      query_type: "update",
      requester_id: 3228,
      requester_name: "이윤성",
      requisition_line_id: 0,
      tax_code: "P영세율매입",
      total_amount: 0,
      unit_price: 20000,
      uom: "each",
      warehouse: "물류 창고",
    },
    {
      buyer_id: 42181,
      buyer_name: "김재환",
      category: "Q.Flexible Hose...",
      category_id: 19118,
      charge_account: "110-328-279900",
      cnt: "60",
      cnt_dept: "60",
      description: "Flexible Hose 2\"x1000L,140kg/cm2,1NON-AS + 1W/B,SAE100R12,*SAFETY MANAGEMENT",
      destination_type: "EXPENSE",
      dist_num: 1,
      id: 2,
      item: "Q1303957",
      item_id: 312691,
      line: 2,
      location: "POSCO 포항",
      need_to_date: "2022-08-30",
      note_to_buyer: "바이어에게 남길 메세지",
      organization: "PM",
      query_type: "insert",
      requester_id: 3451,
      requester_name: "임지연",
      requisition_line_id: 0,
      tax_code: "P영세율매입",
      total_amount: 0,
      unit_price: "100000",
      uom: "meter",
      warehouse: "물류 창고",
    },
    {
      buyer_id: 339473,
      buyer_name: "이동욱",
      category: "Q.Water Pump...",
      category_id: 19389,
      charge_account: "110-328-279900",
      cnt: "70",
      cnt_dept: "70",
      description: "Vacuum Pump CENTRIFUGAL,[SP-VF50/SHINPOONG],15M3/HR,Head:25M,WITH MOTOR,OR EQUIVALENT",
      destination_type: "EXPENSE",
      dist_num: 1,
      id: 3,
      item: "Q1201045",
      item_id: 276887,
      line: 3,
      location: "POSCO 포항",
      need_to_date: "2022-08-30",
      note_to_buyer: "바이어에게 남길 메세지",
      organization: "PM",
      query_type: "insert",
      requester_id: 3630,
      requester_name: "장정우",
      requisition_line_id: 0,
      tax_code: "P영세율매입",
      total_amount: 0,
      unit_price: 20000,
      uom: "set",
      warehouse: "물류 창고",
    },
    {
      buyer_id: 339473,
      buyer_name: "이동욱",
      category: "Q.Tool...",
      category_id: 19383,
      charge_account: "110-328-279900",
      cnt: "40",
      cnt_dept: "40",
      description: "Jack HYDRAULIC,30ton,71Hx117Dx58H,13ST,[RSM-300/ENERPAC] OR[RLS300/POWER TEAM],STEEL,FOR 1PCM WRINGER ROLL CHANGE CAR",
      destination_type: "EXPENSE",
      dist_num: 1,
      id: 4,
      item: "Q1105797",
      item_id: 344131,
      line: 4,
      location: "POSCO 포항",
      need_to_date: "2022-08-30",
      note_to_buyer: "바이어에게 남길 메세지",
      organization: "PM",
      query_type: "insert",
      requester_id: 3821,
      requester_name: "현지영",
      requisition_line_id: 0,
      tax_code: "P영세율매입",
      total_amount: 0,
      unit_price: "30000",
      uom: "set",
      warehouse: "물류 창고",
    }
    
  ];
  const [rowData, setRowData] = useState([...testData]);
  const [deletedIdList, setDeletedIdList] = useState([]);

  const [disabled, setDisabled] = useState(true);

  const [conditions, setConditions] = useState({
    req_num: id, // requisition_number : pr 번호
    preparer_name: "이동현", // preparer_name : Preparer
    preparer_id: 1685, // preparer_id : Preparer
    auth_date: "", // date : PR 승인일
    description: "구매 신청 테스트", // PR명
    amount: 0, // 금액 (Line들의 amount 합)
    currency_code: "KRW", // currencyCode : 단위
    pur_pct_agm_rsn: "calculated", // pur_pct_agm_rsn : 수의사유
  });

  const [selectedIds, setSelectedIds] = useState([]);

  // 수의사유 Lov
  const [prReasonLov, setPrReasonLov] = useState([]);
  const [orgLov, setOrgLov] = useState([]);
  const [destLov, setDestLov] = useState([]);
  const [taxCodeLov, setTaxCodeLov] = useState([]);

  // Input 컴포넌트 onChange 이벤트
  const handleCondition = (key, value) => {
    const tempCondition = { ...conditions };
    tempCondition[key] = value;
    setConditions({ ...tempCondition });
  };

  // PR 저장 버튼 이벤트
  const onSaveContents = () => {
    confirm("구매 신청서 작성을 완료하시겠습니까?") ? saveContents() : null;
  };

  const saveContents = async () => {
    console.log("onSaveContents called!!!!!!!!!!!");
    console.log(conditions, rowData);

    // !: axios 비동기
    const data = await insertOnePr(conditions, rowData);
    if (data) {
      alert("구매 신청이 완료되었습니다.");
      const temp = conditions;
      temp.req_num = data;
      setConditions({ ...temp });
      navigate(`/createPr/${temp.req_num}`);
      reload();
    } else {
      alert("구매 신청이 실패했습니다.");
    }
  };

  const onUpdateContents = async () => {
    confirm("구매 신청서 수정을 완료하시겠습니까?") ? updateContent() : null;
  };

  const updateContent = async () => {
    console.log("onUpdateContents called");

    // console.log(conditions, rowData, deletedIdList);

    // !: axios 비동기
    const data = await updateOnePr(conditions, rowData, deletedIdList);
    if (data) {
      console.log(data);
      alert("구매 신청 수정이 완료되었습니다.");
      reload();
      // navigate(`/createPr/${data}`)
    } else {
      alert("구매 신청 수정이 실패했습니다.");
    }
  };

  // PR 삭제 버튼 이벤트
  const onDeleteContents = () => {
    confirm("삭제 시 해당 신청서를 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?")
      ? deleteContent()
      : null;
  };

  const deleteContent = async () => {
    console.log("onDeleteContents called");

    // !: axios 비동기
    const data = await deleteOnePr(conditions.req_num);
    if (data) {
      alert("구매 신청 삭제가 완료되었습니다.");
    } else {
      alert("구매 신청 삭제가 실패했습니다.");
    }
    navigate(`/createPr`);
  };

  // #region 그리드 관련 이벤트
  const gridRef = useRef();

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
      line: 1,
      item: "",
      item_id: 0,
      category: "",
      category_id: 0,
      description: "",
      uom: "",
      cnt: 0,
      unit_price: 0,
      total_amount: 0,
      tax_code: "",
      buyer_name: "",
      buyer_id: 0,
      note_to_buyer: "",
      requester_name: "",
      requester_id: 0,
      need_to_date: "",
      destination_type: "",
      organization: "",
      location: "",
      warehouse: "",
      dist_num: "1",
      cnt_dept: 0,
      charge_account: "",
      // * 사용될 DB 쿼리 종류
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
        // * id, query_type 새로 부여
        tempData.push({ ...node.data, id: id++, query_type: "insert" });
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
    const tempList = deletedIdList;
    selectedData.forEach((element) => {
      // * 기존 행인 경우에만 담는다.
      if (element.query_type === "update") tempList.push(element.requisition_line_id);
    });
    setDeletedIdList([...tempList]);

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
    temp[idx].uom = row.uom;
    // temp[idx].unit = row.unit;

    setRowData([...temp]);

    return temp[idx].item;
  };
  // #endregion Line 아이템 이벤트

  // #region Line 바이어 이벤트
  const onHandleSearchBuyer = async (searchWord) => {
    const resultList = await getBuyerList(searchWord);
    return resultList;
  };

  const onHandleOkBuyer = ({ selectedRows, idx }) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].buyer_id = row.buyer_id;
    temp[idx].buyer_name = row.buyer_name;

    setRowData([...temp]);

    return temp[idx].buyer_name;
  };

  const onHandleCancelBuyer = ({ idx }) => {
    const temp = rowData;
    temp[idx].buyer_id = "";
    temp[idx].buyer_name = "";

    setRowData([...temp]);

    return temp[idx].buyer_name;
  };
  // #endregion Line 바이어 이벤트

  // #region Line Requester 이벤트
  const onHandleSearchRequester = async (searchWord) => {
    const resultList = await getStaffList(searchWord);
    return resultList;
  };

  const onHandleOkRequester = ({ selectedRows, idx }) => {
    const row = selectedRows[0];

    const temp = rowData;
    console.log(row);
    temp[idx].requester_id = row.id;
    temp[idx].requester_name = row.name;

    setRowData([...temp]);

    return temp[idx].requester_name;
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
    { field: "line", headerName: "Line", maxWidth: 80, pinned: "left", editable: false },
    {
      field: "item",
      headerName: "Item",
      minWidth: 200,
      pinned: "left",
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
            gridOptions: {
              columnDefs: popUpItemColFields,
              rowSelection: "single",
              suppressRowClickSelection: false,
            },
          },
        };
      },
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 110,
      maxWidth: 120,
      pinned: "left",
      editable: false,
    },
    {
      field: "description",
      headerName: "사양",
      minWidth: 110,
      maxWidth: 120,
      pinned: "left",
      editable: false,
    },
    { field: "uom", headerName: "단위", minWidth: 110, editable: false },
    {
      field: "cnt",
      headerName: "수량",
      minWidth: 110,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
            type: "number",
          },
        };
      },
    },
    {
      field: "unit_price",
      headerName: "단가",
      minWidth: 110,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
            type: "number",
          },
        };
      },
    },
    {
      field: "total_amount",
      headerName: "금액",
      minWidth: 110,
      editable: false,
      valueGetter: (params) => getNumberFormat(params.data.cnt * params.data.unit_price),
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
            lov: taxCodeLov,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "buyer",
      headerName: "Buyer",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        const idx = params.node.rowIndex;
        const initValue = rowData[idx] ? rowData[idx].buyer_name : "";
        return {
          component: InputSearch,
          params: {
            idx: idx,
            title: "바이어 선택",
            initValue: initValue,
            onHandleSearch: onHandleSearchBuyer,
            onHandleOk: onHandleOkBuyer,
            onHandleCancel: onHandleCancelBuyer,
            gridOptions: {
              columnDefs: popUpBuyerColFields,
              rowSelection: "single",
              suppressRowClickSelection: false,
            },
          },
        };
      },
    },
    {
      field: "note_to_buyer",
      headerName: "Note to Buyer",
      minWidth: 300,
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
      field: "requester",
      headerName: "Requester",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        const idx = params.node.rowIndex;
        const initValue = rowData[idx] ? rowData[idx].requester_name : "";
        return {
          component: InputSearch,
          params: {
            idx: idx,
            title: "직원 선택",
            initValue: initValue,
            onHandleSearch: onHandleSearchRequester,
            onHandleOk: onHandleOkRequester,
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
      field: "need_to_date",
      headerName: "요청납기일",
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
      field: "destination_type",
      headerName: "Destination Type",
      minWidth: 200,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: destLov,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "organization",
      headerName: "Organization",
      minWidth: 300,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputSelectGrid,
          params: {
            params: params,
            lov: orgLov,
            stateValue: rowData,
            setStateValue: setRowData,
          },
        };
      },
    },
    {
      field: "location",
      headerName: "Location",
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
      field: "warehouse",
      headerName: "창고",
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
      field: "cnt_dept",
      headerName: "수량",
      minWidth: 110,
      editable: false,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: rowData,
            setStateValue: setRowData,
            type: "number",
          },
        };
      },
    },
    { field: "dist_num", headerName: "Dist Num", minWidth: 120, editable: false },
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
    getPrInit();
  }, []);

  useEffect(() => {
    // * 헤더 총 금액 계산
    const tempConditions = conditions;
    const tempRowData = rowData;
    let total = 0;
    tempRowData.forEach((element) => {
      total += element.cnt * element.unit_price;
    });
    tempConditions.amount = total;
    setConditions({ ...tempConditions });
  }, [rowData]);

  const getLov = async () => {
    const resvReasonLov = await getPrReasonLov();
    const resvOrgLov = await getOrgLov();
    const resvDestLov = await getDestLov();
    const resvTaxCodeLov = await getTaxCodeLov();

    resvReasonLov && setPrReasonLov([...resvReasonLov]);
    resvOrgLov && setOrgLov([...resvOrgLov]);
    resvDestLov && setDestLov([...resvDestLov]);
    resvTaxCodeLov && setTaxCodeLov([...resvTaxCodeLov]);
  };

  const getPrInit = async () => {
    // PR 수정 페이지
    if (id) {
      const data = await getPr(id);
      console.log("resvData : ", data);

      // RFQ가 생성되지 않은 경우 활성화.
      if(!data.pr1.rfq_no) {
        setDisabled(false);
      }

      setConditions({ ...data.pr1 });
      setRowData([...data.pr2]);

    } 
    // PR 생성 페이지
    else {
      setDisabled(false);
    }
  } 

  // #region 팝업 이벤트
  const onHandleSearch = async (searchWord) => {
    const resultList = await getStaffList(searchWord);
    return resultList;
  };

  const onHandleOk = ({ selectedRows }) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    console.log(row);

    const temp = conditions;
    temp.preparer_id = row.id;
    temp.preparer_name = row.name;
    setConditions({ ...temp });

    return temp.preparer_name;
  };

  const onHandleCancel = () => {
    console.log("called onHandleCancel");

    const temp = conditions;
    temp.preparer_id = "";
    temp.preparer_name = "";
    setConditions({ ...temp });

    return temp.preparer_name;
  };
  // #endregion 팝업 이벤트

  const ButtonSelector = () => {
    if (id && !disabled) {
      return (
        <section>
          <Button onClick={onUpdateContents}>저장</Button>
          <Button onClick={onDeleteContents}>삭제</Button>
        </section>
      );
    } else if(id && disabled) {
      return <></>;
    } else {
      // 수정
      return <Button onClick={onSaveContents}>저장</Button>;
    }
  };

  const GridButtonSelector = () => {
    if (!disabled) {
      return (
        <ButtonWrapperLine>
          <Button onClick={onInsertOne}>Line 추가</Button>
          <Button onClick={onCopySelected}>행 복사</Button>
          <Button onClick={deleteRow}>행 삭제</Button>
        </ButtonWrapperLine>
      );
    } 
  };

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>구매신청등록</Title>
          <ButtonSelector />
        </HeaderWrapper>
        <InputContainer>
          {/* TODO: disabled */}
          <InputInfo
            id="req_num"
            inputLabel="PR 번호"
            handlePoCondition={handleCondition}
            inputValue={conditions.req_num}
            disabled={true}
          />
          {/* TODO: disabled */}
          <InputSearch
            id="preparer_name"
            title="직원선택"
            inputLabel="Preparer"
            initValue={conditions.preparer_name}
            onHandleSearch={onHandleSearch}
            onHandleOk={onHandleOk}
            onHandleCancel={onHandleCancel}
            gridOptions={{
              columnDefs: popUpStaffColFields,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputInfo
            id="auth_date"
            inputLabel="PR 승인일"
            handlePoCondition={handleCondition}
            inputValue={conditions.auth_date}
            disabled={true}
          />
          <InputInfo
            id="description"
            inputLabel="PR 명"
            handlePoCondition={handleCondition}
            inputValue={conditions.description}
          />
          {/* TODO: disabled */}
          <InputInfo
            id="amount"
            inputLabel="금액"
            handlePoCondition={handleCondition}
            inputValue={getNumberFormat(conditions.amount)}
            disabled={true}
          />
          {/* TODO: key value 따로 할 수 있게 */}
          <InputSelect
            id="pur_pct_agm_rsn"
            inputLabel="수의사유"
            initValue={conditions.pur_pct_agm_rsn}
            handlePoCondition={handleCondition}
            lov={prReasonLov}
            disabled={disabled}
          />
        </InputContainer>
      </section>
      <section>
        <GridButtonSelector/>
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
    </StyledRoot>
  );
}

export default selectPrList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(27rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(3) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(6) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 4):nth-child(-n + 6) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const ButtonWrapperLine = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  font-family: "Pretendard-SemiBold";
`;
