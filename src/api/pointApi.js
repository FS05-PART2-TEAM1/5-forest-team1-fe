import axiosClient from "./axios";

// 포인트 조회
export const fetchPoints = async (studyId) => {
  try {
    const response = await axiosClient.get(`/api/studies/${studyId}`);
    return response.data.totalPoints;
  } catch (error) {
    console.error("포인트 로딩 실패:", error);
    throw error;
  }
};

// 포인트 업데이트
export const updatePoints = async (studyId, pointData) => {
  try {
    const response = await axiosClient.post(
      `/api/studies/${studyId}/points`,
      pointData
    );
    return response.data;
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
