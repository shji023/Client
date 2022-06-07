import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const getRowStyle  = params => {
    
};

// const headerClass= params => {
//     // logic to return the correct class
//     return { background: '#EDF2F8' };
//   }88

const DataGridModal = ({ gridOpitons, gridRef }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    // const onSelectionChanged = () => {
    //     // const data = gridApi.getSelectedRows();

    //     if (data.length > 0) {
    //         setBtnDisabled(false);
    //     } else {
    //         setBtnDisabled(true);
    //     }
    //     setSelectedRows(gridApi.getSelectedRows());
    // };

    let cnt = 1;

    gridOpitons.rowData.forEach((element) => {
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
            {/* <div>
                <Button variant="contained" disabled={btndisabled}>
                action1
                </Button>
                <Button variant="contained" disabled={btndisabled}>
                action1
                </Button>
                <Button variant="contained" disabled={btndisabled}>
                action1
                </Button>
            </div> */}
            <AgGridReact        
                ref={gridRef}
                defaultColDef={gridOpitons.defaultColDef}
                columnDefs={gridOpitons.columnDefs}
                rowData={gridOpitons.rowData}
                getRowStyle={getRowStyle}
                rowSelection={gridOpitons.rowSelection}
                suppressRowClickSelection={gridOpitons.suppressRowClickSelection}
                sideBar={{
                    toolPanels: ["columns", "filters"],
                    defaultToolPanel: "",
                }}
                pagination={true}
                paginationAutoPageSize={true}
                // onGridReady={onGridReady}
                // onSelectionChanged={onSelectionChanged}
                onCellEditingStopped={(e) => {
                    const data = e.data;
                    console.log("changed", e.data);
                    const amount = data.cnt * data.unit_price;
                    console.log(amount);
                    data.total_amoun = amount;
                  }}
            >
             
            </AgGridReact>
            </div>
        </div>
        </>
    );
};

export default DataGridModal;

// const AgGridReactStyle = styled.AgGridReact`
// .ag-theme-alpine {
//     @include ag-theme-alpine((
//         header-background-color: deeppink
//     ));
// }
// `;