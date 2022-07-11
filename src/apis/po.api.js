import { serverAxios } from "apis/axios";

const PREFIX_URL = "/po";

// 전체 불러오기 사용x
export const getPoSearch = async (id) => {
  try {
    const sendData = {po_num : id}
    const { data } = await serverAxios.post(`${PREFIX_URL}/poSearch`, sendData);
    console.log(data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getSearchPoList = async (test) => {
  try {
    // TODO: GET 시도해보기
    const { data } = await serverAxios.post(`${PREFIX_URL}/poSearch1`, test);
    console.log("data", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getPoLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/poCategory`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getPoApproveLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/poApproved`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getSasoLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/poSaso`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getPoTypeLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/poType`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// #region Po 저장 페이지

// PoRegist Lov 
export const getPoRegistLov = async (key) => {
  try {
    const sendData = {"cd_v" : key}
    const { data } = await serverAxios.post(`${PREFIX_URL}/getLovItem`, sendData);

    return data;
  } catch (err) {
    throw new Error("Failed to load" + console.error());
  }
};

export const checkFatFinger = async (itemList) => {
  try {
    const sendData = itemList;
    const { data } = await serverAxios.post(`${PREFIX_URL}/checkFatFinger`, sendData);
    console.log("checkFatFinger", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load" + err);
  }
};

// PoRegist Create
export const insertOnePo = async (conditions, lines) => {
  try {
    
    const sendData = { conditions, lines };
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/poCreate`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const updateOnePo = async (conditions, lines, deletedIdList) => {
  try {
    
    const sendData = { conditions, lines, deletedIdList };
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/poUpdate`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const deleteOnePo = async (po_num) => {
  try {
    
    const sendData = {"po_num" : po_num};
    console.log("sendData : ", sendData);

    const resvData = await serverAxios.post(`${PREFIX_URL}/poDelete`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    // return resvData;
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

// #endregion Po 저장 페이지
