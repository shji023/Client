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
    // ?: console.log(err); 물어보기
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


export const insertOnePr = async (conditions, lines) => {
  try {
    
    const sendData = { conditions, lines };
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;

    const resvData = await serverAxios.post(`${PREFIX_URL}/prCreate`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    return resvData;
    // return {res: false, data: "1234"};
  } catch (err) {
    // ?: console.log(err); 물어보기
    throw new Error("Failed to load \n" + err);
  }
};

export const deleteOnePr = async (reqNum) => {
  try {
    
    const sendData = reqNum;
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;

    const resvData = await serverAxios.post(`${PREFIX_URL}/prDelete`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    // return resvData;
    return {res: false, data: "1234"};
  } catch (err) {
    // ?: console.log(err); 물어보기
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
