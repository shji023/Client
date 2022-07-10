import { serverAxios } from "apis/axios";


const PREFIX_URL = "/successBid";

export const getSuccessBid = async (rfq_no) => {
    try {
      const sendData = { 
        rfq_no: rfq_no 
      }
      
      const { data } = await serverAxios.post(`${PREFIX_URL}/successBidList`, sendData);
  
      return data;
    } catch (err) {
      throw new Error("Failed to load " + err);
    }
  };

export const getBidResult = async (rfqNo, biddingNo) => {
    try {
      const sendData = {
        rfq_no : rfqNo,
        bidding_no : biddingNo
      }
      const { data } = await serverAxios.post(`${PREFIX_URL}/BidResultList`, sendData);
      console.log("data", data);
      
      return data;
    } catch (err) {
      throw new Error("Failed to load " + err);
    }
  };