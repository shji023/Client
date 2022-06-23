import React, { useState } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const AgVendorSelect = ({selectedVendorList, hide}) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    
    // const rowData = bidResultData; 
    const [selectedRows, setSelectedRows] = useState([]);
    const [btndisabled, setBtnDisabled] = useState(true);

    const onCellValueChanged = (e) => {
        console.log("changed", e.data);
    };
    let cnt = 1;

    // rowData.forEach((element) => {
    //     element.id = cnt++;
    // });
    return (
        <>
        <div style={{ width: "100%", height: "80%" }}>
            <div
            id="rfqGrid"
            style={{
                height: "600px",
                width: "100%",
                padding: "2rem 0rem",
            }}
            className="ag-theme-alpine"
            >
           
            <AgGridReact        
               
                rowData={selectedVendorList}
                // getRowStyle={getRowStyle}
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
                // onGridReady={onGridReady}
                onCellEditingStopped={(e) => {
                onCellValueChanged(e);
                }}
            >
                {/* check box */}
                <AgGridColumn
                headerName=""
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
                hide={hide}
                />
             
                <AgGridColumn field="vendor_name" headerName="공급사" minWidth={10} maxWidth= {800} />
                <AgGridColumn field="contact_name" headerName="담당자" minWidth={10} maxWidth={200} />
                <AgGridColumn field="contact_email_address" headerName="e-mail" minWidth={10} maxWidth={300}/>
                <AgGridColumn field="contact_mobile" headerName="연락처" minWidth={10} maxWidth={300} />                
                
            </AgGridReact>
            </div>
        </div>
        </>
    );
};

export default AgVendorSelect;

// const AgGridReactStyle = styled.AgGridReact`
// .ag-theme-alpine {
//     @include ag-theme-alpine((
//         header-background-color: deeppink
//     ));
// }
// `;