import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from "./common/Text";
import { mainDailyMenuTime } from "../type/type";
const DailyMenu = ({ dayWeek, day, menuData }: mainDailyMenuTime) => {
  const isNA = (value: string): string | JSX.Element => {
    if (value === "N/A") {
      return "";
    } else {
      return value;
    }
  };
  return menuData?.holidayFg == "N" ? (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 10px;
        background-color: var(--color_01);
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
            color: #ffffff;
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
          <TextB16
            css={css`
              margin-top: 12px;
              text-align: center;
              color: var(--color_01);
            `}
          >
            {isNA(menuData.menuDetailsList[0].subBridgeList[0].menuItemName)}
          </TextB16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[0].subBridgeList[1].menuItemName)}
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
            {isNA(menuData.menuDetailsList[0].subBridgeList[5].menuItemName)}
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
              `}
            >
              {isNA(
                menuData?.menuDetailsList[1]?.subBridgeList[0]?.menuItemName
              )}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 6px;
                text-align: center;
                /* letter-spacing: -3px; */
              `}
            >
              {isNA(
                menuData?.menuDetailsList[1]?.subBridgeList[1]?.menuItemName
              )}
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
        background-color: var(--color_01);
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
            color: #ffffff;
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
          <TextB20>공휴일</TextB20>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;
