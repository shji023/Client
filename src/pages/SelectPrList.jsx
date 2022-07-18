import { getSearchPrList, getPrStatusLov } from "apis/pr.api";
import { colors } from "assets/styles/color";
import AgGrid from "components/pr/PrGrid";
import InputInfo from "components/common/InputInfo";
import InputSearch from "components/common/InputSearch";
import InputSelect from "components/common/InputSelect";
import { getDiffDate, getFormattedDate, getNumberFormat } from "hooks/CommonFunction";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  popUpBuyerColFields,
  popUpItemColFields,
  popUpStaffColFields,
  prSelectColDef,
} from "stores/colData";
import { getBuyerList, getItemList, getStaffList } from "apis/public.api";
import moment from "moment";
import { Button } from "components/common/CustomButton";
import { HeaderWrapper } from "components/common/CustomWrapper";
import { useNavigate } from "react-router-dom";
import pageData from "stores/PageData";
import { showGridLoading } from "components/common/CustomGrid";

function selectPrList() {
  const navigate = useNavigate();

  // 조회 데이터
  const [conditions, setConditions] = useState({
    requisition_number: "",
    description: "",
    requester_id: "",
    requester_name: "",
    item_id: "",
    item_name: "",
    item_description: "",
    type_lookup_code: "",
    buyer_id: "",
    buyer_name: "",
    category_id: "",
    category_name: "",
  });

  const [selectedData, setSelectedData] = useState([]);
  const [prStatusLov, setPrStatusLov] = useState([]);

  const handlePoCondition = (key, value) => {
    const tempPoCondition = { ...conditions };
    tempPoCondition[key] = value;
    setConditions({ ...tempPoCondition });
  };

  // #region 헤더 팝업 이벤트
  const onHandleSearchItem = async (searchWord) => {
    const resultList = await getItemList(searchWord);
    return resultList;
  };

  const onHandleOkItem = ({ selectedRows }) => {
    const row = selectedRows[0];

    const temp = conditions;
    console.log(row);
    temp.item_id = row.id;
    temp.item_name = row.item;
    setConditions({ ...temp });

    return temp.item_name;
  };

  const onHandleSearchRequester = async (value) => {
    const resultList = await getStaffList(value);
    return resultList;
  };

  const onHandleOkRequester = ({ selectedRows }) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];

    const temp = conditions;
    temp.requester_id = row.id;
    temp.requester_name = row.name;
    setConditions({ ...temp });

    return temp.requester_name;
  };

  const onHandleSearchBuyer = async (value) => {
    const resultList = await getBuyerList(value);
    return resultList;
  };

  const onHandleOkBuyer = ({ selectedRows }) => {
    console.log("called onHandleOk1");
    console.log("selectedRows", selectedRows);

    const row = selectedRows[0];

    const temp = conditions;
    temp.buyer_id = row.buyer_id;
    temp.buyer_name = row.buyer_name;
    setConditions({ ...temp });

    return temp.buyer_name;
  };
  // #endregion 팝업 이벤트 

  const selectPrList = async () => {
    showGridLoading(gridRef, true);

    // !: axios 비동기
    const data = await getSearchPrList(conditions);
    console.log("getSearchPrList called : ", data);

    const tempList = [];
    if (data) {
      data.forEach((element) => {
        // TODO: 나중에 DB에서 조인해서 가져와야됨
        // typeLookupCode
        switch (element.type_lookup_code) {
          case "PR": element.type_lookup_code = "구매신청";     break;
          case "NT": element.type_lookup_code = "엔투비이관";   break;
          case "MT": element.type_lookup_code = "발주방안검토"; break;
          case "RQ": element.type_lookup_code = "ITB";          break;
          case "OP": element.type_lookup_code = "공개구매";     break;
          case "TP": element.type_lookup_code = "단순견적";     break;
          case "BD": element.type_lookup_code = "업체선정중";   break;
          case "PO": element.type_lookup_code = "계약대기중";   break;
          case "PA": element.type_lookup_code = "계약완료";     break;
          case "PC": element.type_lookup_code = "계약취소";     break;
        }

        let temp = {
          // Pr1
          line: element.line,
          typeLookupCode: element.type_lookup_code,
          // purPctAgmRsn: element.purPctAgmRsn,
          rfq_no: element.rfq_no,
          requisitionNumber: element.requisition_number,
          currencyCode: element.currency_code,
          description: element.description,
          requisitionHeaderId: element.requisition_header_id,

          // Pr2
          categoryId: element.category,
          amount: element.quantity * element.unit_price,
          needByDate: element.need_by_date,
          requestPersonId: element.staff_name,
          organizationCode: element.suggested_vendor_name,
        };
        tempList.push(temp);
      });
    }

    setSelectedData([...tempList]);

    showGridLoading(gridRef, false);
  };

  // RFQ 생성 버튼 이벤트
  const cerateRfq = async () => {
    const selectedRowNodes = gridRef.current.api.getSelectedNodes();
    const prNumList = [];
    let rfq_no;
    selectedRowNodes.forEach((element) => {
      prNumList.push(element.data.requisitionNumber);
      rfq_no = element.data.rfq_no;
    });
    
    console.log("selected", prNumList);

    // ! MobX
    if (prNumList.length > 0) {
      if(rfq_no) {
        alert("이미 생성된 RFQ가 있습니다.");
      } else {
        pageData.setPrNumList(prNumList);
        confirm("선택하신 구매신청을 기준으로 RFQ를 생성하시겠습니까?")
          ? navigate(`/rfqCreate`)
          : null;
      }
      
    } else {
      alert("구매신청을 선택해주세요.");
    }
  };

  const getLov = async () => {
    const statusLov = await getPrStatusLov();
    statusLov && setPrStatusLov(statusLov);
  };

  useEffect(() => {
    getLov();
  }, []);

  // #region 그리드
  const gridRef = useRef();

  const prSelectColFields = [
    {
      field: null,
      headerCheckboxSelection: true,
      maxWidth: 50,
      pinned: "left",
      checkboxSelection: true,
    },
    { field: "line", headerName: "순번", minWidth: 100 },
    { field: "typeLookupCode", headerName: "Status", minWidth: 150 },
    {
      field: "rfq_no",
      headerName: "RFQ번호",
      minWidth: 150,
      valueGetter: (params) => (!params.data.rfq_no ? "-" : params.data.rfq_no),
    },
    {
      field: "dateInterval",
      headerName: "경과일",
      minWidth: 100,
      valueGetter: (params) => {
        const diff = getDiffDate(new moment(), params.data.needByDate, "day");
        return diff < 0 ? 0 : diff;
      },
    },
    { field: "categoryId", headerName: "Category", minWidth: 140 },
    { field: "requisitionNumber", headerName: "PR번호", minWidth: 140 },
    { field: "description", headerName: "건명", minWidth: 300 },
    {
      field: "amount",
      headerName: "금액",
      minWidth: 150,
      valueGetter: (params) => getNumberFormat(params.data.amount),
    },
    { field: "currencyCode", headerName: "단위", minWidth: 80 },
    { field: "needByDate", headerName: "요청납기일", minWidth: 140,
      valueGetter: (params) => getFormattedDate(params.data.needByDate)
    },
    { field: "requestPersonId", headerName: "Requester", minWidth: 140 },
    { field: "organizationCode", headerName: "사용부서", minWidth: 200,
      valueGetter: (params) => (!params.data.organizationCode ? "-" : params.data.organizationCode),
    },
  ];
  // #endregion 그리드

  return (
    <StyledRoot>
      <section>
        <HeaderWrapper>
          <Title>구매신청조회</Title>
          <Button onClick={selectPrList}>조회</Button>
        </HeaderWrapper>
        <InputContainer>
          <InputInfo
            id="requisition_number"
            inputLabel="PR 번호"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.requisition_number}
          />
          <InputInfo
            id="description"
            inputLabel="건명"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.description}
          />
          <InputSearch
            id="requester_name"
            title="직원선택"
            inputLabel="Requester"
            initValue={conditions.requester_name}
            onHandleSearch={onHandleSearchRequester}
            onHandleOk={onHandleOkRequester}
            onHandleCancel={null}
            gridOptions={{
              columnDefs: popUpStaffColFields,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputSearch
            id="item_id"
            title="물품선택"
            inputLabel="Item"
            initValue={conditions.item_name}
            onHandleSearch={onHandleSearchItem}
            onHandleOk={onHandleOkItem}
            onHandleCancel={null}
            gridOptions={{
              columnDefs: popUpItemColFields,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputInfo
            id="item_description"
            inputLabel="사양"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.item_description}
          />
          <InputSelect
            id="type_lookup_code"
            inputLabel="진행상태"
            initValue={conditions.type_lookup_code}
            handlePoCondition={handlePoCondition}
            lov={prStatusLov}
          />
          <InputSearch
            id="buyer_id"
            title="바이어선택"
            inputLabel="Buyer"
            initValue={conditions.buyer_name}
            onHandleSearch={onHandleSearchBuyer}
            onHandleOk={onHandleOkBuyer}
            onHandleCancel={null}
            gridOptions={{
              columnDefs: popUpBuyerColFields,
              rowSelection: "single", // single, multiple
              suppressRowClickSelection: false,
            }}
          />
          <InputInfo
            id="category_name"
            inputLabel="Category"
            handlePoCondition={handlePoCondition}
            inputValue={conditions.category_name}
          />
        </InputContainer>
      </section>
      <section>
        <ButtonWrapperLine>
          <Button onClick={cerateRfq}>RFQ 생성</Button>
        </ButtonWrapperLine>
      </section>
      <section>
        <AgGrid
          resvRef           = {gridRef}
          resvRowData       = {selectedData}
          resvDefaultColDef = {prSelectColDef}
          resvColumnDefs    = {prSelectColFields}
          rowSelection      = {"single"}
          onRowClicked      = {(e) => {
            confirm("구매 신청을 조회하시겠습니까?")
              ? navigate(`/createPr/${e.data.requisitionNumber}`)
              : null;
          }}
        />
      </section>
    </StyledRoot>
  );
}

export default selectPrList;

const StyledRoot = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

// const InputContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr;
//   border: 1px solid rgb(225 225 225 / 87%);
//   border-radius: 0.5rem;
//   padding: 2rem 0.5rem;
//   gap: 1rem;
// `;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(27rem, 1fr));
  padding: 2rem 0rem;
  & > div:nth-of-type(4) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-of-type(8) {
    & > div:nth-of-type(2) {
      border-right: 1px solid ${colors.tableLineGray};
    }
  }
  & > div:nth-child(n + 4):nth-child(-n + 8) {
    border-bottom: 1px solid ${colors.tableLineGray};
  }
`;

const ButtonWrapperLine = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListCount = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
  font-family: "Pretendard-SemiBold";
`;
