import { serverAxios } from "apis/axios";

const PREFIX_URL = "/rfq";

// // 전체 불러오기 - 사용x
// export const getRfqList = async () => {
//   try {
//     const { data } = await serverAxios.get(`${PREFIX_URL}/rfq1List`);
//     return data;
//   } catch (err) {
//     throw new Error("Failed to load");
//   }
// };

// 선택한 조건으로 조회
export const getSearchRfqList = async (test) => {
  try {
    // TODO: GET 시도해보기
    const { data } = await serverAxios.post(`${PREFIX_URL}/rfqSearch`, test);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// Status lov
export const getRfqStatusLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/rfqStatus`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// Category lov
export const getRfqCategoryLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/rfqCategory`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
