import axiosClient from "./axios";

export async function getStudy(studyId) {
  try {
<<<<<<< HEAD
    const response = await fetch(
      // `http://localhost:5004/api/studies/${studyId}`
      "https://five-forest-team1.onrender.com/api/studies"
    );
    const studyData = await response.json();
    return studyData;
=======
    const response = await axiosClient.get(`/api/studies/${studyId}`);
    return response.data;
>>>>>>> fb6640b15d539b746c45b7c6ac0eaaa873a2c0e9
  } catch (err) {
    throw err;
  }
}

export async function verifyPassword(studyId, password) {
  try {

    const response = await axiosClient.post(`/api/studies/verify-password`, {
      studyId,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteStudy(studyId) {
  try {
    await axiosClient.delete(`/api/studies/${studyId}`);
  } catch (err) {
    throw err;
  }
}

export const createStudy = async (studyData) => {
  try {
    const response = await axiosClient.post(`/api/studies`, studyData);
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
