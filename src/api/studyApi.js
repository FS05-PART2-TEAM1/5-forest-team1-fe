export async function getStudy (studyId) {
  try{
    const response = await fetch(`http://localhost:5004/api/studies/${studyId}`);
    const studyData = await response.json();
    return studyData;
  } catch (err) {
    throw err;
  }
}