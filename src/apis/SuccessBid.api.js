import { serverAxios } from "apis/axios";


const PREFIX_URL = "/successBid";

export const getSuccessBid = async (rfqNo) => {
    try {
      console.log(rfqNo);
      const { data } = await serverAxios.post(`${PREFIX_URL}/successBidList`, rfqNo);
  
      return data;
    } catch (err) {
      throw new Error("Failed to load");
    }
  };

export const getBidResult = async (rfqNo) => {
    try {
      console.log(rfqNo);
      const { data } = await serverAxios.post(`${PREFIX_URL}/BidResultList`, rfqNo);
      console.log("data", data);
      
      return data;
    } catch (err) {
      throw new Error("Failed to load");
    }
  };