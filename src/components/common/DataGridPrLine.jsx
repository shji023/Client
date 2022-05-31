import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';
import { getNumberFormat } from 'hooks/CommonFunction';

// 참고용1
const columns1 = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

// 참고용2
const rows1 = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// TODO: 각 페이지에서 props로 받기
// TODO: 특정 row 데이터 가운데 정렬하기
const colData = [
  { field: "id",        headerName: "id",      width: 90, headerAlign: "center" },
  { field: "line_NUM",  headerName: "Line",      width: 90, headerAlign: "center" },
  { field: "item_NAME", headerName: "Item",      width: 90, headerAlign: "center" },
  { field: "category", headerName: "Category",      width: 90, headerAlign: "center" },
  { field: "spec", headerName: "사양",      width: 90, headerAlign: "center" },
  { field: "unit", headerName: "단위",      width: 90, headerAlign: "center" },
  { field: "num123", headerName: "수량",      width: 90, headerAlign: "center" },
  { field: "amount", headerName: "단가",      width: 90, headerAlign: "center" },
  { field: "sum(amount)", headerName: "금액",      width: 90, headerAlign: "center" },
  { field: "tax_CODE", headerName: "Tax Code",      width: 90, headerAlign: "center" },
  { field: "buyer_ID", headerName: "Buyer",      width: 90, headerAlign: "center" },
  { field: "note_TO_BUYER", headerName: "Note to Buyer",      width: 90, headerAlign: "center" },
  { field: "requester", headerName: "Requester",      width: 90, headerAlign: "center" },
  { field: "need_TO_DATE", headerName: "요청 납기일",      width: 90, headerAlign: "center" },
  { field: "destination_TYPE", headerName: "DestinationType",      width: 90, headerAlign: "center" },
  { field: "organization", headerName: "Organization",      width: 90, headerAlign: "center" },
  { field: "location", headerName: "Location",      width: 90, headerAlign: "center" },
  { field: "chango", headerName: "창고",      width: 90, headerAlign: "center" },
  { field: "dist_NUM", headerName: "Dist Num",      width: 90, headerAlign: "center" },
  { field: "charge_ACCOUNT", headerName: "Charge Account",      width: 90, headerAlign: "center" }
];

function DataGridPR({ poListData, selectionModel, onSelectionModelChange }) {

  const colsData = colData;
  const rowsData = poListData;

  // row data에 id 필드 추가
  let cnt = 0;

  rowsData.forEach((element) => {
    element.id = cnt++
    element.num = cnt;
  });
  // console.log("result", rowsData);

  return (
    <div style={{ height: 650, width: "100%" }}>
      <StyleDatagrid
        rows={rowsData}
        columns={colsData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        // loading={loading}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={selectionModel}
        components={{ Toolbar: GridToolbar }}
        style={{ fontSize: 15 }}
      />
    </div>
  );
}

export default DataGridPR;

const StyleDatagrid = styled(DataGrid)`
  /* 스크롤바 설정*/
  & ::-webkit-scrollbar {
    /*  스크롤바 막대 너비 설정 */
    width: 6px;
    height: 6px;
  }

  /* 스크롤바 막대 설정*/
  & ::-webkit-scrollbar-thumb {
    /* 스크롤바 막대 높이 설정    */
    height: 1em;
    background-color: rgb(225 225 225 / 87%);
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  & ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

  .MuiDataGrid-row:nth-child(even){
    background-color: aliceblue;
  }

  .MuiDataGrid-columnHeaders{
    background-color: #005386;
    color:white;
  }

  // DataGrid 헤더 체크박스
  .MuiDataGrid-columnHeaderTitleContainerContent .MuiCheckbox-root{
    color: white;
  }

  .DateInterval-warning {
    background-color: #ff8080;
  }
  
`;
