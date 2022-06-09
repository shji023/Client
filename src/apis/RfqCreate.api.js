import { serverAxios } from "apis/axios";

const PREFIX_URL = "/createRfq";

export const getCycleLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/paymentCycle`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
export const getCollaboLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/collaboType`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
export const getPaymentLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/paymentTerm`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
export const getFobLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/fob`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getProductInfoList = async () => {
    try {
      const { data } = await serverAxios.post(`${PREFIX_URL}/ProductInfoList`);
      console.log("ProductInfoList : ", data);
      
      return data;
    } catch (err) {
      throw new Error("Failed to load");
    }
  };
