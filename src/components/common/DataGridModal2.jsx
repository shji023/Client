import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styled from 'styled-components';

// 참고용
const columns1 = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
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

// 참고용
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

//TODO: 각 페이지에서 props로 받기
const colData = [
  { field: "buyer_ID", headerName: "직번", width: 90, headerAlign: "center" },
  { field: "buyer_DEPT_NAME", headerName: "성명", width: 90, headerAlign: "center" },
  { field: "buyer_DEPT_CODE", headerName: "부서 번호", width: 90, headerAlign: "center" },
];

function DataGridModal({ poListData }) {
  const colsData = colData;
  const rowsData = poListData;

  // row data에 id 필드 추가
  let cnt = 1;

  rowsData.forEach((element) => {
    element.id = cnt++;
  });
  // console.log("result", rowsData);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <StyleDatagrid
        rows={rowsData}
        columns={colsData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        components={{ Toolbar: GridToolbar }}
        style={{ fontSize: 15 }}
      />
    </div>
  );
}

export default DataGridModal;

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
`;