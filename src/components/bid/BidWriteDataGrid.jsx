import React from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { bidWriteColFields } from "stores/colData";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
const BidWriteDataGrid = ({ itemListData }) => {
  const navigate = useNavigate();

  let cnt = 1;
  itemListData && itemListData.forEach((element) => {
    element.line = cnt++;
  });
  
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
            {bidWriteColFields.map((data)=><AgGridColumn 
              key={data.colId} 
              field={data.field} 
              headerName={data.headerName} 
              minWidth={data.minWidth} 
              />)}
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