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
//TODO: 각 페이지에서 props로 받기
const colData = [
  { field: "buyer_id", headerName: "직번", width: 90, headerAlign: "center" },
  { field: "buyer_dept_name", headerName: "성명", width: 90, headerAlign: "center" },
  { field: "buyer_dept_code", headerName: "부서 번호", width: 90, headerAlign: "center" },
];

const DataGridModal = ({ gridOptions, gridRef }) => {
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
                defaultColDef={{
                    headerClass: { background: '#EDF2F8' },
                    editable: true,
                    sortable: true,
                    minWidth: 100,
                    filter: true,
                    resizable: true,
                    // floatingFilter: true,
                    flex: 1,
                  }}
                columnDefs={gridOptions.columnDefs}
                rowData={gridOptions.rowData}
                getRowStyle={getRowStyle}
                rowSelection={gridOptions.rowSelection}
                suppressRowClickSelection={gridOptions.suppressRowClickSelection}
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