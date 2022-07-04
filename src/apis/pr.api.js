import { serverAxios } from "apis/axios";

const PREFIX_URL = "/pr";

/**
 * PR 신청 목록을 불러온다.
 * - Line 관련 항목의 경우
 * -  1) Line 관련 검색 필터를 사용하지 않았다면, 첫 Line 항목 정보를 불러온다.
 * -  2) Line 관련 검색 필터를 사용했다면, 해당되는 Line 항목 정보를 불러온다.
 * @param {*} sendData 
 * @returns 
 */
export const getSearchPrList = async (sendData) => {
  try {
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;
    const resvData = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

/**
 * PR 상태 Lov를 불러온다.
 * @returns 
 */
// TODO: uri 철자 틀린 거 바꾸기
export const getPrStatusLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/prStatusLov`);
    console.log("getPrStatusLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};


export const getPr = async (reqNum) => {
  try {
    
    // const sendData = reqNum;
    const sendData = {"requisitionNumber": reqNum};
    console.log("sendData!!!!!! : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/prSelect`, sendData)
    .then((res)=>{
      console.log("axios data : " , res.data);

      const data = res.data;

      const pr1 = {
        req_num : data.requisitionNumber,
        preparer_name : data.preparerName,
        preparer_id : data.preparerId,
        // auth_date : ,
        description : data.description,
        currency_code : data.currencyCode,
        pur_pct_agm_rsn : data.purPctAgmRsn,
        
      }
      console.log("pr1 ::: ", pr1);

      const dataList = res.data.pr2VoList;
      console.log("dataList ", dataList);
      const pr2List = [];
      dataList && dataList.forEach(element => {
        console.log("element :::", element);
        const pr2 = {
          requisition_line_id : element.requisitionLineId,
          // line: element.1, // !
          item: element.item,
          item_id: element.itemId,
          category: element.categoryName,
          category_id: element.categoryId,
          description: element.itemDescription,
          uom: element.unitMeasLookupCode,
          cnt: element.quantity,
          unit_price: element.unitPrice,
          // total_amount: element., // !
          tax_code: element.taxCode,
          buyer_name: element.buyerName,
          buyer_id: element.buyerId, 
          note_to_buyer: element.noteToAgent,
          requester_name: element.requesterName,
          requester_id: element.requestPersonId,
          need_to_date: element.needByDate,
          destination_type: element.destinationTypeCode,
          organization: element.organizationCode,
          location: element.deliverToLocationId,
          warehouse: element.destinationSubinventory,
          dist_num: 1,
          cnt_dept: element.quantityDelivered,
          charge_account: element.accountNm,
          // * 사용될 DB 쿼리 종류
          query_type: "update",
        }
        pr2List.push(pr2);
      });
      
    
      console.log("ajfkasdjkfl!@!@!@", pr1, pr2List);
      const pr = {
        pr1 : pr1,
        pr2 : pr2List,
      }

      // return res.data;
      return pr;

    })
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};


export const insertOnePr = async (conditions, lines) => {
  try {
    
    const sendData = { conditions, lines };
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/prCreate`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const updateOnePr = async (conditions, lines, deletedIdList) => {
  try {
    
    const sendData = { conditions, lines, deletedIdList };
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/prUpdate`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const deleteOnePr = async (reqNum) => {
  try {
    
    const sendData = {"requisitionNumber": reqNum};
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/prDelete`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    // return resvData;
    return {res: false, data: "1234"};
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

/**
 * PR 신청 수의사유 Lov를 불러온다.
 * @returns 
 */
export const getPrReasonLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/prReasonLov`);
    console.log("getPrReasonLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};


/**
 * PR Organization Code Lov를 불러온다.
 * @returns 
 */
export const getOrgLov = async () => {
  try {
    // TODO: 쿼리 만들기
    // const { data } = await serverAxios.get(`${PREFIX_URL}/getOrgLov`);
    // * 임시 데이터
    const data = [
      ["PM",  "POSCO 포항자재/외주/투자(PM)"],
      ["KM",  "POSCO 광양자재/외주/투자(KM)"],
      ["HQ",  "POSCO 본사"],
      ["P00", "포스코-포항-구매원료"],
      ["K00", "포스코-광양-구매원료"]
    ];
    console.log("getOrgLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

/**
 * PR DestinationType Lov를 불러온다.
 * @returns 
 */
export const getDestLov = async () => {
  try {
    // TODO: 쿼리 만들기
    // const { data } = await serverAxios.get(`${PREFIX_URL}/getDestLov`);
    // * 임시 데이터
    const data = [
      ["EXPENSE",   "EXPENSE"],
      ["INVENTORY", "INVENTORY"]
    ];
    console.log("getDestLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

/**
 * PR Tax Code Lov를 불러온다.
 * @returns 
 */
export const getTaxCodeLov = async () => {
  try {
    // TODO: 쿼리 만들기
    // const { data } = await serverAxios.get(`${PREFIX_URL}/getDestLov`);
    // * 임시 데이터
    const data = [
      ["P영세율매입",	"P영세율매입"],
      ["P매입세불공제",	"P매입세불공제"],
      ["P매입세공제",	"P매입세공제"],
      ["K영세율매입",	"K영세율매입"],
      ["K매입세불공제",	"K매입세불공제"],
      ["K매입세공제",	"K매입세공제"]
    ];
    console.log("getDestLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};
