import { serverAxios } from "apis/axios";

const PREFIX_URL = "/bid";

// 전체 불러오기 사용x
export const getBidList = async (bidCondition) => {
  try {
    console.log("sendData", bidCondition);
    const { data } = await serverAxios.post(`${PREFIX_URL}/bidSearch`, bidCondition);
    // const { lectures, category, skill } = data.data;

    // const result = lectures.map((response) => {
    //   return {
    //     name: response.name,
    //     time: response.time,
    //     price: response.price,
    //     replay: response.duration,
    //     answer: response.reviewTime,
    //     createdDate: response.startYear,
    //     tags: response.tags,
    //     url: response.url,
    //     site: response.site,
    //   };
    // });

    // return {
    //   result,
    //   category: { id: category.id, name: category.name },
    //   skill: { id: skill.id, name: skill.name },
    // };
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getStatusLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/statusLov`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getCategoryLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/categoryLov`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getRfqInfo = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/rfqInfo/${bidding_no}`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getRuleInfo = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/ruleInfo/${bidding_no}`);

    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getItemInfo = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/itemInfo/${bidding_no}`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getQuotationItemInfo = async (bidding_no) => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/quotationItem/${bidding_no}`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// 입찰유형
export const getBidTypeLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/bidTypeLov`);
    // console.log("data!!!", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// 단가입력방식
export const getBidPriceMethodLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/bidPriceMethodLov`);
    console.log("getBidPriceMethodLov", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// 낙찰제도
export const getBidMethodTypeLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/bidMethodTypeLov`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// Max 라운드
export const getBidMaxRoundLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/bidMaxRoundLov`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// 통화코드
export const getBidCurrencyCodeLov = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/bidCurrencyCodeLov`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

// insertBID
export const insertOneBid = async (sendData) => {
  try {
    // const sendData = { conditions, lines };
    console.log("sendData : ", sendData);

    // !: 비동기
    // TODO: GET 시도해보기
    // const { resvData } = await serverAxios.post(`${PREFIX_URL}/prSearch`, sendData)
    // console.log("resvData ", resvData);
    // return resvData;

    const resvData = await serverAxios.post(`${PREFIX_URL}/bidCreate`, sendData).then((res) => {
      console.log("data : ", res.data);
      return res.data;
    });
    console.log("resvData ", resvData);
    return resvData;
    // return {res: false, data: "1234"};
  } catch (err) {
    // ?: console.log(err); 물어보기
    throw new Error("Failed to load \n" + err);
  }
};

export const getVendorItemList = async (bidding_no, bid_vendor_id, site_id) => {
  try {
    const sendData = {
      bidding_no    : bidding_no,
      bid_vendor_id : bid_vendor_id,
      site_id       : site_id,
    }
    const { data } = await serverAxios.post(`${PREFIX_URL}/getVendorItemList`, sendData);
    console.log("getVendorItemList", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load" + err);
  }
};

export const getVendorComment = async (bid_vendor_id) => {
  try {
    const sendData = {bid_vendor_id : bid_vendor_id}
    const { data } = await serverAxios.post(`${PREFIX_URL}/getVendorComment`, sendData);
    console.log("getVendorComment", data);
    return data;
  } catch (err) {
    throw new Error("Failed to load" + err);
  }
};

export const insertVendorComment = async (itemListData, vendorComment) => {
  try {
    const sendData = {
      itemListData  : itemListData,
      vendorComment : vendorComment
    }
    console.log("sendData", sendData);
    const { data } = await serverAxios.post(`${PREFIX_URL}/insertVendorComment`, sendData);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const updateQuotationInfo = async (quotationInfo) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/updateQuotationInfo`, quotationInfo);
    if (data === "success") {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getBidListBuyer = async (bidConditionBuyer) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/bidBuyerSearch`, bidConditionBuyer);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
