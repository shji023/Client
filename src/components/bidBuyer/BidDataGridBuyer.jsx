import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { bidBuyerColFields } from "stores/colData";
const BidDataGridBuyer = ({ listData }) => {
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
            rowData={listData}
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
            pagination={true}
            paginationPageSize={10}
            onRowClicked={(e) => {
              navigate(`/successBid/${e.data.rfq_no}`);
            }}
          >
            {bidBuyerColFields.map((data) => (
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

export default BidDataGridBuyer;

const StyledRoot = styled.section`
  margin-top: 3rem;
`;
