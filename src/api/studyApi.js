import axiosClient from "./axios";

export async function getStudy(studyId) {
  try {
    const response = await fetch(
      `http://localhost:5004/api/studies/${studyId}`
    );
    const studyData = await response.json();
    return studyData;
  } catch (err) {
    throw err;
  }
}

export async function verifyPassword(studyId, password) {
  try {
    const response = await fetch(
      `http://localhost:5004/api/studies/verify-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyId, password }),
      }
    );
    const verifyData = await response.json();
    return verifyData;
  } catch (err) {
    throw err;
  }
}

export async function deleteStudy(studyId) {
  try {
    await fetch(`http://localhost:5004/api/studies/${studyId}`, {
      method: "DELETE",
    });
  } catch (err) {
    throw err;
  }
}
export const createStudy = async (studyData) => {
  try {
    const response = await axiosClient.post(
      "https://five-forest-team1.onrender.com/api/studies",
      studyData
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};
