import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import InputInfo from "components/createRfq/InputInfo";
import InputSelect from "components/createRfq/InputSelect";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InputSearch from "components/common/InputSearch";
import AgVendorSelect from "components/common/AgVendorSelect";
import AgRfqInsert from "components/common/AgRfqInsert";
import AgProductInfo from "components/common/AgProductInfo";
import BidInfo from "components/common/BidInfo";
import { getProductInfoList, getBuyerInfo, insertRfqInfo, insertVendorInfo, deleteRfqInfo } from "apis/RfqCreate.api";
import {getCycleLov, getCollaboLov, getPaymentLov, getFobLov, getshipToLov} from "apis/RfqCreate.api";
import CustomModal from "components/common/CustomModal";
import {popUpVendorColFields} from "stores/colData";
import {getVendorList} from "apis/public.api";
import InputOneDate from "components/common/InputOneDate";
import InputOneDateGrid from "components/common/InputOneDateGrid";
import InputInfoGrid from "components/common/InputInfoGrid";
import { useNavigate, useParams } from "react-router-dom";
function RfqCreate() {
  const { rfq_no } = useParams();

  const [rfqListData, setRfqListData] = useState({
    rfq_no: "",
    simple_quotation_flag:"1", 
    rfq_detail_status:"1",

    // cd_v_meaning_status:"",
    // cd_v_meaning_type:"",
    category_segment:"자재",
    // line_type_id :"",

    rfq_description:"",
    buyer_id: "17278",
    
    po_payment_cycle: "",
    po_collabo_type: "",

    end_date:"",
    amount_limit:"",

    rfq_ship_to:"",
    rfq_payment_terms:"",
    bidding_fob:"",
  });  
  const[selectedVendorList, setSelectedVendorList]=useState([]);

  // 품목정보
  const [productInfoData, setProductInfoData] = useState([]);
  const [buyerInfoData, setBuyerInfoData] = useState([]);

  const [CycleLov, setCycleLov] = useState([]);
  const [CollaboLov, setCollaboLov] = useState([]);
  const [shipToLov, setshipToLov] = useState([]);
  const [PaymentLov, setPaymentLov] = useState([]);
  const [FobLov, setFobLov] = useState([]);

  const selectProductInfo = async () => {
    const data = await getProductInfoList();
    console.log("여기가 찍히는거냐?" );
    console.log(data);
    setProductInfoData(data);
  };
  const selectBuyerInfo = async () => {
    //TODO: buyer_id 받아와서 넣기 
    const data = await getBuyerInfo("17278");
    console.log("받아오는 바이어인포   :   ", data);
    setBuyerInfoData(data);
  };

  const handleRfqInfoCondition = (key, value) => {
    console.log(key, value);
    const tempRfqInfoCondition = { ...rfqListData };

    tempRfqInfoCondition[key] = value;
    setRfqListData(tempRfqInfoCondition);
  };

  const getLov = async () => {
    const Cycle = await getCycleLov();
    const Collabo = await getCollaboLov();
    const Payment = await getPaymentLov();
    const Fob = await getFobLov();
    const shipTo = await getshipToLov();

    Cycle && setCycleLov(Cycle);
    Collabo && setCollaboLov(Collabo);
    Payment && setPaymentLov(Payment);
    Fob && setFobLov(Fob);
    shipTo && setshipToLov(shipTo);
  };
  useEffect(() => {
    getLov();
    selectBuyerInfo();
    selectProductInfo();
  }, []);

  const[visible, setVisible]=useState(false);

  const onHandleOk= ({selectedRows})=>{
    setSelectedVendorList([...selectedRows]);
  }
  
  const onHandleCancel= ()=>{
    console.log("onHandleCancel");
  }

  const onHandleSearch= async (value)=>{

    console.log("value : ", value);

    const sendData = {"vendor_name" : value};
    const resultList = await getVendorList(sendData);

    console.log("resultList", resultList);

    return resultList;
    
  }

  const columnDefs = [
    {field:"item", headerName:"Item", minWidth:10, },
    {field:"description", headerName:"Description", minWidth:10, maxWidth:150,},
    {field:"uom", headerName:"단위", minWidth:10, maxWidth:80,},
    {field:"quantity", headerName:"수량", minWidth:10, maxWidth:80,
      cellRendererSelector : params => {
        return {
          component: InputInfoGrid,
          params: {
            params: params,
            stateValue: productInfoData,
            setStateValue: setProductInfoData,
          }
      }}  
    },
    {field:"end_date", headerName:"납기", minWidth:10, maxWidth:120,
      cellRendererSelector : params => {
        return {
          component: InputOneDateGrid,
          params: {
            params: params,
            stateValue: productInfoData,
            setStateValue: setProductInfoData,
          }
      }}
    },
    {field:"dept_name", headerName:"사용부서", minWidth:10, maxWidth:120,},
    {field:"group_name", headerName:"그룹사", minWidth:10, maxWidth:100,},
    {field:"requisition_num", headerName:"PR번호-Line", minWidth:10, maxWidth:140,},
    {field:"name", headerName:"신청자", minWidth:10, maxWidth:100,},
    {field:"staff_contact_number", headerName:"연락처", minWidth:10, maxWidth:120,},
  ]

  // #region 그리드 관련 이벤트
  const gridRef = useRef();
  const [selectedIds, setSelectedIds] = useState([]);

  // 그리드 행 복사
  const onCopySelected = useCallback( ()=>{
    copyRow();

  })
  const copyRow = () => {
    console.log("copyRow called" );
    let id = 1;
    const tempData = [];
    const ids = [];
    const setRowData = setProductInfoData;

    gridRef.current.api.forEachNode(function (node) {
      tempData.push({...node.data, id: id++});
      if(node.isSelected()){
        ids.push(id-1);
        tempData.push({...node.data, id: id++});
      }
    });   

    setRowData([...tempData]);
    setSelectedIds([...ids]);
  }
  

  // 그리드 행 삭제
  const deleteRow = useCallback( () => {
    console.log("deleteRow called" );
    const rowData = productInfoData;
    const setRowData = setProductInfoData;

    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    if(selectedRowNodes.length === 0) return;

    const selectedIds = selectedRowNodes.map( rowNode => rowNode.data.id );
    const filteredData = rowData.filter( dataItem => selectedIds.indexOf(dataItem.id) < 0 );
    setRowData([...filteredData]);
    setSelectedIds([]);
  } );

  // 그리드 체크항목 유지
  const onRowDataChanged = () => {
    console.log("row changed!!", selectedIds);

    gridRef.current.api.forEachNode( 
      node => selectedIds.includes(node.data.id) && node.setSelected(true)
    )
  }
// #endregion 그리드 관련 이벤트

const navigate = useNavigate();
function reload(){
  document.location.reload();
}

// #region 버튼
const onClickSaveRfq = async () => {
  let res = confirm("최종 저장 하시겠습니까?");
  if(res){
    // TODO : 필수 입력사항 입력했는지 체크하기

    const data = await insertRfqInfo(rfqListData);
    if(data) {
      alert("저장이 완료되었습니다.");
      navigate(`/rfqCreate/${data}`/* , { replace: true} */)
    } else {
      alert("저장 되지 않았습니다.");
    }
    // if(data) 

    // insertVendorInfo(selectedVendorList);
    // insertProductInfo(productInfoData);
  }
}

const onClickDeleteRfq = async () => {
  let res = confirm("삭제 하시겠습니까?");
  if(res){
    // TODO : 서버에서 삭제하기
    const data = await deleteRfqInfo(rfq_no);
    if(data) {
      alert("삭제가 완료되었습니다.");
      // reload();
      navigate(`/rfqCreate`);
    } else {
      alert("삭제가 되지 않았습니다.");
      
    }
  }
}

const onClickUpdateRfq = () => {
  let res = confirm("수정 하시겠습니까?");
  if(res){
    // TODO : 필수 입력사항 입력했는지 체크하기

    // TODO : 서버에서 업데이트하기
    reload();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    // navigate(`/rfqCreate`, { replace: true});

  }
}

const ButtonSelector = () => {
  console.log("rfq_no", rfq_no);
  if(rfq_no) {
      // 수정
    return <>
      <Button onClick={onClickUpdateRfq}>저장</Button>
      <Button onClick={onClickDeleteRfq}>삭제</Button>
    </>

  } else {
    // 생성
    return <Button onClick={onClickSaveRfq}>저장</Button>     
  }
}
// #endregion 버튼

    return (
    <StyledRoot>
        <Title>RFQ 생성</Title>

        <section>
          <SmallTitle>🌐 RFQ 정보</SmallTitle>
          <ButtonWrapper>
            <ButtonSelector />
          </ButtonWrapper>
          
          <RfqInfoContainer>
          
          <BidInfo
            label= "RFQ번호" 
            value= "-"
          />
          <BidInfo
            label= "단계" 
            value= "입찰"
          />
          <BidInfo
            label= "status" 
            value= "작성중"
          />
          <BidInfo
            label= "Type" 
            value= "자재"
          />
          <InputInfo
            id="rfq_description"
            inputLabel="건명"
            handlePoCondition={handleRfqInfoCondition}
            inputValue={rfqListData.rfq_description}
          />
          <BidInfo
            label= "담당자" 
            value= {buyerInfoData.buyer_name+"/ "+buyerInfoData.buyer_dept_name+"/ "+buyerInfoData.buyer_contact}
          />
          <InputSelect
            id="po_payment_cycle"
            inputLabel="정산주기"
            handlePoCondition={handleRfqInfoCondition}
            lov={CycleLov}
          />
          <InputSelect
            id="po_collabo_type"
            inputLabel="협업유형"
            handlePoCondition={handleRfqInfoCondition}
            lov={CollaboLov}
          />
          <InputOneDate
            id="end_date"
            inputLabel="계약기간(BPA)"
            handleCondition={handleRfqInfoCondition}
          />
          <InputInfo
            id="amount_limit"
            inputLabel="Amount Limit(%)"
            handlePoCondition={handleRfqInfoCondition}
            inputValue={rfqListData.amount_limit}
            mySize={200}
          />
          <InputSelect
            id="rfq_ship_to"
            inputLabel="납품지역"
            handlePoCondition={handleRfqInfoCondition}
            lov={shipToLov}
          />
          <InputSelect
            id="rfq_payment_terms"
            inputLabel="지불조건"
            handlePoCondition={handleRfqInfoCondition}
            lov={PaymentLov}
          />
          <InputSelect
            id="bidding_fob"
            inputLabel="인도조건"
            handlePoCondition={handleRfqInfoCondition}
            lov={FobLov}
          />
          <BidInfo
            label= "" 
            value= ""
          />
        </RfqInfoContainer>

        </section>

        <section>
          <SmallTitle>🌐 공급사선정</SmallTitle>
          <CustomModal
            title={"공급사 선택"}
            labelTitle={"공급사명"}
            onHandleOk={onHandleOk}
            onHandleCancel={onHandleCancel}
            onHandleSearch={onHandleSearch}
            gridOptions={{
              columnDefs : popUpVendorColFields,
              rowSelection : "multiple", // single, multiple
              suppressRowClickSelection : false,
            }}
            visible={visible}
            setVisible={setVisible}
          ></CustomModal>
          <ButtonWrapper>
            <Button onClick={() => {
                setVisible(true);
            }}>공급사선정</Button>
          </ButtonWrapper>
          <AgVendorSelect selectedVendorList={selectedVendorList}></AgVendorSelect>
        </section>

        <section>
          <SmallTitle>🌐 RFQ첨부(공급사배포)</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
          </ButtonWrapper>
          <AgRfqInsert ></AgRfqInsert>
        </section>


        <section>
          <SmallTitle>🌐 RFQ첨부(내부결제)</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
          </ButtonWrapper>
          <AgRfqInsert></AgRfqInsert>

        </section>


        <section>
          <SmallTitle>🌐 품목정보</SmallTitle>
          <ButtonWrapper>
            <Button onClick = { onCopySelected }>행 복사</Button>
            <Button onClick = { deleteRow }>행 삭제</Button>
          </ButtonWrapper>
          <AgProductInfo 
            gridRef = { gridRef }
            productInfoData={productInfoData}
            columnDefs={columnDefs}
            onRowDataChanged={onRowDataChanged}
          />
        </section>

    </StyledRoot>
    );
}

export default RfqCreate;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border: 1px solid rgb(225 225 225 / 87%);
  border-radius: 0.5rem;
  padding: 2rem 0.5rem;
  gap: 1rem;
`;
const Button = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: ${colors.mainBlue};
  color: white;
  font-size: 1.6rem;
  font-family: "Pretendard-Regular";
  border-radius: 0.7rem;
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
  margin-bottom: 2rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
const SmallTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;
const RfqInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 2rem 2rem 0.5rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(6) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(10) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(14) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n+11):nth-child(-n+14){
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;
