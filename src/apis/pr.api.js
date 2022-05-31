import { serverAxios } from "apis/axios";

const PREFIX_URL = "/pr";

export const getSearchPrList = async (sendData) => {
  try {
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

export const getPrSatusLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/prStatusLov`);
    console.log("getPrSatusLov", data)
    return data;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};


