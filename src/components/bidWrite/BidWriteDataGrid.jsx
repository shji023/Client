import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputInfoGrid from "components/common/InputInfoGrid";
import { getFormattedDate } from "hooks/CommonFunction";
const BidWriteDataGrid = ({ itemListData, setItemListData, isDisabled }) => {
  const navigate = useNavigate();
  let cnt = 1;
  itemListData &&
    itemListData.forEach((element) => {
      element.line = cnt++;
    });

  const bidWriteColFields = [
    { field: "line", headerName: "순번", minWidth: 50, maxWidth: 80 },
    { field: "item", headerName: "ItemCode", minWidth: 70, maxWidth: 130 },
    { field: "description", headerName: "Description", minWidth: 150, maxWidth: 350 },
    { field: "unit_meas_lookup_code", headerName: "단위", minWidth: 50, maxWidth: 100 },
    { field: "pur_rfq_qt", headerName: "수량", minWidth: 50, maxWidth: 100 },
    {
      field: "unit_price",
      headerName: "견적가",
      minWidth: 100,
      cellRendererSelector: (params) => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: itemListData,
            setStateValue: setItemListData,
            type: "number",
            disabled: isDisabled,
          },
        };
      },
    },
    { field: "need_by_date", headerName: "납기", minWidth: 140, 
      valueGetter: (params) => getFormattedDate(params.data.needByDate)
    },
  ];
  return (
    <StyledRoot>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "30rem",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            rowData={itemListData}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            columnDefs={bidWriteColFields}
            domLayout={"autoHeight"}
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
