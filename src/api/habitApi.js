const BASE_URL = "http://localhost:5000/api/studies";

/**
 * Fetch study details by studyId
 * @param {string} studyId - The ID of the study
 * @returns {Promise<object>} - Returns study data including nickname
 *
 *
 */

export async function getHabits(studyId) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/habits`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch habits: ${response.status} ${response.statusText}`
      );
    }

    const habitData = await response.json();

    // habitList가 배열인지 확인하고, 없으면 빈 배열 반환
    if (!habitData.habitList || !Array.isArray(habitData.habitList)) {
      throw new Error("Invalid habitList format");
    }

    // habitList에서 name 값만 추출하여 반환
    return habitData.habitList.map((habit) => habit.name);
  } catch (err) {
    console.error("Error fetching habits:", err.message);
    return []; // 오류 발생 시 빈 배열 반환
  }
}
export async function getStudy(studyId) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch study: ${response.status} ${response.statusText}`
      );
    }

    const studyData = await response.json();
    return studyData;
  } catch (err) {
    console.error("Error fetching study data:", err.message);
    return null; // Return null instead of throwing to avoid breaking the UI
  }
}

/**
 * Fetch all studies (if needed)
 * @returns {Promise<object[]>} - Returns a list of studies
 */
export async function getAllStudies() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch studies: ${response.status} ${response.statusText}`
      );
    }

    const studies = await response.json();
    return studies;
  } catch (err) {
    console.error("Error fetching studies:", err.message);
    return [];
  }
}

/**
 * Create a new study
 * @param {object} studyData - The study data to create
 * @returns {Promise<object>} - Returns created study data
 */
export async function createHabit(studyId, habitName) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studyId,
        name: habitName,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create habit: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating habit:", err.message);
    return null;
  }
}

/**
 * Update an existing study
 * @param {string} studyId - The ID of the study to update
 * @param {object} studyData - Updated study data
 * @returns {Promise<object>} - Returns updated study data
 */
export async function updateStudy(habitId, habitData) {
  try {
    console.log(
      "📌 [PATCH 요청] 습관 ID:",
      habitId,
      "데이터:",
      JSON.stringify(habitData, null, 2)
    );

    const response = await fetch(`${BASE_URL}/${habitId}`, {
      // ✅ PATCH 요청 변경
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        `❌ [PATCH 요청 실패] ${response.status} ${response.statusText} - ${
          responseData.error || "알 수 없는 오류"
        }`
      );
    }

    console.log("✅ [PATCH 요청 성공]:", responseData);
    return responseData;
  } catch (err) {
    console.error("❌ [PATCH 요청 중 오류 발생]:", err.message);
    return null;
  }
}

/**
 * Delete a study
 * @param {string} studyId - The ID of the study to delete
 * @returns {Promise<boolean>} - Returns true if deletion was successful
 */
export async function deleteStudy(studyId) {
  try {
    const response = await fetch(`${BASE_URL}/${studyId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete study: ${response.status} ${response.statusText}`
      );
    }

    return true;
  } catch (err) {
    console.error("Error deleting study:", err.message);
    return false;
  }
}
