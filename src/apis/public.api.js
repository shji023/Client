import axios from "axios";

const PREFIX_URL = "/public";

export const getStaffList = async (value) => {
  try {
    const sendData = { name: value };
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;
    const resvData = await axios.post(`${PREFIX_URL}/staffSearch`, sendData).then((res) => {
      console.log("data : ", res.data);
      return res.data;
    });
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const getBuyerList = async (value) => {
  try {
    const sendData = { buyer_name: value };
    console.log(sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;
    const resvData = await axios.post(`${PREFIX_URL}/getBuyerList`, sendData).then((res) => {
      // console.log("data : " , res.data);
      return res.data;
    });
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const getItemList = async (value) => {
  try {
    console.log("getItemList!!!");
    const sendData = { item: value };
    console.log(sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;
    const resvData = await axios.post(`${PREFIX_URL}/getItemList`, sendData).then((res) => {
      console.log("data : ", res.data);
      return res.data;
    });
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const getVendorList = async (sendData) => {
  try {
    console.log("sendData : ", sendData);
    const resvData = await axios.post(`${PREFIX_URL}/vendorSearch`, sendData).then((res) => {
      console.log("data : ", res.data);
      return res.data;
    });
    console.log("resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};
