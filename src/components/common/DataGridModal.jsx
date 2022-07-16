import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { gridLoadingMsg } from "./CustomGrid";


const getRowStyle  = params => {
    
};

const DataGridModal = ({ gridOptions, gridRowData, gridRef }) => {


    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    let cnt = 1;

    gridOptions && gridOptions.rowData && gridOptions.rowData.forEach((element) => {
        element.id = cnt++;
    });
    
    return (
        <>
        <div style={{ width: "100%", height: "80%" }}>
            <div
                id="agGrid"
                style={{
                    height: "600px",
                    width: "100%",
                }}
                className="ag-theme-alpine"
            >
            <AgGridReact        
                ref={gridRef}
                defaultColDef={{
                    headerClass: { background: '#EDF2F8' },
                    editable: false,
                    sortable: true,
                    minWidth: 100,
                    filter: true,
                    resizable: true,
                    // floatingFilter: true,
                    flex: 1,
                  }}
                columnDefs={gridOptions.columnDefs}
                rowData={gridRowData}
                getRowStyle={getRowStyle}
                rowSelection={gridOptions.rowSelection}
                suppressRowClickSelection={gridOptions.suppressRowClickSelection}
                sideBar={{
                    toolPanels: ["columns", "filters"],
                    defaultToolPanel: "",
                }}
                pagination={true}
                paginationAutoPageSize={true}
                overlayLoadingTemplate={
                    gridLoadingMsg
                }
                // onGridReady={onGridReady}
                // onSelectionChanged={onSelectionChanged}
                // onCellEditingStopped={(e) => {
                //     const data = e.data;
                //     console.log("changed", e.data);
                //     const amount = data.cnt * data.unit_price;
                //     console.log(amount);
                //     data.total_amoun = amount;
                //   }}
            >
             
            </AgGridReact>
            </div>
        </div>
        </>
    );
};

export default DataGridModal;