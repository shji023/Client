import React, { useState, useRef, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import  { excelExport } from "../common/excelExport";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { useNavigate } from "react-router-dom";
import "./rfqAgGrid.css";

const AgGridRFQ = ({ listData, colData }) => {
    console.log("listData", listData);

    const rfqDetail = (listData) => {
        // listData.rfq_datail_status==='N'?listData.rfq_datail_status==='신규':listData.rfq_datail_status;
    }
    
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

    useEffect(() => {
        // rfqDetail();
      }, []);

    return (
        <>
            <Wrapper>
            <Button onClick={handleExcel} >excel export</Button>
            </Wrapper>
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

                </StyleDatagrid>
                </div>
            </Wrapper>
        </>
    );
};

export default AgGridRFQ;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  :hover {
    cursor: pointer;
  }
//   margin-top: 1rem;
//   margin-bottom: 1rem;
  float: right;
`;


const Wrapper = styled.div`
padding: 1rem 2rem 0.5rem 0.5rem;
`;

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

  .MuiDataGrid-row:nth-child(even){
    background-color: aliceblue;
  }

  .MuiDataGrid-columnHeaders{
    background-color: #005386;
    color:white;
  }
`;



