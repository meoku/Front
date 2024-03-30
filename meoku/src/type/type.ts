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
  dailyMenuId: null;
  date: string;
  holidayFg: string;
  restaurantOpenFg: string;
  createdDate: null;
  createdBy: null;
  updatedDate: null;
  updatedBy: null;
  detailedMenuDTOList: menuDetail[];
}

// export interface dailyMenuDetail {
//   createdBy: string | null;
//   createdDate: string | null;
//   dailyMenuCategory: string | null;
//   dailyMenuDate: string | null;
//   dailyMenuId: number;
//   detailedMenuId: number;
//   detailedMenuImgUrl: string | null;
//   detailedMenuName: string;
//   mainMenuId: number;
//   mainMenuName: string;
//   mainMenuYn: string;
//   menu1DetailId: number;
//   menu1Name: string;
//   menu2DetailId: number;
//   menu2Name: string;
//   menu3DetailId: number;
//   menu3Name: string;
//   menu4DetailId: number;
//   menu4Name: string;
//   menu5DetailId: number;
//   menu5Name: string;
//   menu6DetailId: number;
//   menu6Name: string | null;
//   menuDetailDTOList: string[] | null;
//   updatedBy: string | null;
//   updatedDate: string | null;
// }
