import { serverAxios } from "apis/axios";

const PREFIX_URL = "/rfq";

// // 전체 불러오기 - 사용x
// export const getRfqList = async () => {
//   try {
//     const { data } = await serverAxios.get(`${PREFIX_URL}/rfq1List`);
//     return data;
//   } catch (err) {
//     throw new Error("Failed to load");
//   }
// };

// 선택한 조건으로 조회
export const getSearchRfqList = async (test) => {
  try {
    // TODO: GET 시도해보기
    console.log("input data : ", test);
    const { data } = await serverAxios.post(`${PREFIX_URL}/rfqSearch`, test);
    console.log("~~~", data);
    return data;
  } catch (err) {
    
    throw new Error("Failed to load");
  }
};

// Status lov
export const getRfqStatusLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/rfqStatus`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// Category lov
export const getRfqCategoryLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/rfqCategory`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// RFQ List에서 행 클릭시 상세조회
export const getRfqInfo = async (id) => {
  try {
    // console.log("id!!!",id);
    const sendData = {id : id}
    const { data } = await serverAxios.post(`${PREFIX_URL}/rfqInfo`, sendData);
    // console.log("!!!", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// selectRFQList/rfq_no 페이지의 공급사 select
export const getSearchVendorList = async (id) => {
  try {
    // console.log("id!!!",id);
    const sendData = {rfq_no : id}
    const { data } = await serverAxios.post(`${PREFIX_URL}/vendorInfo`, sendData);
    console.log("vendor result", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

