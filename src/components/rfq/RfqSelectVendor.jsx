import React, { useState, useRef, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { getSearchVendorList } from "apis/rfq.api";
import styled from "styled-components";
import { colors } from "assets/styles/color";
import { useNavigate } from "react-router-dom";
import { RfqSelectVendorColFields } from "stores/colData";
import "./rfqAgGrid.css";
import { gridLoadingMsg } from "components/common/CustomGrid";

function RfqSelectVendor({ id }) {
  const [colData, setColData] = useState(RfqSelectVendorColFields);
  const [vendorListData, setVendorListData] = useState([]);

  const selectVendorList = async () => {
    const data = await getSearchVendorList(id);

    setVendorListData(data);
  };

  const navigate = useNavigate();
  const [gridApi, setGridApi] = useState(null);
  // // const [gridColumnApi, setGridColumnApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [btndisabled, setBtnDisabled] = useState(true);

  const onCellValueChanged = (e) => {};

  // 행마다 색
  const getRowStyle = (params) => {
    // if (params.node.rowIndex % 2 === 1) {
    //   return { background: "#F5F5F5" };
    // }
    // EDF2F8
  };

  useEffect(() => {
    selectVendorList();
  }, []);

  return (
    <>
      <div style={{ width: "100%", height: "80%" }}>
        <div
          id="rfqGrid"
          style={{
            height: "300px",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            // ref={gridRef}
            rowData={vendorListData}
            columnDefs={colData}
            defcol
            getRowStyle={getRowStyle}
            // headerStyle = {headerClass}
            rowSelection={"multiple"}
            suppressRowClickSelection={false}
            defaultColDef={{
              headerClass: { background: "#EDF2F8" },
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
            onCellEditingStopped={(e) => {
              onCellValueChanged(e);
            }}
            overlayLoadingTemplate={
              gridLoadingMsg
            }
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}
export default RfqSelectVendor;
