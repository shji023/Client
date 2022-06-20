import React, { useState, useRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import  { excelExport } from "../common/excelExport";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { useNavigate } from "react-router-dom";
import { Button } from "components/common/CustomButton";

const AgGridRFQ = ({ listData, colData }) => {
    const navigate = useNavigate();
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);
    const gridRef = useRef();

    const onCellValueChanged = (e) => {
        console.log("changed", e.data);
    };

    // 행마다 색
    const getRowStyle  = params => {
        if (params.node.rowIndex % 2 === 1) {
            return { background: '#F5F5F5' };
        }
        // EDF2F8
    };

    const column = [
        {header: '공급사',        key: 'vendor_name', width: 20},
        // {header: '담당자',        key: 'vendor_', width: 200},
        // {header: 'e-mail',        key: 'vendor_', width: 180},
        // {header: '연락처',        key: 'vendor_', width: 150},
    ];

    const handleExcel=()=>{
        excelExport(column, listData,);
    };

    return (
        <>
            <Button onClick={handleExcel} >Export</Button>
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
                    rowData={listData}
                    columnDefs={colData}
                    defcol
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
                    // pagination={true}
                    // paginationAutoPageSize={true}
                    onCellEditingStopped={(e) => {
                        onCellValueChanged(e);
                    }}>

                </AgGridReact>
                </div>
            </div>
        </>
    );
};

export default AgGridRFQ;