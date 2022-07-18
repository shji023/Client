import axios from "axios";

// const PREFIX_URL = "/buyer";
const PREFIX_URL = "/buyer";

// 선택한 조건으로 조회
export const getSearchBuyerList = async (buyer_name) => {
  try {
    // console.log("buyerId:", buyerId);

    // TODO: GET 시도해보기
    const sendData = { buyer_name: buyer_name };
    console.log("sendData", sendData);
    const { data } = await axios.post(`${PREFIX_URL}/buyerSearch`, sendData);
    console.log("data:!!!!", data);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
