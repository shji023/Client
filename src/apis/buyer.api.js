import { serverAxios } from "apis/axios";

// const PREFIX_URL = "/buyer";
const PREFIX_URL = "/buyer";

// 선택한 조건으로 조회
export const getSearchBuyerList = async (test) => {
  try {
    // console.log("test:", test);
   
    // TODO: GET 시도해보기
    const { data } = await serverAxios.post(`${PREFIX_URL}/buyerSearch`, test);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
