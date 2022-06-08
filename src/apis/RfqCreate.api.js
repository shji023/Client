import { serverAxios } from "apis/axios";

const PREFIX_URL = "/createRfq";

export const getProductInfoList = async () => {
    try {
      console.log("eoifjweoijfwoeijfoiwejfoijwefoijewoifj");
      const { data } = await serverAxios.post(`${PREFIX_URL}/ProductInfoList`);
      console.log("ProductInfoList : ", data);
      
      return data;
    } catch (err) {
      throw new Error("Failed to load");
    }
  };
