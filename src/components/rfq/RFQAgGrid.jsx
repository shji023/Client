import React, { useState, useRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import  { excelExport } from "../common/excelExport";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { useNavigate } from "react-router-dom";
import "./rfqAgGrid.css";

const AgGridRFQ = ({ listData, colData }) => {
    console.log("listData", listData);
    
    const navigate = useNavigate();
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);
    const gridRef = useRef();

    // const onSelectionChanged = () => {
    //     if (data.length > 0) {
    //         setBtnDisabled(false);
    //     } else {
    //         setBtnDisabled(true);
    //     }
    //     setSelectedRows(gridApi.getSelectedRows());
    // };

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


    // excel export
    const column = [
        {header: 'RFQ번호',      key: 'rfq_no', width: 20},
        {header: '건 명',        key: 'rfq_description', hidden:false, width: 200},
        {header: '구매 방법',    key: 'reply_method_lookup_code', width: 180},
        {header: '납품 지역',    key: 'rfq_ship_to', width: 150},
        {header: 'Buyer',       key: 'buyer_id', hidden:false, width: 110},
        {header: '구매 등록일',  key: 'quote_effective_start_date', width: 150},
        {header: 'Status',      key: 'rfq_status', width: 90}
    ];

    const handleExcel=()=>{
        excelExport(column, listData);
    };

    return (
        <>
            <div>
            <Button onClick={handleExcel} >excel export</Button>
            </div>
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
                    pagination={true}
                    paginationAutoPageSize={true}
                    onRowClicked={(e) => navigate(`/selectRFQList/${e.data.rfq_no}`)}
                    // onGridReady={onGridReady}
                    // onSelectionChanged={onSelectionChanged}
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

const Button = styled.button`
  width: 15rem;
  height: 3rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
  margin-top: 1rem;
  margin-bottom: 1rem;
  float: right;
`;




