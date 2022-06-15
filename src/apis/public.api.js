import { serverAxios } from "apis/axios";

const PREFIX_URL = "/public";

export const getStaffList = async (sendData) => {
  try {
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;
    const resvData = await serverAxios.post(`${PREFIX_URL}/staffSearch`, sendData)
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

export const getVendorList = async (sendData)=>{
  try {
    console.log("sendData : ", sendData);
    const resvData = await serverAxios.post(`${PREFIX_URL}/vendorSearch`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    })
    console.log("resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
}