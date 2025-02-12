import axiosClient from "./axios";

export async function getStudy(studyId) {
  try {
    const response = await axiosClient.get(`/api/studies/${studyId}`);
    return response.data;
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
    const response = await axios.patch(`/api/studies/${studyId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating study:", error);
    throw error;
  }
};
