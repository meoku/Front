import axiosInstance from "./axiosConfig";
import { adminMenu, firstMenu } from "../type/type";
import { DefaultAdminData } from "../utils/defaultAdminData";
import { defaultMenuData } from "../utils/defaultMenuData";

interface RequestData {
  date: string;
}

export const fetchMenuData = async ({
  date,
}: RequestData): Promise<firstMenu[]> => {
  const response = await axiosInstance.post("/meokumenu/weekdaysmenu", {
    date,
  });
  const weekMenu = Array.isArray(response.data) ? response.data : [];

  // 식단이 등록되지 않은 주차는 서버가 빈 배열을 준다.
  // 그대로 흘려보내면 화면에 카드가 하나도 안 그려지므로, "준비중입니다" 가
  // 뜨는 기본 5칸으로 바꿔준다. (관리자용 fetchAdminMenuData 와 같은 처리)
  if (weekMenu.length === 0) {
    return defaultMenuData.map((day) => ({ ...day, menuDetailsList: [] }));
  }

  // 메뉴가 5개면 2번째 자리에 빈 칸을 끼워 "단일메뉴" 자리를 비운다.
  // 응답 길이를 믿지 말 것 — 예전엔 5로 고정해 돌다가 빈 주차에서 터졌다.
  for (let i = 0; i < weekMenu.length; i++) {
    if (weekMenu[i]?.menuDetailsList?.length === 5) {
      weekMenu[i].menuDetailsList.splice(1, 0, []);
    }
  }
  return weekMenu;
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

export const deleteMenuData = async (date: string) => {
  const response = await axiosInstance.post("/meokumenu/deleteMenuData", {
    date,
  });

  return response;
};
