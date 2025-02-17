// 파일 업로드 API (Cloudinary 사용)
// const uploadImage = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "bg_type_image"); // Cloudinary의 업로드 프리셋
//   formData.append("cloud_name", "studyforest1"); // Cloudinary의 클라우드 이름

//   const response = await fetch(
//     "https://api.cloudinary.com/v1_1/studyforest1/image/upload",
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await response.json();
//   return data.secure_url; // 업로드된 이미지 URL 반환
// };

import axiosClient from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "bg_type_image"); // Cloudinary의 업로드 프리셋
  formData.append("cloud_name", "studyforest1"); // Cloudinary의 클라우드 이름

  try {
    const response = await axiosClient.post(
      "https://api.cloudinary.com/v1_1/studyforest1/image/upload",
      formData
    );
    return response.data.secure_url; // 업로드된 이미지 URL 반환
  } catch (error) {
    console.error("파일 업로드 오류:", error);
    throw error;
  }
};
