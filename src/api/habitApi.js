import axiosClient from "./axios";

const habitApi = {
  getHabits: async (studyId) => {
    try {
      const response = await axiosClient.get(
        `http://localhost:5004/api/studies/9a1c0e3d-889b-47f1-90cd-75ccd7ab39d3/habits`
      );
      return response.data;
    } catch (error) {
      console.error("습관 데이터를 불러오는 중 오류 발생:", error);
      throw error;
    }
  },
};

export default habitApi;
