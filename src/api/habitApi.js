import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const getHabits = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/studies`); // GET 요청으로 습관 목록 불러오기
    return response.data;
  } catch (error) {
    console.error("습관 목록 불러오기 실패:", error);
    throw error;
  }
};

export const createHabit = async (habit) => {
  try {
    const response = await api.post("/habits", { name: habit }); // 새로운 습관 생성
    return response.data;
  } catch (error) {
    console.error("습관 생성 실패:", error);
    throw error;
  }
};

export const updateHabitList = async (habits) => {
  try {
    const response = await api.put("/habits", { habits }); // 습관 목록 업데이트
    return response.data;
  } catch (error) {
    console.error("습관 목록 수정 실패:", error);
    throw error;
  }
};
export const getStudyById = async (studyId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/studies/${studyId}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ 스터디 ID ${studyId} 정보를 불러오는데 실패했습니다:`,
      error
    );
    throw error;
  }
};
