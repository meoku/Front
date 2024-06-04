import { css } from "@emotion/react";
import { TextB20, TextB24, TextR20 } from "./common/Text";
import { mainDailyMenuTime } from "../type/type";
const TodayDailyDinnerMenu = ({
  dayWeek,
  day,
  menuData,
}: mainDailyMenuTime) => {
  const isNA = (value: string): string | JSX.Element => {
    if (value === "N/A") {
      return "";
    } else {
      return value;
    }
  };
  return menuData.holidayFg == "N" ? (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 9px;
        background-color: var(--color_01);
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 214px;
          height: 52px;
          margin: auto;
        `}
      >
        <TextB20
          css={css`
            color: #ffffff;
          `}
        >{`${dayWeek}(${day})`}</TextB20>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 18px 18px;
          width: 272px;
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
            margin-top: 30px;
          `}
        >
          <TextB24>{menuData.detailedMenuDTOList[4].detailedMenuName}</TextB24>
          <TextR20
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].mainMenuName)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].menu1Name)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].menu2Name)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].menu3Name)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].menu4Name)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[4].menu5Name)}
          </TextR20>
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
            margin-top: 40px;
            margin-bottom: 10px;
          `}
        >
          <TextB24>{menuData.detailedMenuDTOList[5].detailedMenuName}</TextB24>
          <TextR20
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[5].menu1Name)}
          </TextR20>
          <TextR20
            css={css`
              margin-top: 9px;
              margin-bottom: 30px;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[5].menu2Name)}
          </TextR20>
        </div>
      </div>
    </div>
  ) : (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 9px;
        background-color: var(--color_01);
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 214px;
          height: 52px;
          margin: auto;
          color: #ffffff;
        `}
      >
        <TextB20>{`${dayWeek}(${day})`}</TextB20>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 0 0 18px 18px;
          width: 272px;
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
            height: 340px;
          `}
        >
          <TextB24>공휴일</TextB24>
        </div>
      </div>
    </div>
  );
};

export default TodayDailyDinnerMenu;
