// BidList Datagrid
export const bidColFields =[
  { colId:1, field:"category_segment", headerName: "부문", minWidth:100, },
  { colId:2, field:"rfq_no", headerName: "RFQ번호", minWidth:150 },
  { colId:3, field:"bidding_no", headerName: "입찰번호", minWidth:150},
  { colId:4, field:"rfq_description", headerName: "건명", minWidth:300},
  { colId:5, field:"simple_quotation_flag", headerName: "단계", minWidth:100},
  { colId:6, field:"bid_search_type", headerName: "Status", minWidth:100},
  { colId:7, field:"reply_method_lookup_code", headerName: "입찰방법", minWidth:150},
  { colId:8, field:"bid_price_method", headerName: "단가입력방법", minWidth:150},
  { colId:9, field:"bidding_start_date", headerName: "입찰개시일시", minWidth:200},
  { colId:10, field:"bidding_end_date", headerName: "입찰마감일시", minWidth:200},
  { colId:11, field:"buyer_name", headerName: "담당자", minWidth:100},
  { colId:12, field:"buyer_contact", headerName: "전화번호", minWidth:100},
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
  editable: true,
  sortable: true,
  enablePivot: true,
  enableValue: true,
  flex: 1,
  minWidth: 100,
  filter: true,
  resizable: true,

  headerClass: { background: '#EDF2F8' },
  // floatingFilter: true,
}

export const rfqColumn = [
  { colId:1, field:"rfq_no"                     ,headerName:"RFQ번호"   ,minWidth:10,     maxWidth: 110},
  { colId:2, field:"rfq_description"            ,headerName:"건 명"     ,minWidth:10,     maxWidth: 850},
  { colId:3, field:"reply_method_lookup_code"   ,headerName:"구매 방법" , minWidth:10,     maxWidth: 130},
  { colId:4, field:"rfq_ship_to"                ,headerName:"납품 지역" , minWidth:10,     maxWidth: 180},
  { colId:5, field:"buyer_id"                   ,headerName:"Buyer"     ,minWidth:10,      maxWidth: 110},
  { colId:6, field:"quote_effective_start_date" ,headerName:"등록일"    , minWidth:10,     maxWidth: 140},
  { colId:7, field:"rfq_status"                 ,headerName:"Status"    ,minWidth:10,     maxWidth: 100},
]

// #endregion


// #region 팝업
export const popUpStaffColFields = [
  { colId:1,  field:"num",  headerName: "직번", minWidth:100},
  { colId:2,  field:"name", headerName: "성명", minWidth:150},
  { colId:3,  field:"dept", headerName: "부서", minWidth:150},
  ];

export const popUpVendorColFields = [
  {
                headerName:"..HELLO.",
                headerCheckboxSelection:true,
                checkboxSelection:true,
                floatingFilter:false,
                suppressMenu:true,
                minWidth:10,
                maxWidth:100,
                width:50,
                flex:0,
                resizable:false,
                sortable:false,
                editable:false,
                filter:false,
                suppressColumnsToolPanel:true,
  },
  { colId:1,  field:"vendor_name",  headerName: "공급사", minWidth:100},
  { colId:2,  field:"contact_name", headerName: "담당자", minWidth:150},
  { colId:3,  field:"contact_email_address", headerName: "email", minWidth:150},
  { colId:3,  field:"contact_mobile", headerName: "연락처", minWidth:150},
  ];

export const popUpBuyerColFields = [
  { colId:1,  field:"buyer_id",  headerName: "직번", minWidth:100},
  { colId:2,  field:"buyer_name", headerName: "성명", minWidth:150},
  { colId:3,  field:"buyer_dept_code", headerName: "부서", minWidth:150},
  ];

export const popUpItemColFields = [
  { colId:1,  field:"item",  headerName: "아이템", minWidth:100},
  { colId:2,  field:"description", headerName: "사양", minWidth:150},
  { colId:3,  field:"category", headerName: "카테고리", minWidth:150},
  { colId:3,  field:"uom", headerName: "단위", minWidth:150},
  ];

// #endregion 팝업

export const ItemInfoColFields =[
  { colId:1, field:"category_SEGMENT", headerName: "부문", minWidth:100, },
  { colId:2, field:"rfq_NO", headerName: "RFQ번호", minWidth:150 },
  { colId:3, field:"bidding_NO", headerName: "입찰번호", minWidth:150},
  { colId:4, field:"rfq_DESCRIPTION", headerName: "건명", minWidth:300},
  { colId:5, field:"simple_QUOTATION_FLAG", headerName: "단계", minWidth:100},
  { colId:6, field:"bid_SEARCH_TYPE", headerName: "Status", minWidth:100},
  { colId:7, field:"reply_METHOD_LOOKUP_CODE", headerName: "입찰방법", minWidth:150},
  { colId:8, field:"bid_PRICE_METHOD", headerName: "단가입력방법", minWidth:150},
  { colId:9, field:"bidding_START_DATE", headerName: "입찰개시일시", minWidth:200},
  { colId:10, field:"bidding_END_DATE", headerName: "입찰마감일시", minWidth:200},
  { colId:11, field:"buyer_ID", headerName: "Buyer", minWidth:100},
  ];

  // rfq vendor select
  export const RfqSelectVendorColFields = [
    {colId:1, field:"vendor_name",            headerName:"공급사",    minWidth:10},
    {colId:2, field:"contact_name",           headerName:"담당자",    minWidth:10},
    {colId:3, field:"contact_email_address",  headerName:"e-mail",    minWidth:10},
    {colId:4, field:"contact_mobile",         headerName:"연락처",    minWidth:10},
  ];

