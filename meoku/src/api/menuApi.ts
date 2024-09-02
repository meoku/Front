import axiosInstance from "./axiosConfig";
import { adminMenu, firstMenu } from "../type/type";
import { DefaultAdminData } from "../utils/defaultAdminData";

interface RequestData {
  date: string;
}

export const fetchMenuData = async ({
  date,
}: RequestData): Promise<firstMenu[]> => {
  const response = await axiosInstance.post("/meokumenu/weekdaysmenu", {
    date,
  });
  for (let i = 0; i < 5; i++) {
    if (response.data[i].menuDetailsList.length === 5) {
      response.data[i].menuDetailsList.splice(1, 0, []);
    }
  }
  return response.data;
};

export const fetchTagData = async (
  menu1?: number,
  menu2?: number,
  menu3?: number,
  menu4?: number
) => {
  const response = await axiosInstance.post("/meokumenu/searchMenuTag", {
    menuIdList: [menu1, menu2, menu3, menu4],
  });
  return response.data;
};

//menuFetch(only admin)
export const fetchAdminMenuData = async (
  { date }: RequestData,
  sendFileState: boolean,
  dayArr: [string | undefined, number, string][],
  fileData?: File
) => {
  const response = await axiosInstance.post("/meokumenu/weekdaysmenu", {
    date,
  });
  if (sendFileState === true) {
    return fileData;
  }
  if (response.data.length === 0) {
    return DefaultAdminData(dayArr);
  }
  return response.data;
};

//uploadMenuFile(only admin)
export const uploadMenuFile = async (selectedFile: File) => {
  const formData = new FormData();
  formData.append("menuFile", selectedFile);

  const response = await axiosInstance.post(
    "/meokumenu/MenuImageUploadAndReturnMenuData",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// 메뉴 데이터를 서버에 저장하는 API 호출 함수(only admin)
export const uploadMenuData = async (data: adminMenu[]) => {
  const response = await axiosInstance.post("/meokumenu/WeekMenuUpload", data);

  return response.data;
};
