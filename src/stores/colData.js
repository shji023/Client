
export const bidColData = [
  { field: "bid_PRICE_METHOD", headerName: "단가입력방법", width: 90, headerAlign: "center" },
  { field: "bid_SEARCH_TYPE", headerName: "Status", width: 90, headerAlign: "center" },
  { field: "bid_TYPE_CODE", headerName: "입찰방법", width: 90, headerAlign: "center" },
  { field: "bidding_END_DATE", headerName: "입찰마감일시", width: 90, headerAlign: "center" },
  { field: "bidding_NO", headerName: "입찰번호", width: 90, headerAlign: "center" },
  { field: "bidding_START_DATE", headerName: "입찰개시일시", width: 90, headerAlign: "center" },
  { field: "buyer_id", headerName: "Buyer", width: 90, headerAlign: "center" },
  { field: "category_SEGMENT1", headerName: "부문", width: 90, headerAlign: "center" },
  { field: "rfq_DESCRIPTION", headerName: "건명", width: 90, headerAlign: "center" },
  { field: "rfq_NO", headerName: "RFQ번호", width: 90, headerAlign: "center" },
  { field: "simple_QUOTATION_FLAG", headerName: "단계", width: 90, headerAlign: "center" },
];

export const bidColFields =[
  { colId:1, field:"category_SEGMENT1", headerName: "부문", minWidth:100},
  { colId:2, field:"rfq_NO", headerName: "RFQ번호", minWidth:150},
  { colId:3, field:"bidding_NO", headerName: "입찰번호", minWidth:150},
  { colId:4, field:"rfq_DESCRIPTION", headerName: "건명", minWidth:300},
  { colId:5, field:"simple_QUOTATION_FLAG", headerName: "단계", minWidth:100},
  { colId:6, field:"bid_SEARCH_TYPE", headerName: "Status", minWidth:100},
  { colId:7, field:"bid_TYPE_CODE", headerName: "입찰방법", minWidth:150},
  { colId:8, field:"bid_PRICE_METHOD", headerName: "단가입력방법", minWidth:150},
  { colId:9, field:"bidding_START_DATE", headerName: "입찰개시일시", minWidth:200},
  { colId:10, field:"bidding_END_DATE", headerName: "입찰마감일시", minWidth:200},
  { colId:11, field:"buyer_ID", headerName: "Buyer", minWidth:100},
  ];

// #region PR

export const prSelectColDef = {
  headerClass: { background: '#EDF2F8' },
  editable: true,
  sortable: true,
  minWidth: 100,
  filter: true,
  resizable: true,
  // floatingFilter: true,
  flex: 1,
}

export const prSelectColFields = [
  { colId:1,  field:"num",                headerName: "순번",       minWidth:100},
  { colId:2,  field:"line_STATUS",        headerName: "Status",     minWidth:150},
  { colId:3,  field:"po_NUM",             headerName: "RFQ번호",    minWidth:150},
  { colId:4,  field:"dateInterval",       headerName: "경과일",     minWidth:300},
  { colId:5,  field:"category_ID",        headerName: "Category",   minWidth:100},
  { colId:6,  field:"requisition_NUMBER", headerName: "PR번호",     minWidth:100},
  { colId:7,  field:"description",        headerName: "건명",       minWidth:150},
  { colId:8,  field:"unit_PRICE",         headerName: "금액",       minWidth:150},
  { colId:9,  field:"currency_CODE",      headerName: "단위",       minWidth:200},
  { colId:10, field:"need_BY_DATE",       headerName: "요청납기일", minWidth:200},
  { colId:11, field:"preparer_ID",        headerName: "Requester",  minWidth:100},
  { colId:12, field:"organization_CODE",  headerName: "사용부서",   minWidth:100},
  ];

export const prCreateColDef = {
  headerClass: { background: '#EDF2F8' },
  editable: true,
  sortable: true,
  minWidth: 100,
  filter: true,
  resizable: true,
  // floatingFilter: true,
  flex: 1,
}

export const prCreateColFields = [
  { field: null,                headerCheckboxSelection: true, checkboxSelection: true,},
  { field: "line",              headerName:"Line",               minWidth:10,   maxWidth: 80, pinned:"left",},
  { field: "item",              headerName:"Item",               minWidth:110, /* cellRenderer: InputSearch */},
  { field: "category",          headerName:"Category",           minWidth:110,   maxWidth:120,},
  { field: "spec",              headerName:"사양",               minWidth:110,   maxWidth:120,},
  { field: "unit",              headerName:"단위",               minWidth:110, },
  // 수정 가능
  { field: "cnt",               headerName:"수량",               minWidth:110, /* cellRenderer: InputInfo */},
  // 수정 가능
  { field: "unit_price",        headerName:"단가",               minWidth:110, /* cellRenderer: InputInfo */},
  // TODO: cnt * unit_price
  { field: "total_amount",      headerName:"금액",               minWidth:110, },
  // ?
  { field: "tax_code",          headerName:"Tax Code",           minWidth:110, },
  { field: "buyer",             headerName:"Buyer",              minWidth:110, },
  // 수정 가능
  { field: "note_to_buyer",     headerName:"Note to Buyer",      minWidth:110, /* cellRenderer: InputInfo */},
  { field: "requester",         headerName:"Requester",          minWidth:110, },
  { field: "need_to_date",      headerName:"요청납기일",         minWidth:110, },
  { field: "destination_type",  headerName:"Destination Type",   minWidth:110, },
  { field: "organization",      headerName:"Organization",       minWidth:110, },
  { field: "location",          headerName:"Location",           minWidth:110, },
  { field: "warehouse",         headerName:"창고",               minWidth:110, },
  { field: "dist_num",          headerName:"Dist Num",           minWidth:110, },
  { field: "charge_account",    headerName:"Charge Account",     minWidth:110, },
  ]

export const rfqColumn = [
  { colId:1, field:"rfq_no"                     ,headerName:"RFQ번호"   ,minWidth:90},
  { colId:2, field:"rfq_description"            ,headerName:"건 명"     ,minWidth:200},
  { colId:3, field:"reply_method_lookup_code"   ,headerName:"구매 방법" , minWidth:180},
  { colId:4, field:"rfq_ship_to"                ,headerName:"납품 지역" , minWidth:150},
  { colId:5, field:"buyer_id"                   ,headerName:"Buyer"     ,minWidth:110},
  { colId:6, field:"quote_effective_start_date" ,headerName:"등록일"    , minWidth:150},
  { colId:7, field:"rfq_status"                 ,headerName:"Status"    ,minWidth:90}
]

// #endregion


// #region 팝업
export const popUpStaffColFields = [
  { colId:1,  field:"num",  headerName: "직번", minWidth:100},
  { colId:2,  field:"name", headerName: "성명", minWidth:150},
  { colId:3,  field:"dept", headerName: "부서", minWidth:150},
  ];

export const popUpBuyerColFields = [
  { colId:1,  field:"buyer_id",  headerName: "직번", minWidth:100},
  { colId:2,  field:"buyer_name", headerName: "성명", minWidth:150},
  { colId:3,  field:"buyer_dept_code", headerName: "부서", minWidth:150},
  ];

// #endregion
