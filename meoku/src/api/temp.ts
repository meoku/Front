import { dailyMenu } from "../type/type";
import { axiosInstance } from "./axios";
import { imageAxiosInstance } from "./axios";

export const postMenuData = async (
  data: dailyMenu[],
  imageFile: File | null
) => {
  try {
    if (imageFile) {
      await uploadImage(imageFile);
    }
    await axiosInstance.post("/api/v1/admin/WeekMenuUpload", data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// export const updateUserProfile = async (userId: string, profileData: any) => {
//   try {
//     const response = await axiosInstance.put(`/users/${userId}`, profileData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };

const uploadImage = async (imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await imageAxiosInstance.post(
      "/api/v1/admin/MenuImageUploadAndReturnMenuData",
      formData
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// // 사용 예시
// const imageFile = // 업로드할 이미지 파일
// uploadImage(imageFile);
