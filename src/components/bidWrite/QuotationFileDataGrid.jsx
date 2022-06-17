import React, { useCallback, useEffect, useRef, useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styled from "styled-components";

const QuotationFileDataGrid = () => {

  const quotationFileColFields = [
    { field: "item", headerName: "유형", minWidth: 100 },
    { field: "description", headerName: "첨부", minWidth: 100 },
    { field: "unit_meas_lookup_code", headerName: "첨부파일명", minWidth: 100 },
    { field: "pur_rfq_qt", headerName: "Size", minWidth: 100 },
    { field: "quotation_total_price1", headerName: "등록일", minWidth: 100},
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
            // rowData={}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            columnDefs={quotationFileColFields}
            domLayout={'autoHeight'}
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

export default QuotationFileDataGrid;

const StyledRoot = styled.section`
  margin-top: 3rem;
`;
