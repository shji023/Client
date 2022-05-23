import { serverAxios } from "apis/axios";

const PREFIX_URL = "/po";

export const getPoList = async () => {
  try {
    const { data } = await serverAxios.get(`${PREFIX_URL}/`);
    const { lectures, category, skill } = data.data;

    const result = lectures.map((response) => {
      return {
        name: response.name,
        time: response.time,
        price: response.price,
        replay: response.duration,
        answer: response.reviewTime,
        createdDate: response.startYear,
        tags: response.tags,
        url: response.url,
        site: response.site,
      };
    });

    return {
      result,
      category: { id: category.id, name: category.name },
      skill: { id: skill.id, name: skill.name },
    };
  } catch (err) {
    throw new Error("Failed to load custom process result");
  }
};
