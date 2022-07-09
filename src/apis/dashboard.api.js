import { serverAxios } from "apis/axios";

const PREFIX_URL = "/dashboard";

export const getWaitingPr = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/waitingPr`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getTotalPr = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/totalPr`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
