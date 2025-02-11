import axiosClient from "./axios";

export async function getReactions(studyId) {
  try {
    const response = await axiosClient.get(`/api/studies/${studyId}/reactions`);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function postReaction(studyId, newEmoji) {
  try {
    await axiosClient.post(`/api/studies/${studyId}/reactions`, {
      emoji: newEmoji,
    });
  } catch (err) {
    throw err;
  }
}

export async function patchReaction(studyId, reactionId, patchData) {
  try {
    await axiosClient.patch(
      `/api/studies/${studyId}/reactions/${reactionId}`,
      patchData
    );
  } catch (err) {
    throw err;
  }
}
