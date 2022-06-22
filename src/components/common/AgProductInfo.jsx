import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import InputInfo from "./InputInfo";

const AgVendorSelect = ({productInfoData, columnDefs, onRowDataChanged, gridRef}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const rowData = productInfoData; 
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    const onCellValueChanged = (e) => {
        console.log("changed", e.data);
    };
    let cnt = 1;

    rowData.forEach((element) => {
        element.id = cnt++;
    });
    return (
        <>
        <div style={{ width: "100%", height: "80%", padding: "2rem 0rem", }}>
            <div
            id="rfqGrid"
            style={{
                height: "600px",
                width: "100%",
            }}
            className="ag-theme-alpine"
            >
           
            <AgGridReact
            
                ref={gridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                rowSelection={"multiple"}
                suppressRowClickSelection={false}
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
                sideBar={{
                toolPanels: ["columns", "filters"],
                defaultToolPanel: "",
                }}
                pagination={true}
                paginationAutoPageSize={true}
                // onGridReady={onGridReady}
                onCellEditingStopped={(e) => {
                onCellValueChanged(e);
                }}
                onRowDataChanged={onRowDataChanged}
            >
            </AgGridReact>
            
            </div>
        </div>
        </>
    );
};

export default AgVendorSelect;

// const AgGridReactStyle = styled.AgGridReact`
// .ag-theme-alpine {
//     @include ag-theme-alpine((
//         header-background-color: deeppink
//     ));
// }
// `;