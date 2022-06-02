import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const getRowStyle  = params => {
    // if (params.node.rowIndex % 2 === 1) {
    //     return { background: '#F5F5F5' };
    // }
    // EDF2F8
};

// const headerClass= params => {
//     // logic to return the correct class
//     return { background: '#EDF2F8' };
//   }

const AgGrid = ({ poListData }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    //   const [rowData, setRowData] = useState(null);
    const rowData = poListData;
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    const onSelectionChanged = () => {
        // const data = gridApi.getSelectedRows();

        if (data.length > 0) {
        setBtnDisabled(false);
        } else {
        setBtnDisabled(true);
        }
        setSelectedRows(gridApi.getSelectedRows());
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
                rowData={rowData}
                getRowStyle={getRowStyle}
                rowSelection={"multiple"}
                suppressRowClickSelection={false}
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
                headerName="PoList"
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
             
                <AgGridColumn field="authorization_STATUS" headerName="Status" minWidth={120} />
                <AgGridColumn field="contract_DATE" headerName="Order Date" minWidth={120} />
                <AgGridColumn field="po_NUM" headerName="PO" minWidth={120}/>
                <AgGridColumn field="revision_NUM" headerName="Rev" minWidth={100}/>
                <AgGridColumn field="attribute_CATEGORY" headerName="유형" minWidth={110} />
                <AgGridColumn field="rfq_NO" headerName="Description" minWidth={110} />
                <AgGridColumn field="vendor_ID" headerName="Supplier" minWidth={110} />
                <AgGridColumn field="currency_CODE" headerName="Currency" minWidth={110} />
                <AgGridColumn field="blanket_TOTAL_AMOUNT" headerName="Amount" minWidth={110} />
                <AgGridColumn field="type_LOOKUP_CODE" headerName="Type" minWidth={110} />
                <AgGridColumn field="buyer_ID" headerName="Buyer" minWidth={110} />
                <AgGridColumn field="closed_CODE" headerName="Closuer Status" minWidth={110} />
                <AgGridColumn field="cancel_FLAG" headerName="Cancelled" minWidth={110} />

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