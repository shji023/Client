import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const getRowStyle  = params => {
    
};

// const headerClass= params => {
//     // logic to return the correct class
//     return { background: '#EDF2F8' };
//   }

const AgGrid = ({ resvRef, resvRowData, setRowData, resvDefaultColDef, resvColumnDefs, onRowDataChanged }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const ref = resvRef;
    const rowData = resvRowData;
    const columnDefs = resvColumnDefs;
    const defaultColDef = resvDefaultColDef;
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

    const onCellValueChanged = (e) => {
        const data = e.data;
        console.log("changed", e.data);
        const amount = data.cnt * data.unit_price;
        console.log(amount);
        data.total_amoun = amount;
        
    };
    let cnt = 1;

    rowData.forEach((element) => {
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
                ref={ref}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={rowData}
                getRowStyle={getRowStyle}
                rowSelection={"multiple"}
                suppressRowClickSelection={true}
                sideBar={{
                    toolPanels: ["columns", "filters"],
                    defaultToolPanel: "",
                }}
                pagination={true}
                paginationAutoPageSize={true}
                // onGridReady={onGridReady}
                // onSelectionChanged={onSelectionChanged}
                onCellEditingStopped={(e) => {
                    onCellValueChanged(e);
                }}
                onRowDataChanged={ onRowDataChanged }
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