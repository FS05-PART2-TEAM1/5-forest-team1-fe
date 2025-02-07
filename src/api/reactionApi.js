export async function getReactions (studyId) {
  try{
    const response = await fetch(`http://localhost:5004/api/studies/${studyId}/reactions`);
    const reactionData = await response.json();
    return reactionData;
  } catch (err) {
    throw err;
  }
}

export async function postReaction (studyId, newEmoji) {
  try{
    await fetch(`http://localhost:5004/api/studies/${studyId}/reactions`,
      {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({emoji: newEmoji}),
      }
    );
  } catch (err) {
    throw err;
  }
}

export async function patchReaction (studyId, reactionId, patchData) {
  try{
    await fetch(`http://localhost:5004/api/studies/${studyId}/reactions/${reactionId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(patchData),
      }
    );
  } catch (err) {
    throw err;
  }
}