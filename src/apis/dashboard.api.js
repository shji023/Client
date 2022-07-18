import axios from "axios";

const PREFIX_URL = "/dashboard";

export const getWaitingPr = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/waitingPr`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getTotalPr = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/totalPr`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getWaitingRfq = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/waitingRfq`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const getTotalRfq = async () => {
  try {
    const { data } = await axios.get(`${PREFIX_URL}/totalRfq`);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
