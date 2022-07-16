import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { dashboardColFields } from "stores/colData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { gridLoadingMsg } from "components/common/CustomGrid";

const DashBoardDataGrid = ({ gridRef, listData }) => {

  return (
    <StyledRoot>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "400px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            ref={gridRef}
            rowData={listData}
            rowSelection={"multiple"}
            suppressRowClickSelection={false}
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
            paginationPageSize={6}
            overlayLoadingTemplate={
              gridLoadingMsg
            }
          >
            {dashboardColFields.map((data) => (
              <AgGridColumn
                key={data.colId}
                field={data.field}
                headerName={data.headerName}
                minWidth={data.minWidth}
              />
            ))}
          </AgGridReact>
        </div>
      </div>
    </StyledRoot>
  );
};

export default DashBoardDataGrid;

const StyledRoot = styled.section`
  /* margin-top: 3rem; */
  /* width: 66%; */
`;
