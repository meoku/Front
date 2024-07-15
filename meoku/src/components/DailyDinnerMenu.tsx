import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from "./common/Text";
import { mainDailyMenuTime } from "../type/type";
const DailyDinnerMenu = ({ dayWeek, day, menuData }: mainDailyMenuTime) => {
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
        margin: 0px 10px 30px 10px;
        background-color: var(--color_02);
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
        <TextB16 css={css``}>{`${dayWeek}(${day})`}</TextB16>
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
            height: 200px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[4].menuDetailsName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[0].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[1].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[2].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[3].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[4].menuItemName)}
          </TextR16>
          {/* <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[5].menuItemName)}
          </TextR16> */}
          <hr
            css={css`
              margin-top: 16px;
              width: 80%;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 60px;
            margin-top: 10px;
            margin-bottom: 10px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[5].menuDetailsName}</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[5].subBridgeList[0].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              margin-bottom: 30px;
            `}
          >
            {isNA(menuData.menuDetailsList[5].subBridgeList[1].menuItemName)}
          </TextR16>
        </div>
      </div>
    </div>
  ) : (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 10px 30px 10px;
        background-color: var(--color_02);
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
        <TextB16 css={css``}>{`${dayWeek}(${day})`}</TextB16>
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
            height: 280px;
          `}
        >
          <TextB20>{menuData ? "공휴일" : "준비중입니다."}</TextB20>
        </div>
      </div>
    </div>
  );
};

export default DailyDinnerMenu;
