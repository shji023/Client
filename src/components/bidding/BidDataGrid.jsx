// import React, { useEffect } from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import styled from 'styled-components';
// import { bidColData } from 'stores/colData';

// function BidDataGrid({ bidListData }) {
//   const colsData = bidColData;
//   const rowsData = bidListData;
//   let cnt = 1;

//   rowsData.forEach((element) => {
//     element.id = cnt++;
//   });
//   return (
//     <div style={{ height: 650, width: "100%" }}>
//       <StyleDatagrid
//         rows={rowsData}
//         columns={colsData}
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         checkboxSelection
//         disableSelectionOnClick
//         components={{ Toolbar: GridToolbar }}
//         style={{ fontSize: 15 }}
//       />
//     </div>
//   );
// }

// export default BidDataGrid;

// const StyleDatagrid = styled(DataGrid)`
//   /* 스크롤바 설정*/
//   & ::-webkit-scrollbar {
//     /*  스크롤바 막대 너비 설정 */
//     width: 6px;
//     height: 6px;
//   }

//   /* 스크롤바 막대 설정*/
//   & ::-webkit-scrollbar-thumb {
//     /* 스크롤바 막대 높이 설정    */
//     height: 1em;
//     background-color: rgb(225 225 225 / 87%);
//     /* 스크롤바 둥글게 설정    */
//     border-radius: 10px;
//   }

//   /* 스크롤바 뒷 배경 설정*/
//   & ::-webkit-scrollbar-track {
//     background-color: rgba(0, 0, 0, 0);
//   }

//   .MuiDataGrid-row:nth-child(even){
//     background-color: aliceblue;
//   }

//   .MuiDataGrid-columnHeaders{
//     background-color: #005386;
//     color:white;
//   }
// `;
import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import "./styles.css";
import Button from "@mui/material/Button";
import { bidColFields } from "stores/colData";

const BidDataGrid = ({ listData }) => {

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={listData}
            columnDefs={bidColFields}
            rowSelection={"multiple"}
            suppressRowClickSelection={false}
            defaultColDef={{
              editable: true,
              sortable: true,
              minWidth: 100,
              filter: true,
              resizable: true,
              floatingFilter: false,
              flex: 1,
            }}
            sideBar={{
              toolPanels: ["columns", "filters"],
              defaultToolPanel: "",
            }}
          >
            <AgGridColumn
              headerName="..HELLO."
              headerCheckboxSelection={true}
              checkboxSelection={true}
              floatingFilter={false}
              suppressMenu={true}
              minWidth={50}
              maxWidth={50}
              width={50}
              flex={0}
              resizable={false}
              sortable={false}
              editable={false}
              filter={false}
              suppressColumnsToolPanel={true}
            />
            <AgGridColumn />
            {/* {bidColFields.map((data)=><AgGridColumn key={data.colId} field={data.field} />)} */}
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default BidDataGrid;