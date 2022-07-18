import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { bidColFields } from "stores/colData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { gridLoadingMsg } from "components/common/CustomGrid";
const BidDataGrid = ({ gridRef, listData }) => {
  const navigate = useNavigate();
  return (
    <StyledRoot>
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="myGrid"
          style={{
            height: "529px",
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
            paginationPageSize={10}
            onRowClicked={(e) => {
              // if (e.data.bid_search_type === "완료") {
              //   // navigate(`/successBid/${e.data.bidding_no}`);
              //   navigate(`/successBid/${e.data.rfq_no}`);
              // } else {
              navigate(`/bidList/${e.data.bidding_no}`);
              // }
            }}
            overlayLoadingTemplate={
              gridLoadingMsg
            }
          >
            {bidColFields.map((data) => (
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

export default BidDataGrid;

const StyledRoot = styled.section`
  margin-top: 3rem;
`;
