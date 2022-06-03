import React, { useState, useRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import  { excelExport } from "../common/excelExport";
import styled from "styled-components";
import { colors } from "assets/styles/color";

const AgGridRFQ = ({ listData }) => {
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);
    const gridRef = useRef();

    const onSelectionChanged = () => {
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

    // 행마다 색
    const getRowStyle  = params => {
        if (params.node.rowIndex % 2 === 1) {
            return { background: '#F5F5F5' };
        }
        // EDF2F8
    };

    const column = [
        {header: 'RFQ번호', key: 'rfq_NO', width: 20},
        {header: '건 명', key: 'rfq_DESCRIPTION', hidden:false, width: 200},
        {header: '구매 방법', key: 'reply_METHOD_LOOKUP_CODE', width: 180},
        {header: '납품 지역', key: 'rfq_SHIP_TO', width: 150},
        {header: 'Buyer', key: 'buyer_ID', hidden:false, width: 110},
        {header: '구매 등록일', key: 'quote_EFFECTIVE_START_DATE', width: 150},
        {header: 'Status', key: 'rfq_STATUS', width: 90}
    ];

    const handleExcel=()=>{
        excelExport(column, listData);
    };

    return (
        <>
            <Button onClick={handleExcel} >excel export</Button>
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
                    }}>
                    <AgGridColumn field="rfq_NO" headerName="RFQ번호" minWidth={90} />
                    <AgGridColumn field="rfq_DESCRIPTION" headerName="건 명" minWidth={200} />
                    <AgGridColumn field="reply_METHOD_LOOKUP_CODE" headerName="구매 방법" minWidth={180} />
                    <AgGridColumn field="rfq_SHIP_TO" headerName="납품 지역" minWidth={150} />
                    <AgGridColumn field="buyer_ID" headerName="Buyer" minWidth={110} />
                    <AgGridColumn field="quote_EFFECTIVE_START_DATE" headerName="등록일" minWidth={150} />
                    <AgGridColumn field="rfq_STATUS" headerName="Status" minWidth={90} />
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
  margin-bottom: 1rem;
`;