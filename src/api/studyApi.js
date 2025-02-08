import axiosClient from "./axios";

export async function getStudy(studyId) {
  try {
    const response = await fetch(
      // `http://localhost:5004/api/studies/${studyId}`
      "https://five-forest-team1.onrender.com/api/studies"
    );
    const studyData = await response.json();
    return studyData;
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

export const patchStudy = async (studyId, updatedData) => {
  try {
    const response = await axios.patch(
      // `${BASE_URL}/studies/${studyId}`,
      "https://five-forest-team1.onrender.com/api/studies",
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating study:", error);
    throw error;
  }
};
