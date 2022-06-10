import { getPrReasonLov, insertOnePr, deleteOnePr, } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
// import DataGridPrLine from "components/common/DataGridPrLine";
import { prCreateColDef, popUpStaffColFields, popUpBuyerColFields } from "stores/colData";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import InputInfoGrid from "components/common/InputInfoGrid";
import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { getStaffList } from "apis/public.api";

function selectPrList() {

  const [conditions, setConditions] = useState({
      req_num       : "",          // requisition_number : pr 번호
      preparer_name : "",    // preparer_name : Preparer
      preparer_id   : 0,      // preparer_id : Preparer
      auth_date     : "",          // date : PR 승인일
      description   : "PR 테스트", // PR명
      amount        : 0,           // 금액 (Line들의 amount 합)
      currency_code : "KRW",       // currencyCode : 단위
      reason        : "none",      // reason : 수의사유
  })

  const [selectedIds, setSelectedIds] = useState([]);  

  let testData = [
    {
      line: 1, 
      item: "Q2065363",
      item_id: 333333,
      category: "Q.Burnt Chaff_B", 
      category_id: 555555, 
      spec: "Thermal Insulation 1400...", 
      unit: "kilogram", 
      cnt: 100000, 
      unit_price: 1000,
      total_amount: 0,
      tax_code: "P매입세공제",
      buyer: "김서정1",
      buyer_id: 17278,
      note_to_buyer: "note_to_buyer",
      requester: "조학식",
      requester_id: 121212,
      need_to_date: "2022-06-30",
      destination_type: "EXPENSE",
      organization: "POSCO 포항자재/외주...",
      location: "PEA000Q",
      warehouse: "QEJ01",
      dist_num: "1",
      charge_account: "01-PEO31-602021-00001",
    },
    {
      line: 1, 
      item: "Q2065363", 
      item_id: 333333,
      category: "Q.Burnt Chaff_B", 
      category_id: 555555, 
      spec: "Thermal Insulation 1400...", 
      unit: "kilogram", 
      cnt: 100000, 
      unit_price: 1000,
      total_amount: 0,
      tax_code: "P매입세공제",
      buyer: "김서정2",
      buyer_id: 17278,
      note_to_buyer: "note_to_buyer",
      requester: "조학식",
      requester_id: 121212,
      need_to_date: "2022-06-30",
      destination_type: "EXPENSE",
      organization: "POSCO 포항자재/외주...",
      location: "PEA000Q",
      warehouse: "QEJ01",
      dist_num: "1",
      charge_account: "01-PEO31-602021-00001",
    },
    {
      line: 1, 
      item: "Q2065363", 
      item_id: 333333,
      category: "Q.Burnt Chaff_B", 
      category_id: 555555, 
      spec: "Thermal Insulation 1400...", 
      unit: "kilogram", 
      cnt: 100000, 
      unit_price: 1000,
      total_amount: 0,
      tax_code: "P매입세공제",
      buyer: "김서정3",
      buyer_id: 17278,
      note_to_buyer: "note_to_buyer",
      requester: "조학식",
      requester_id: 121212,
      need_to_date: "2022-06-30",
      destination_type: "EXPENSE",
      organization: "POSCO 포항자재/외주...",
      location: "PEA000Q",
      warehouse: "QEJ01",
      dist_num: "1",
      charge_account: "01-PEO31-602021-00001",
    },
  ]
  const [rowData, setRowData] = useState(testData);
  const [preparerRowData, setPreparerRowData] = useState([])

  const [prReasonLov, setPrReasonLov] = useState([]);

  const gridRef = useRef();


  const handleCondition = (key, value) => {
    const tempCondition = { ...conditions };
    tempCondition[key] = value;
    setConditions({ ...tempCondition });
  };

  // Axios Save and Update
  const onSaveContents = () => {
    confirm(
      "구매 신청서 작성을 완료하시겠습니까?"
    ) ? saveContents() : null;
  }

  const saveContents = async () => {
    console.log("onSaveContents called");

    // !: axios 비동기
    const data = await insertOnePr(conditions, rowData);
    if(data.res){
      alert("구매 신청이 완료되었습니다.");
    } else {
      alert("구매 신청이 실패했습니다.");
    }
  };

  
  // Delete Pr
  const onDeleteContents = () => {
    confirm(
      "삭제 시 해당 신청서를 되돌릴 수 없습니다.\n정말 삭제하시겠습니까?"
      ) ? deleteContent() : null;
  }
  // Axios Delete
  const deleteContent = async () => {
    console.log("onDeleteContents called");

    // !: axios 비동기
    const data = await deleteOnePr(conditions.req_num);
    if(data.res){
      alert("구매 신청 삭제가 완료되었습니다.");
    } else {
      alert("구매 신청 삭제가 실패했습니다.");
    }
  }

  // Create Row
  const onInsertOne = useCallback( ()=>{
    console.log("onInsertOne called!")
    
    const newRecord = createOneRecord();
    const records = [ ...rowData, newRecord];
    console.log(records);

    setRowData(records);
  } )
  const createOneRecord = () => {
    return {
      line: 1, 
      item: "Q2065363", 
      item_id: 444444,
      category: "Q.Burnt Chaff_B", 
      category_id: 666666, 
      spec: "Thermal Insulation 1400...", 
      unit: "kilogram", 
      cnt: 100000, 
      unit_price: 2000,
      total_amount: 0,
      tax_code: "P매입세공제",
      buyer: "김서정",
      buyer_id: 17278,
      note_to_buyer: "note_to_buyer",
      requester: "조학식",
      requester_id: 121212,
      need_to_date: "2022-06-30",
      destination_type: "EXPENSE",
      organization: "POSCO 포항자재/외주...",
      location: "PEA000Q",
      warehouse: "QEJ01",
      dist_num: "1",
      charge_account: "01-PEO31-602021-00001",
    }
  }
  

  // Copy Row
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
        // setSelectedIds([...selectedIds, id-1]);
        tempData.push({...node.data, id: id++});
      }
    });

    setRowData([...tempData]);
    setSelectedIds([...ids]);
    // gridRef.current.api.setRowData(tempData);
  }

  const onRowDataChanged = () => {
    gridRef.current.api.forEachNode( 
      node => selectedIds.includes(node.data.id) && node.setSelected(true)
    )
  }
  

  // Delete Row
  const deleteRow = useCallback( () => {
    console.log("deleteRow called" );

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    if(selectedRowNodes.length === 0) return;

    const selectedIds = selectedRowNodes.map( rowNode => rowNode.data.id );
    const filteredData = rowData.filter( dataItem => selectedIds.indexOf(dataItem.id) < 0 );
    // gridRef.current.api.setRowData(filteredData);
    setRowData([...filteredData]);
   
  } );

  const handleCellInputInfo = useCallback(({params, rowData, setRowData}) => {
    // console.log("called!!", params, params.colDef.field, params.rowIndex, rowData);
    const id = params.colDef.field;
    const idx = params.rowIndex;
    const stateValue = rowData;
    const setStateValue = setRowData;
    // console.log("handleCellInputInfo", id, idx, stateValue, setStateValue);
    return InputInfoGrid({ id, idx, stateValue, setStateValue});
  })

  const onHandleCellSearch = async (value) => {
    console.log("value1 : ", value);

    const sendData = {"name" : value};
    const resultList = await getStaffList(sendData);

    console.log("resultList", resultList);

    setPreparerRowData([...resultList]);
    
  }
  const onHandleCellOk = ({selectedRows, idx}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = rowData;
    temp[idx].buyer = row.id;
    temp[idx].buyer_id = row.name;
    setRowData([...temp]);
    
    return row.name;

  }

  const handleCellInputSearch = (
    params,
    title,
    onHandleSearch,
    onHandleOk,
    gridOptions) => {
      // console.log("gridOptons", gridOptions.columnDefs, gridOptions.rowData)

      const id  = params.colDef.field;
      const idx = params.rowIndex;

      // InputSearch 컴포넌트를 반환한다.
      return InputSearch({
        id,
        idx,
        title,
        onHandleSearch,
        onHandleOk,
        gridOptions
      })
  }

  const [prCreateColFields, setPrCreateColFields] = useState([
    { field: "id",                headerCheckboxSelection: true, checkboxSelection: true,},
    { field: "line",              headerName:"Line",               minWidth:10,   maxWidth: 80, pinned:"left", editable: false,},
    { field: "item",              headerName:"Item",               minWidth:110, editable: false,
      cellRenderer : () => {
        return <input onChange={(e)=>{
          console.log(e.target.value);
        }}
        />}
    
    // // 컬럼 Render
    //   cellRenderer : (params) => handleCellInputSearch(params, "바이어선택", onHandleCellSearch, onHandleCellOk, {
    //     columnDefs : popUpBuyerColFields,
    //     rowData : preparerRowData,
    //     rowSelection : "single",
    //     suppressRowClickSelection : false,
    //   })
    },
    { field: "category",          headerName:"Category",           minWidth:110,   maxWidth:120, editable: false, },
    { field: "spec",              headerName:"사양",               minWidth:110,   maxWidth:120, editable: false, },
    { field: "unit",              headerName:"단위",               minWidth:110, editable: false, },
    { field: "cnt",               headerName:"수량",               minWidth:110, editable: false,
      cellRendererSelector: (params) => {
        return {
          component: handleCellInputInfo,
          params: {params, rowData, setRowData}
        };
      }
    },
    { field: "unit_price",        headerName:"단가",               minWidth:110, editable: false,
      cellRenderer: (params) => {

        return handleCellInputInfo({params, rowData, setRowData})
      }
    },
    { field: "total_amount",      headerName:"금액",               minWidth:110, editable: false,
      cellRenderer : (param) => (param.data.cnt * param.data.unit_price)
    },
    { field: "tax_code",          headerName:"Tax Code",           minWidth:110, editable: false, },
    { field: "buyer",             headerName:"Buyer",              minWidth:110, editable: false, },
    { field: "note_to_buyer",     headerName:"Note to Buyer",      minWidth:110, editable: false,
      cellRenderer: (params) => handleCellInputInfo({params, rowData, setRowData})
    },
    { field: "requester",         headerName:"Requester",          minWidth:110, editable: false, },
    { field: "need_to_date",      headerName:"요청납기일",         minWidth:110, editable: false, },
    { field: "destination_type",  headerName:"Destination Type",   minWidth:110, editable: false, },
    { field: "organization",      headerName:"Organization",       minWidth:110, editable: false, },
    { field: "location",          headerName:"Location",           minWidth:110, editable: false, },
    { field: "warehouse",         headerName:"창고",               minWidth:110, editable: false, },
    { field: "dist_num",          headerName:"Dist Num",           minWidth:110, editable: false, },
    { field: "charge_account",    headerName:"Charge Account",     minWidth:110, editable: false, },
    ]);


  // Init Page
  useEffect(() => {
    getLov();
  }, []);

  

  useEffect(() => {
    console.log("rowData useEffect")

  }, [rowData]);

  const getLov = async () => {
    const reasonLov = await getPrReasonLov();

    reasonLov && setPrReasonLov(reasonLov);
    
  };

  const onHandleSearch = async (value) => {
    console.log("value1 : ", value);

    const sendData = {"name" : value};
    const resultList = await getStaffList(sendData);

    console.log("resultList", resultList);

    setPreparerRowData([...resultList]);
    
  }

  const onHandleOk = ({selectedRows}) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];
    
    const temp = conditions;
    temp.preparer_id = row.id;
    temp.preparer_name = row.name;
    setConditions(temp);
    
    return row.name;

  }


  return (
    <StyledRoot>
      <Title>구매신청</Title>
      <section>
        <ButtonWrapper>
          <Button onClick={onSaveContents}>저장</Button>
          <Button onClick={onDeleteContents}>삭제</Button>
        </ButtonWrapper>
        <InputContainer>
          {/* TODO: disabled */}
          <InputInfo
            id="req_num"
            inputLabel="PR 번호"
            handlePoCondition={handleCondition}
            inputValue={conditions.req_num}
          />
          {/* TODO: disabled */}
          <InputSearch
            id="preparer_name"
            title="직원선택"
            inputLabel="Preparer"
            onHandleSearch={onHandleSearch}
            onHandleOk={onHandleOk}
            onHandleCancel={null}
            gridOptions={{
              columnDefs : popUpStaffColFields,
              rowData : preparerRowData,
              rowSelection : "single", // single, multiple
              suppressRowClickSelection : false,
            }}
          />
          <InputSearch
            id="auth_date"
            inputLabel="PR 승인일"
            handlePoCondition={handleCondition}
            inputValue={conditions.auth_date}
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
            inputValue={conditions.amount}
          />
          {/* TODO: key value 따로 할 수 있게 */}
          <InputSelect
            id="reason"
            inputLabel="수의사유"
            handlePoCondition={handleCondition}
            lov={prReasonLov}
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

export default selectPrList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
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
