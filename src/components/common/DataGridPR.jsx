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
  // { field: "id",                headerName: "id",      width: 90, headerAlign: "center" },
  { field: "num",                headerName: "순번",      width: 90, headerAlign: "center" },
  { field: "line_STATUS",        headerName: "Status",    width: 90, headerAlign: "center" },
  { field: "po_NUM",             headerName: "RFQ번호",   width: 90, headerAlign: "center",
    valueFormatter: (params) => {  if (!params.value) return '-';  }
  },
  { field: "dateInterval",       headerName: "경과일",    width: 90, headerAlign: "center",
    valueFormatter: (params) => {  
      if (params.value < 0) params.value = 0;  
      return params.value + "일";
    },
    cellClassName: (params) => {
      if (params.value == null) return '';

      // TODO: 사용자가 설정에서 바꿀 수 있도록 하기
      const limitDay = 100;
      if(params.value >= limitDay)  return 'DateInterval-warning';
      
    }    
  },
  { field: "category_ID",        headerName: "Category", width: 90, headerAlign: "center" },
  { field: "requisition_NUMBER", headerName: "PR번호",    width: 90, headerAlign: "center" },
  { field: "description",        headerName: "건명",      width: 90, headerAlign: "center" },
  { field: "unit_PRICE",         headerName: "금액",      width: 90, type: "number", headerAlign: "center",
    valueFormatter: ({ value }) => `${getNumberFormat(value)}`
  },
  { field: "currency_CODE",      headerName: "단위",      width: 90, headerAlign: "center" },
  { field: "need_BY_DATE",       headerName: "요청납기일", width: 90, headerAlign: "center" },
  { field: "preparer_ID",        headerName: "Requester", width: 90,  headerAlign: "center" },
  { field: "organization_CODE",  headerName: "사용부서",   width: 90, headerAlign: "center" },
];

function DataGridPR({ poListData, onSelectionModelChange }) {

  const colsData = colData;
  const rowsData = poListData;

  // row data에 id 필드 추가
  let cnt = 0;

  rowsData.forEach((element) => {
    element.id = cnt++
    element.num = cnt;
  });
  console.log("result", rowsData);

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
