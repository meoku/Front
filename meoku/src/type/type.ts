export interface MenuDetail {
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

export interface DailyMenu {
  dailyMenuId: null;
  date: string;
  holidayFg: string;
  restaurantOpenFg: string;
  createdDate: null;
  createdBy: null;
  updatedDate: null;
  updatedBy: null;
  detailedMenuDTOList: MenuDetail[];
}
