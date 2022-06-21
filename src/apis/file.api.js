import { serverAxios } from "apis/axios";

const PREFIX_URL = "/file";

export const uploadFile = async (formData) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/upload`, formData);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};

export const uploadContent = async (content) => {
  try {
    const { data } = await serverAxios.post(`${PREFIX_URL}/content`, content);
    return data;
  } catch (err) {
    throw new Error("Failed to load");
  }
};
