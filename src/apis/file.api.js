import { serverAxios } from "apis/axios";

const PREFIX_URL = "/file";

export const uploadFiles = async (sendData)=>{
  try {
    console.log("send file: ", sendData);
    const resvData = await serverAxios.post(`${PREFIX_URL}/upload`, sendData)
    .then((res)=>{
      console.log("file data : " , res.data);
      return res.data;
    });
    console.log("file resvData ", resvData);
    return resvData;
  } catch (err) {
    throw new Error("Failed to load \n" + err);
  }
}

// export const uploadContent = async (sendData)=>{
//     try {
//       console.log("send content : ", sendData);
//       const resvData = await serverAxios.post(`${PREFIX_URL}/content`, sendData)
//       .then((res)=>{
//         console.log("content data : " , res.data);
//         return res.data;
//       });
//       return resvData;
//     } catch (err) {
//       throw new Error("Failed to load \n" + err);
//     }
//   }


  export const uploadContent = async (file, content)=>{
    try {
      const sendData = {
        file : file,
        content : content,
      }
      console.log("sendData", sendData);
      const resvData = await serverAxios.post(`${PREFIX_URL}/content`, sendData)
      .then((res)=>{
        console.log("content data : " , res.data);
        return res.data;
      });
      return resvData;
    } catch (err) {
      throw new Error("Failed to load \n" + err);
    }
  };


  // RFQ 생성, BiddingRule 설정
  export const getStatusLov1 = () => {
      const data = ['약관', '구입사양서', '기타'];
      return data;
  };

  // 응찰서 작성
  export const getStatusLov2 = () => {
    const data = ['기타'];
    return data;
};




