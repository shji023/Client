import axios from "axios";

const PREFIX_URL = "/createRfq";

// export const getRfqInfo = async (id) => {
//   try {
//     console.log("id!!!",id);
//     const sendData = {id : id}
//     const { data } = await serverAxios.post(`${PREFIX_URL}/rfqInfo`, sendData);
//     console.log("!!!", data);
//     return data;
//   } catch (err) {
//     throw new Error("Failed to load " + err);
//   }
// };

export const getCycleLov = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/paymentCycle`);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const getCollaboLov = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/collaboType`);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const getPaymentLov = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/paymentTerm`);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const getFobLov = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/fob`);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const getshipToLov = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/shipTo`);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};

export const getProductInfoList = async (reqNumList) => {
  try {
    const sendData = { reqNum: reqNumList };
    console.log("sendData", sendData);
    const { data } = await axios.post(`${PREFIX_URL}/ProductInfoList`, sendData);
    console.log("ProductInfoList :::::::: ", data);

    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};

export const getBuyerInfo = async (buyer_id) => {
  try {
    const sendData = { buyer_id: buyer_id };
    const { data } = await axios.post(`${PREFIX_URL}/getBuyerInfo`, sendData);
    console.log("getBuyerInfo : ", data);

    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};

export const insertRfqInfo = async (conditions, vendorList, productList, prNumList) => {
  try {
    // const sendData = conditions;
    console.log("reqNumList", prNumList);
    const sendData = {
      conditions: conditions,
      vendorList: vendorList,
      productList: productList,
      // vendorFile  : vendorFile,
      // innerFile   : innerFile,
      prNumList: prNumList,
    };
    console.log("sendData", sendData);

    const { data } = await axios.post(`${PREFIX_URL}/insertRfqInfo`, sendData);
    console.log("insertRfqInfo : ", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const deleteRfqInfo = async (rfq_no) => {
  try {
    console.log("rfq_no !!!!!!!!!!!!!!!!!!!!!!", rfq_no);
    const sendData = { rfq_no: rfq_no };
    console.log(sendData);
    const { data } = await axios.post(`${PREFIX_URL}/deleteRfqInfo`, sendData);
    console.log("deleteRfqInfo : ", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const updateRfqInfo = async (
  conditions,
  vendorList,
  productList,
  deletedVendorIdList,
  deletedProductIdList,
) => {
  try {
    const sendData = {
      conditions: conditions,
      vendorList: vendorList,
      productList: productList,
      deletedVendorIdList: deletedVendorIdList,
      deletedProductIdList: deletedProductIdList,
    };
    console.log("sendData", sendData);
    const { data } = await axios.post(`${PREFIX_URL}/updateRfqInfo`, sendData);
    console.log("updateRfqInfo : ", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
export const insertVendorInfo = async (conditions) => {
  try {
    console.log("conditions*******", conditions);
    const sendData = conditions;
    console.log("sendData********", sendData);
    const { data } = await axios.post(`${PREFIX_URL}/insertVendorInfo`, sendData);
    console.log("insertVendorInfo : ", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};

export const selectRfq = async (rfq_no) => {
  try {
    const sendData = { rfq_no: rfq_no };
    const { data } = await axios.post(`${PREFIX_URL}/selectRfq`, sendData);
    console.log("selectRfq data :::", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load " + err);
  }
};
