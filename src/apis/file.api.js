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
    console.log(err);
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
    console.log(err);
  }
};

export const uploadFile = async (formData) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/upload`, formData);
    return data;
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};

export const getVendorFileList = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/vendor/${bidding_no}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const downloadFile = async (fileId) => {
  try {
    const sendData = { file_id : fileId }
    const { data } = await serverAxios.post(`${PREFIX_URL}/download`, sendData, { responseType: 'blob' })
    .then((response) => {
      console.log("response ::: ", response);
      const name = response.headers['content-disposition'].split('fileName=')[1]
      const decodedName = decodeURIComponent(name);
      console.log(response.headers)
      console.log(name)
      console.log(decodeURIComponent(name))
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', decodedName)
      link.style.cssText = 'display:none'
      document.body.appendChild(link)
      link.click()
      link.remove()
    })

    return data;
  } catch (err) {
    console.log(err);
  }
};