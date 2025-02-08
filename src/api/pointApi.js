const BASE_URL = "http://localhost:3000/api";

// 포인트 조회
export const fetchPoints = async (studyId) => {
  try {
    const response = await fetch(`${BASE_URL}/studies/${studyId}`);
    if (!response.ok) {
      throw new Error("포인트 정보를 가져오는데 실패했습니다.");
    }
    const data = await response.json();
    return data.totalPoints;
  } catch (error) {
    console.error("포인트 로딩 실패:", error);
    throw error;
  }
};

// 포인트 업데이트
export const updatePoints = async (studyId, pointData) => {
  try {
    const response = await fetch(`${BASE_URL}/studies/${studyId}/points`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pointData),
    });

    if (!response.ok) {
      throw new Error("집중 시간 저장에 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("API 오류:", error);
    throw error;
  }
};
