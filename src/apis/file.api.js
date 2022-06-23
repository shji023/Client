import { serverAxios } from "apis/axios";

const PREFIX_URL = "/file";

// 파일을 서버에 저장
export const uploadFiles = async (sendData) => {
  try {
    console.log("send file: ", sendData);
    const resvData = await serverAxios.post(`${PREFIX_URL}/upload`, sendData).then((res) => {
      console.log("file data : ", res.data);
      return res.data;
    });
    console.log("file resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

// 파일 정보를 DB에 저장
export const uploadContent = async (sendData) => {
  try {
    const resvData = await serverAxios.post(`${PREFIX_URL}/content`, sendData).then((res) => {
      console.log("content data : ", res.data);
      return res.data;
    });
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
};

export const uploadFile = async (formData) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/upload`, formData);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const uploadFileContent = async (content) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/content`, content);
    if (data === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getVendorFileList = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/vendor/${bidding_no}`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
