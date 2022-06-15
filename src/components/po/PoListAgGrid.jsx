import React, { useState, useRef, useCallback } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const AgGrid = ({ poListData }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    //   const [rowData, setRowData] = useState(null);
    const rowData = poListData;
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);
    const gridRef = useRef();

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

    const getRowStyle  = params => {
        if (params.node.rowIndex % 2 === 1) {
            return { background: '#F5F5F5' };
        }
        // EDF2F8
    };

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
                ref={gridRef}
                rowData={rowData}
                getRowStyle={getRowStyle}
                // headerStyle = {headerClass}
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
                <AgGridColumn field="authorization_status" headerName="Status" maxWidth={110} pinned="left" />
                <AgGridColumn field="start_date" headerName="Order Date" maxWidth={120} pinned="left" />
                <AgGridColumn field="po_num" headerName="PO" maxWidth={110} pinned="left"/>
                <AgGridColumn field="revision_num" headerName="Rev" minWidth={100}/>
                <AgGridColumn field="attribute_category" headerName="유형" minWidth={110} />
                <AgGridColumn field="comments" headerName="Description" minWidth={300} />
                <AgGridColumn field="vendor_id" headerName="Supplier" minWidth={110} />
                <AgGridColumn field="currency_code" headerName="Currency" minWidth={110} />
                <AgGridColumn field="type_lookup_code" headerName="Amount" minWidth={130} />
                <AgGridColumn field="buyer_id" headerName="Type" minWidth={110} />
                <AgGridColumn field="cancel_flag" headerName="Buyer" minWidth={110} />
                <AgGridColumn field="organization_code" headerName="Closuer Status" minWidth={100} />
                <AgGridColumn field="closed_code" headerName="Cancelled" minWidth={100} />
                <AgGridColumn field="line_count" headerName="품목수" minWidth={100} />
            </AgGridReact>
            </div>
        </div>
        </>
    );
};

export default AgGrid;
