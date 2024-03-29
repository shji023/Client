import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { gridLoadingMsg } from "components/common/CustomGrid";


const getRowStyle  = params => {
    
};

const AgGrid = ({ resvRef, resvRowData, resvDefaultColDef, resvColumnDefs, onRowDataChanged, onRowClicked, rowSelection }) => {
    
    const ref = resvRef;
    const rowData = resvRowData;
    const columnDefs = resvColumnDefs;
    const defaultColDef = resvDefaultColDef;
    const resvRowSelection = rowSelection ? rowSelection : "multiple";

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    const onSelectionChanged = () => {
    //     // const data = gridApi.getSelectedRows();

    //     if (data.length > 0) {
    //         setBtnDisabled(false);
    //     } else {
    //         setBtnDisabled(true);
    //     }
    //     setSelectedRows(gridApi.getSelectedRows());
    };

    const onCellValueChanged = (e) => {
        console.log("onCellValueChanged");
        const data = e.data;
        console.log("changed", e.data);
        const amount = data.cnt * data.unit_price;
        console.log(amount);
        data.total_amount = amount;
        
    };

    let cnt = 1;
    rowData.forEach((element) => {
        element.line = cnt;
        element.id = cnt++;
    });
    
    return (
        <>
        <div style={{ width: "100%", height: "80%", padding: "2rem 0rem" }}>
            <div
                id="agGrid"
                style={{
                    height: "600px",
                    width: "100%",
                }}
                className="ag-theme-alpine"
            >
           
            <AgGridReact        
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection={resvRowSelection}
                groupSelectsChildren={true}
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize='10'
                // paginationAutoPageSize={true}
                suppressExcelExport={true}

                defaultColDef={defaultColDef}
                animateRows={true}

                getRowStyle={getRowStyle}
                sideBar={{
                    toolPanels: ["columns", "filters"],
                    defaultToolPanel: "",
                }}
                
                // onGridReady={onGridReady}
                onSelectionChanged={onSelectionChanged}
                onCellEditingStopped={(e) => {
                    onCellValueChanged(e);
                }}
                onRowDataChanged={ onRowDataChanged }
                onRowClicked={onRowClicked}
                overlayLoadingTemplate={
                    gridLoadingMsg
                }
                suppressKeyboardEvent={()=>true}
            >
             
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