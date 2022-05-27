import { serverAxios } from "apis/axios";

const PREFIX_URL = "/bid";

// 전체 불러오기 사용x
export const getBidList = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/tt`);
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