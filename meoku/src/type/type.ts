export interface menuDetail {
  detailedMenuId: number;
  dailyMenuId: number;
  dailyMenuDate: null;
  dailyMenuCategory: null;
  mainMenuYn: string;
  detailedMenuName: string;
  detailedMenuImgUrl: null;
  mainMenuId: number;
  mainMenuName: string | null;
  menu1DetailId: number;
  menu1Name: string | null;
  menu2DetailId: number;
  menu2Name: string | null;
  menu3DetailId: number;
  menu3Name: string | null;
  menu4DetailId: number;
  menu4Name: string | null;
  menu5DetailId: number;
  menu5Name: string | null;
  menu6DetailId: number;
  menu6Name: null;
  createdDate: null;
  createdBy: null;
  updatedDate: null;
  updatedBy: null;
  menuDetailDTOList: null;
}

export interface dailyMenu {
  menuDetailsList: menuDetail[];
  dailyMenuId: null | number | string;
  date: string;
  holidayFg: string;
  restaurantOpenFg: string;
  createdDate: null;
  createdBy: null;
  updatedDate: null;
  updatedBy: null;
  detailedMenuList: menuDetail[];
}
//메인에서 컴포넌트로 데이터 넘길 때
export type firstMenu = {
  createdDate?: null | Date;
  createdBy?: null | string;
  dailyMenuId?: null | string;
  date?: string | Date;
  menuDetailsList: menuDTO[];
  holidayFg: string;
  restaurantOpenFg?: string;
  updatedDate?: null | Date;
  updatedBy?: null | string;
};
export interface menuDTO {
  createdBy: null;
  createdDate: null;
  dailyMenuCategory: null;
  dailyMenuDate: null;
  dailyMenuId: number;
  detailedMenuId: number;
  detailedMenuImgUrl: null;
  detailedMenuName: string;
  menuDetailsName: string;
  mainMenuId: number;
  mainMenuName: string;
  mainMenuYn: string;
  menu1DetailId: number;
  menu1Name: string;
  menu2DetailId: number;
  menu2Name: string;
  menu3DetailId: number;
  menu3Name: string;
  menu4DetailId: number;
  menu4Name: string;
  menu5DetailId: number;
  menu5Name: string;
  menu6DetailId: number;
  menu6Name: string;
  updatedBy: null;
  updatedDate: null;
  subBridgeList: menu[];
}
export interface mainDailyMenuTime {
  dayWeek: string | undefined;
  day: number;
  menuData?: firstMenu;
  isToday: boolean;
}

export interface menu {
  bridgeId: number;
  mainMenuYn: string;
  menuItemName: string;
  menuItemId: number;
}

export interface adminMenu {
  dailyMenuId: number | null;
  holidayFg: string;
  menuDate: string;
  menuDetailsList: adminMenuDetails[];
  restaurantOpenFn?: string;
  restaurantOpenFg?: string | null;
}

export interface adminMenuDetails {
  dailyMenuCategory: string | null;
  dailyMenuDate: string | null;
  dailyMenuId: null;
  mainMealYn: string;
  menuDetailsId: number | null;
  menuDetailsImgUrl: string | null;
  menuDetailsName: string;
  subBridgeList: bridgeData[];
}

export interface bridgeData {
  bridgeId: number | null;
  mainMenuYn: string;
  menuDetailsId: number | string | null;
  menuItemId: number | string | null;
  menuItemName: string;
  submenuDetails: string | null;
  submenuItem: string | null;
}

export interface tagData {
  calories?: null | number;
  frequencyCnt: number;
  likesCnt?: null | number;
  menuItemId?: number;
  menuItemName?: string;
  recentMenuDetailsId?: number;
  recentMenuDetailsUrl?: null | string;
  subBridegeList: [];
  subMenuTageList: {
    menuTagId: number;
    menuTagName: string;
    tagEndDate: string | Date;
  }[];
}
