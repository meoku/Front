import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from "./common/Text";
import { mainDailyMenuTime, tagData } from "../type/type";
import { useQuery } from "@tanstack/react-query";
import icNewTag from "/icNewTag.svg";
import { fetchTagData } from "../api/menuApi";
interface RequestData {
  menuIdList: (number | undefined)[];
}
const DailyMenu = ({ dayWeek, day, menuData, isToday }: mainDailyMenuTime) => {
  const menu1 = menuData?.menuDetailsList?.[0]?.subBridgeList?.[0]?.menuItemId;
  const menu2 = menuData?.menuDetailsList?.[0]?.subBridgeList?.[1]?.menuItemId;
  const menu3 = menuData?.menuDetailsList?.[1]?.subBridgeList?.[0]?.menuItemId;
  const menu4 = menuData?.menuDetailsList?.[1]?.subBridgeList?.[1]?.menuItemId;
  const requestData: RequestData = {
    menuIdList: [menu1, menu2, menu3, menu4],
  };
  const { data: tagData } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () => fetchTagData(menu1, menu2, menu3, menu4),
  });
  const isNA = (value: string): string | JSX.Element => {
    if (value === "N/A") {
      return "";
    } else {
      return value;
    }
  };
  console.log("?????????????");
  console.log(menuData?.holidayFg, menuData?.menuDetailsList[0]?.dailyMenuDate);
  return menuData?.holidayFg == "N" &&
    menuData?.menuDetailsList[0]?.dailyMenuDate ? (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 10px;
        background-color: ${isToday ? "var(--color_01)" : "var(--color_02)"};
        //background-color: var(--color_02);
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 44px;
          margin: auto;
        `}
      >
        <TextB16
          css={css`
            color: ${isToday ? "#ffffff" : "black"};
          `}
        >{`${dayWeek}(${day})`}</TextB16>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 18px 18px;
          width: 220px;
          /* height: 576px; */
          background-color: var(--background_color_02);
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 186px;
            margin-top: 20px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[0].menuDetailsName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
              color: ${isToday ? "var(--color_01)" : ""};
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              `}
            >
              <div>
                {tagData?.map((v: tagData) => {
                  if (v.menuItemId == menu1) {
                    return (
                      <img
                        css={css`
                          position: absolute;
                          top: -1px;
                          left: -20px;
                        `}
                        src={icNewTag}
                        alt="New Tag"
                      />
                    );
                  }
                })}
              </div>
              {isNA(menuData.menuDetailsList[0].subBridgeList[0].menuItemName)}
            </div>
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              `}
            >
              <div>
                {tagData?.map((v: tagData) => {
                  if (v.menuItemId == menu2) {
                    return (
                      <img
                        css={css`
                          position: absolute;
                          top: -1px;
                          left: -20px;
                        `}
                        src={icNewTag}
                        alt="New Tag"
                      />
                    );
                  }
                })}
              </div>
              {isNA(menuData.menuDetailsList[0].subBridgeList[1].menuItemName)}
            </div>
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[0].subBridgeList[2].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[0].subBridgeList[3].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[0].subBridgeList[4].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[0]?.subBridgeList[5]?.menuItemName)}
          </TextR16>
          <hr
            css={css`
              margin-top: 20px;
              width: 80%;
            `}
          />
        </div>
        {menuData?.menuDetailsList[1]?.dailyMenuDate ? (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 242px;
              margin-top: 10px;
              height: 176px;
            `}
          >
            <TextB20>{menuData?.menuDetailsList[1]?.menuDetailsName}</TextB20>
            <TextR16
              css={css`
                margin-top: 12px;
                text-align: center;
                color: ${isToday ? "var(--color_01)" : ""};
              `}
            >
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                `}
              >
                <div>
                  {tagData?.map((v: tagData) => {
                    if (v.menuItemId == menu3) {
                      return (
                        <img
                          css={css`
                            position: absolute;
                            top: -1px;
                            left: -20px;
                          `}
                          src={icNewTag}
                          alt="New Tag"
                        />
                      );
                    }
                  })}
                </div>
                {isNA(
                  menuData.menuDetailsList[1].subBridgeList[0].menuItemName
                )}
              </div>
            </TextR16>
            <TextR16
              css={css`
                margin-top: 6px;
                text-align: center;
                /* letter-spacing: -3px; */
              `}
            >
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: relative;
                `}
              >
                <div>
                  {tagData?.map((v: tagData) => {
                    if (v.menuItemId == menu4) {
                      return (
                        <img
                          css={css`
                            position: absolute;
                            top: -1px;
                            left: -20px;
                          `}
                          src={icNewTag}
                          alt="New Tag"
                        />
                      );
                    }
                  })}
                </div>
                {isNA(
                  menuData.menuDetailsList[1].subBridgeList[1].menuItemName
                )}
              </div>
            </TextR16>
            <TextR16
              css={css`
                margin-top: 6px;
                text-align: center;
              `}
            >
              {isNA(
                menuData?.menuDetailsList[1]?.subBridgeList[2]?.menuItemName
              )}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 6px;
                text-align: center;
              `}
            >
              {isNA(
                menuData?.menuDetailsList[1]?.subBridgeList[3]?.menuItemName
              )}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 6px;
                text-align: center;
              `}
            >
              {isNA(
                menuData?.menuDetailsList[1]?.subBridgeList[4]?.menuItemName
              )}
            </TextR16>
            <hr
              css={css`
                margin-top: 20px;
                width: 80%;
              `}
            />
          </div>
        ) : (
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 242px;
              margin-top: 10px;
              height: 176px;
            `}
          >
            <TextB20>{"　"}</TextB20>
            <TextB20>{"　"}</TextB20>
            <TextB20>{"　"}</TextB20>
            <TextB20>{"단일메뉴"}</TextB20>
            <TextB20>{"　"}</TextB20>
            <TextB20>{"　"}</TextB20>
            <TextB20>{"　"}</TextB20>
            <hr
              css={css`
                margin-top: 20px;
                width: 80%;
              `}
            />
          </div>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 174px;
            margin-top: 10px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[2].menuDetailsName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[2].subBridgeList[0].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[2].subBridgeList[1].menuItemName)}
          </TextR16>
          <TextB20
            css={css`
              margin-top: 20px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[3].menuDetailsName)}
          </TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              margin-bottom: 30px;
            `}
          >
            {isNA(menuData.menuDetailsList[3].subBridgeList[0].menuItemName)}
          </TextR16>
        </div>
      </div>
    </div>
  ) : (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        /* margin: 0px 9px 30px 9px; */
        margin: 0px 10px;
        background-color: ${isToday ? "var(--color_01)" : "var(--color_02)"};
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 220px;
          height: 44px;
        `}
      >
        <TextB16
          css={css`
            color: ${isToday ? "#ffffff" : "black"};
          `}
        >{`${dayWeek}(${day})`}</TextB16>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 220px;
          border-radius: 0 0 18px 18px;
          /* height: 576px; */
          background-color: var(--background_color_02);
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 576px;
          `}
        >
          <TextB20>
            {menuData?.holidayFg == "Y" ? "공휴일" : "준비중입니다."}
          </TextB20>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;
