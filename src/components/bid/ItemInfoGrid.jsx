import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import InputInfo from "./InputInfo";

function ItemInfoGrid ({productInfoData}) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  
  const rowData = productInfoData; 
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
      <AgGridReact        
        rowData={rowData}
        // getRowStyle={getRowStyle}
        rowSelection={"multiple"}
        suppressRowClickSelection={false}
        defaultColDef={{
          headerClass: { background: '#EDF2F8' },
          editable: true,
          sortable: true,
          minWidth: 100,
          filter: true,
          resizable: true,
          flex: 1,
        }}
        sideBar={{
          toolPanels: ["columns", "filters"],
          defaultToolPanel: "",
        }}
        pagination={true}
        paginationAutoPageSize={true}
        onSelectionChanged={onSelectionChanged}
        onCellEditingStopped={(e) => {onCellValueChanged(e);}}>
          
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
        
        <AgGridColumn field="item" headerName="Item" minWidth={10} />
        <AgGridColumn field="description" headerName="Description" minWidth={10} maxWidth={150}/>
        <AgGridColumn field="uom" headerName="단위" minWidth={10} maxWidth={80} />                
        <AgGridColumn field="quantity" headerName="수량" minWidth={10} maxWidth={80} 
        cellRendererSelector={(params) => {
            return {
                component: InputInfo,
                params: {
                    id: "fuckyou"
                }
            };
        }}/>                
        <AgGridColumn field="end_date" headerName="납기" minWidth={10} maxWidth={120}  />                
        <AgGridColumn field="dept_name" headerName="사용부서" minWidth={10} maxWidth={120} />                
        <AgGridColumn field="group_name" headerName="그룹사" minWidth={10} maxWidth={100} />                
        <AgGridColumn field="requisition_number" headerName="PR번호-Line" minWidth={10} maxWidth={140} />                
        <AgGridColumn field="name" headerName="신청자" minWidth={10} maxWidth={100} />                
        <AgGridColumn field="staff_contact_number" headerName="연락처" minWidth={10} maxWidth={120} />                
      </AgGridReact>
      </div>
    </div>
    </>
  );
};

export default ItemInfoGrid;
