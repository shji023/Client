import React, { useEffect, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputInfoGrid from "components/common/InputInfoGrid";
const BidWriteDataGrid = ({ itemListData, setItemListData }) => {
  const navigate = useNavigate();

  let cnt = 1;
  itemListData &&
    itemListData.forEach((element) => {
      element.line = cnt++;
    });

  const bidWriteColFields = [
    { field: "line", headerName: "순번", minWidth: 100 },
    { field: "item", headerName: "ItemCode", minWidth: 100 },
    { field: "description", headerName: "Description", minWidth: 100 },
    { field: "unit_meas_lookup_code", headerName: "단위", minWidth: 100 },
    { field: "pur_rfq_qt", headerName: "수량", minWidth: 100 },
    {
      field: "quotation_total_price1",
      headerName: "견적가",
      minWidth: 100,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: itemListData,
            setStateValue: setItemListData,
          },
        };
      },
    },
    { field: "need_by_date", headerName: "납기", minWidth: 100 },
  ];

  useEffect(() => {});
  return (
    <StyledRoot>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "300px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={itemListData}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            columnDefs={bidWriteColFields}
            defaultColDef={{
              editable: false,
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
            pagination={true}
            paginationPageSize={5}
          >
            {/* {bidWriteColFields.map((data) => (
              <AgGridColumn
                key={data.colId}
                field={data.field}
                headerName={data.headerName}
                minWidth={data.minWidth}
              />
            ))} */}
          </AgGridReact>
        </div>
      </div>
    </StyledRoot>
  );
};

export default BidWriteDataGrid;

const StyledRoot = styled.section`
  margin-top: 3rem;
`;
