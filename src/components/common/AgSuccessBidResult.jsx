import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgGrid = ({ resvGridRef, bidResultData }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  //   const [rowData, setRowData] = useState(null);
  const rowData = bidResultData;
  const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);

  const onSelectionChanged = () => {
    // const data = gridApi.getSelectedRows();
    // if (data.length > 0) {
    // setBtnDisabled(false);
    // } else {
    // setBtnDisabled(true);
    // }
    // setSelectedRows(gridApi.getSelectedRows());
  };

  const onCellValueChanged = (e) => {
    console.log("changed", e.data);
  };
  let cnt = 1;

  rowData.forEach((element) => {
    element.id = cnt++;
  });
  return (
    <>
      <div style={{ width: "100%", height: "80%" }}>
        <div
          id="rfqGrid"
          style={{
            height: "600px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            ref={resvGridRef}
            rowData={rowData}
            rowSelection={"single"}
            suppressRowClickSelection={false}
            defaultColDef={{
              headerClass: { background: "#EDF2F8" },
              editable: true,
              sortable: true,
              minWidth: 100,
              filter: true,
              resizable: true,
              // floatingFilter: true,
              flex: 1,
            }}
            sideBar={{
              toolPanels: ["columns", "filters"],
              defaultToolPanel: "",
            }}
            pagination={true}
            paginationAutoPageSize={true}
            // onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            onCellEditingStopped={(e) => {
              onCellValueChanged(e);
            }}
          >
            {/* check box */}
            <AgGridColumn
              headerName="..HELLO."
              headerCheckboxSelection={true}
              checkboxSelection={true}
              floatingFilter={false}
              suppressMenu={true}
              minWidth={10}
              maxWidth={100}
              width={50}
              flex={0}
              resizable={false}
              sortable={false}
              editable={false}
              filter={false}
              suppressColumnsToolPanel={true}
            />

            <AgGridColumn field="id" headerName="순위" minWidth={10} maxWidth={80} />
            <AgGridColumn field="vendor_name" headerName="입찰사/제작사" minWidth={300} />
            <AgGridColumn field="currency" headerName="입력통화" minWidth={10} maxWidth={120} />
            <AgGridColumn
              field="quotation_total_price2"
              headerName="응찰가격"
              minWidth={10}
              maxWidth={120}
            />
            <AgGridColumn field="quotation_comment" headerName="공급사의견" minWidth={110} />
          </AgGridReact>
        </div>
      </div>
    </>
  );
};

export default AgGrid;

// const AgGridReactStyle = styled.AgGridReact`
// .ag-theme-alpine {
//     @include ag-theme-alpine((
//         header-background-color: deeppink
//     ));
// }
// `;
