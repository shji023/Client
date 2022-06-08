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
  { colId:11, field:"buyer_id", headerName: "Buyer", minWidth:100},
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



