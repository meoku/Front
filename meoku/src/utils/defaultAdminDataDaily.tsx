import { adminMenu, adminMenuDetails } from "../type/type";

export const DefaultAdminDataDaily = (day: string): adminMenuDetails[] => {
  const adminMenuData: adminMenu = {
    dailyMenuId: null,
    menuDate: day,
    holidayFg: "N",
    restaurantOpenFg: "Y",
    menuDetailsList: [
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "한식",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "일품",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "Plus",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "석식",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "Plus",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
    ],
  };

  return adminMenuData.menuDetailsList || [];
};

export const DefaultAllAdminDataDaily = (day: string): adminMenu => {
  const adminMenuData: adminMenu = {
    dailyMenuId: null,
    menuDate: day,
    holidayFg: "N",
    restaurantOpenFg: "Y",
    menuDetailsList: [
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "한식",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "일품",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "Plus",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "Y",
        menuDetailsName: "석식",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "Y",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
      {
        menuDetailsId: null,
        dailyMenuId: null,
        dailyMenuDate: null,
        dailyMenuCategory: null,
        mainMealYn: "N",
        menuDetailsName: "Plus",
        menuDetailsImgUrl: null,
        subBridgeList: [
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
          {
            bridgeId: null,
            menuDetailsId: null,
            menuItemId: null,
            menuItemName: " ",
            mainMenuYn: "N",
            submenuDetails: null,
            submenuItem: null,
          },
        ],
      },
    ],
  };

  return adminMenuData;
};
