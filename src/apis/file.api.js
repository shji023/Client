import { serverAxios } from "apis/axios";

const PREFIX_URL = "/file";

export const uploadFiles = async (sendData)=>{
  try {
    console.log("sendData : ", sendData);
    const resvData = await serverAxios.post(`${PREFIX_URL}/upload`, sendData)
    .then((res)=>{
      console.log("data : " , res.data);
      return res.data;
    });
    console.log("resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
}

