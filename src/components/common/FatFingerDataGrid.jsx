import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const getRowStyle  = params => {
    
};

const FatFingerDataGrid = ({id, width, height, gridOptions, gridRowData, gridRef, onRowClicked }) => {

    let cnt = 1;

    gridOptions && gridOptions.rowData && gridOptions.rowData.forEach((element) => {
        element.id = cnt++;
    });
    
    return (
        <>
        <div id = {id} style={{ width: width, height: height }}>
            <div
                id="agGrid"
                style={{
                    height: "450px",
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
                // pagination={true}
                // paginationAutoPageSize={true}
                onRowClicked={onRowClicked}
            >
             
            </AgGridReact>
            </div>
        </div>
        </>
    );
};

export default FatFingerDataGrid;