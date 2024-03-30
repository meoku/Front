// import { axiosInstance } from "./axios";

// export const getUserProfile = async (userId: string) => {
//   try {
//     const response = await axiosInstance.get(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// export const updateUserProfile = async (userId: string, profileData: any) => {
//   try {
//     const response = await axiosInstance.put(`/users/${userId}`, profileData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };

// import { imageAxiosInstance } from "./imageAxiosInstance";

// const uploadImage = async (imageFile) => {
//   try {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     const response = await imageAxiosInstance.post("/upload", formData);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// // 사용 예시
// const imageFile = // 업로드할 이미지 파일
// uploadImage(imageFile);
