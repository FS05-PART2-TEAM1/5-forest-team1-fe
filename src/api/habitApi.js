import axiosClient from "./axios";

const habitApi = {
  getHabits: async (studyId, start, end) => {
    try {
      const response = await axiosClient.get(
        `api/studies/${studyId.studyId}/habits?start=${start}&end=${end}`,
        { timeout: 10000 }
      );
      return response.data;
    } catch (error) {
      console.error("습관 데이터를 불러오는 중 오류 발생:", error);
      throw error;
    }
  },
};

export default habitApi;
