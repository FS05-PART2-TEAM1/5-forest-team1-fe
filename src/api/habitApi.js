import axiosClient from "./axios";

const habitApi = {
  /**
   * Fetch habit list by studyId
   * @param {string} studyId - The ID of the study
   * @returns {Promise<object[]>} - Returns a list of habits
   */
  getHabitsList: async (studyId) => {
    try {
      const response = await axiosClient.get(`/api/studies/${studyId}/habits`);
      if (!response.data || !Array.isArray(response.data.habitList)) {
        console.error(
          "🚨 [getHabits 오류]: 서버 응답이 올바르지 않습니다!",
          response.data
        );
        return [];
      }

      // ✅ 삭제되지 않은 습관만 반환 (createdAt 기준 정렬 추가)
      return response.data.habitList
        .filter((habit) => habit.deletedAt === null)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((habit) => ({
          id: habit.id,
          name: habit.name,
          createdAt: habit.createdAt, // 정렬을 위해 유지
          deletedAt: habit.deletedAt,
        }));
    } catch (error) {
      console.error("❌ [getHabits 오류]:", error);
      return [];
    }
  },
  toggleHabitCompletion: async (studyId, habitId, isCompleted) => {
    try {
      const response = await axiosClient.post(
        `/api/studies/${studyId}/habits/${habitId}/check/today`,
        { status: isCompleted }
      );
      console.log("✅ [습관 완료 상태 변경 성공]:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ [습관 완료 상태 변경 실패]:", error);
      throw error;
    }
  },
  /**
   * Fetch study details by studyId
   * @param {string} studyId - The ID of the study
   * @returns {Promise<object>} - Returns study data
   */
  getStudy: async (studyId) => {
    try {
      const response = await axiosClient.get(`/api/studies/${studyId}`);
      return response.data;
    } catch (error) {
      console.error("❌ [getStudy 오류]:", error);
      return null;
    }
  },

  /**
   * Update habits (add, modify, delete)
   * @param {string} studyId - The ID of the study
   * @param {object[]} habitList - List of habits to update
   * @returns {Promise<object[]>} - Updated list of habits
   */
  updateHabits: async (studyId, habitList) => {
    try {
      if (!Array.isArray(habitList) || habitList.length === 0) {
        console.error(
          "🚨 [updateHabits 오류]: 변경된 데이터가 없습니다!",
          habitList
        );
        return null;
      }

      const response = await axiosClient.patch(
        `/api/studies/${studyId}/habits/modify`,
        {
          habits: habitList, // ✅ JSON.stringify() 필요 없음
        }
      );

      return response.data;
    } catch (error) {
      console.error("❌ [PATCH 요청 중 오류 발생]:", error);
      return null;
    }
  },

  /**
   * Fetch habits with date range filtering
   * @param {string} studyId - The ID of the study
   * @param {string} start - Start date
   * @param {string} end - End date
   * @returns {Promise<object[]>} - Filtered habits list
   */
  getHabits: async (studyId, start, end) => {
    try {
      const response = await axiosClient.get(
        `/api/studies/${studyId}/habits?start=${start}&end=${end}`,
        { timeout: 10000 }
      );
      return response.data;
    } catch (error) {
      console.error("❌ 습관 데이터를 불러오는 중 오류 발생:", error);
      throw error;
    }
  },
};

export default habitApi;
