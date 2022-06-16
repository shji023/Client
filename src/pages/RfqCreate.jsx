import { colors } from "assets/styles/color";
import LabelInfo from "components/common/LabelInfo";
import InputInfo from "components/createRfq/InputInfo";
import InputSelect from "components/createRfq/InputSelect";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputSearch from "components/common/InputSearch";
import AgVendorSelect from "components/common/AgVendorSelect";
import AgRfqInsert from "components/common/AgRfqInsert";
import AgProductInfo from "components/common/AgProductInfo";
import BidInfo from "components/common/BidInfo";
import { getProductInfoList, getBuyerInfo, insertRfqInfo, insertVendorInfo } from "apis/RfqCreate.api";
import {getCycleLov, getCollaboLov, getPaymentLov, getFobLov, getshipToLov} from "apis/RfqCreate.api";
import CustomModal from "components/common/CustomModal";
import {popUpVendorColFields} from "stores/colData";
import {getVendorList} from "apis/public.api";
import InputOneDate from "components/common/InputOneDate";
function RfqCreate() {
  const [rfqListData, setRfqListData] = useState({
    rfq_no: "6454916",
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
    return (
    <StyledRoot>
        <Title>RFQ 생성</Title>

        <section>
          <SmallTitle>🌐 RFQ 정보</SmallTitle>
          <ButtonWrapper>
            <Button onClick={() => {
              let del = confirm("삭제 하시겠습니까?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>삭제</Button>
            <Button onClick={() => {
              let save = confirm("최종 저장 하시겠습니까?");
              if(save == true){
                // alert("확인 누름") 
                // insertRfqInfo(rfqListData);
                insertVendorInfo(selectedVendorList);
                // insertProductInfo(productInfoData);
              }
              else
                alert("취소 누름")
            }}>저장</Button>
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
            id="PO_CONTRACT"
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
            <Button onClick={() => {
              let del = confirm("행복사 하쉴?");
              if(del == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>행 복사</Button>
            <Button onClick={() => {
              let save = confirm("행삭제 하쉴?");
              if(save == true)
                alert("확인 누름") 
              else
                alert("취소 누름")
            }}>행 삭제</Button>
          </ButtonWrapper>
          <AgProductInfo productInfoData={productInfoData} ></AgProductInfo>
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
