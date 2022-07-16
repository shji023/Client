import React, { useState, useRef, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import  { excelExport } from "../common/excelExport";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { useNavigate } from "react-router-dom";
import "./rfqAgGrid.css";
import { Button } from "components/common/CustomButton";
import { gridLoadingMsg } from "components/common/CustomGrid";

const AgGridRFQ = ({ gridRef, listData, colData }) => {
    console.log("listData", listData);

    const rfqDetail = (listData) => {
        // listData.rfq_datail_status==='N'?listData.rfq_datail_status==='신규':listData.rfq_datail_status;
    }
    
    const navigate = useNavigate();
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

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
        {header: 'RFQ번호',      key: 'rfq_no', width: 30},
        {header: '건 명',        key: 'rfq_description', hidden:false, width: 230},
        {header: '구매 방법',    key: 'reply_method_lookup_code', width: 190},
        {header: '납품 지역',    key: 'rfq_ship_to', width: 160},
        {header: 'Buyer',       key: 'buyer_id', hidden:false, width: 120},
        {header: '구매 등록일',  key: 'quote_effective_start_date', width: 160},
        {header: 'Status',      key: 'rfq_status', width: 100}
    ];

    const handleExcel=()=>{
        excelExport(column, listData);
    };

    return (
        <>
            <ButtonWrapper>
              <Button onClick={handleExcel} >Export</Button>
            </ButtonWrapper>
            <Wrapper style={{ width: "100%", height: "80%" }}>
                <div
                    id="rfqGrid"
                    style={{
                        height: "570px",
                        width: "100%",
                    }}
                    className="ag-theme-alpine"
                >
                <StyleDatagrid       
                    ref={gridRef}
                    rowData={listData}
                    columnDefs={colData}
                    // columnDefs={gridOptions.columnDefs}
                    defcol
                    getRowStyle={getRowStyle}
                    // headerStyle = {headerClass}
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
                    onRowClicked={(e) => navigate(`/selectRFQList/${e.data.rfq_no}`)}
                    // onGridReady={onGridReady}
                    // onSelectionChanged={onSelectionChanged}
                    onCellEditingStopped={(e) => {
                        onCellValueChanged(e);
                    }}
                    overlayLoadingTemplate={
                        gridLoadingMsg
                    }
                    >

                </StyleDatagrid>
                </div>
            </Wrapper>
        </>
    );
};

export default AgGridRFQ;

const Wrapper = styled.div`
  padding: 2rem 0rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyleDatagrid = styled(AgGridReact)`
  /* 스크롤바 설정*/
  & ::-webkit-scrollbar {
    /*  스크롤바 막대 너비 설정 */
    width: 6px;
    height: 6px;
  }

  /* 스크롤바 막대 설정*/
  & ::-webkit-scrollbar-thumb {
    /* 스크롤바 막대 높이 설정    */
    height: 1em;
    background-color: rgb(225 225 225 / 87%);
    /* 스크롤바 둥글게 설정    */
    border-radius: 10px;
  }

  /* 스크롤바 뒷 배경 설정*/
  & ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }

`;



