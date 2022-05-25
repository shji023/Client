import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// 참고용
const columns1 = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

// 참고용
const rows1 = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

//TODO: 각 페이지에서 props로 받기
const colData = [
  { field: 'authorization_STATUS',  headerName: 'Status',             width: 90, headerAlign: 'center', },  
  { field: 'contract_DATE',         headerName: 'Order Date',         width: 90, headerAlign: 'center', },
  { field: 'po_NUM',                headerName: 'PO',                 width: 90, headerAlign: 'center', },
  { field: 'revision_NUM',          headerName: 'Rev',                width: 90, headerAlign: 'center', },
  { field: 'attribute_CATEGORY',    headerName: '유형',               width: 90, headerAlign: 'center', },
  { field: 'rfq_NO',                headerName: 'Description',        width: 90, headerAlign: 'center', },
  { field: 'vendor_ID',             headerName: 'Supplier',           width: 90, headerAlign: 'center', },
  { field: 'currency_CODE',         headerName: 'Currency',           width: 90, headerAlign: 'center', },
  { field: 'blanket_TOTAL_AMOUNT',  headerName: 'Amount',             width: 90, headerAlign: 'center', },  
  { field: 'type_LOOKUP_CODE',      headerName: 'Type',               width: 90, headerAlign: 'center', },
  { field: 'buyer_ID',              headerName: 'Buyer',              width: 90, headerAlign: 'center', },
  { field: 'closed_CODE',           headerName: 'Closuer Status',     width: 90, headerAlign: 'center', },
  { field: 'cancel_FLAG',           headerName: 'Cancelled',          width: 90, headerAlign: 'center', },
  // { field: 'L.ITEM_ID',             headerName: '품목수',             width: 90, headerAlign: 'center', },
  // { field: 'organization_CODE',     headerName: 'organization_CODE',  width: 90 },
  // { field: 'po_HEADER_ID',          headerName: 'po_HEADER_ID',       width: 90 },
  
];


export default function DataGridDemo({ poListData }) {

  const colsData = colData;
  const rowsData = poListData;

  // row data에 id 필드 추가
  let cnt = 1;
  rowsData.forEach(element => {
    element.id = cnt++;
  });
  // console.log("result", rowsData);

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        // rows={rows1}
        // columns={columns1}
        rows = {rowsData}
        columns = {colsData}
        pageSize = {10}
        rowsPerPageOptions = {[10]}
        checkboxSelection
        disableSelectionOnClick

        // loading={loading}
        components={{ Toolbar: GridToolbar }}
        style={{ fontSize:15 }}
      />
    </div>
  );
}