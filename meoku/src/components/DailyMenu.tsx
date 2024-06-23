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
          margin: auto;
        `}
      >
        <TextB16>{`${dayWeek}(${day})`}</TextB16>
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
          <TextB20>{menuData.detailedMenuDTOList[0].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].mainMenuName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].menu1Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].menu2Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].menu3Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].menu4Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[0].menu5Name)}
          </TextR16>
          <hr
            css={css`
              margin-top: 20px;
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
            margin-top: 10px;
            height: 176px;
          `}
        >
          <TextB20>{menuData.detailedMenuDTOList[1].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[1].mainMenuName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
              /* letter-spacing: -3px; */
            `}
          >
            {isNA(menuData.detailedMenuDTOList[1].menu1Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[1].menu2Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[1].menu3Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[1].menu4Name)}
          </TextR16>
          <hr
            css={css`
              margin-top: 20px;
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
            height: 174px;
            margin-top: 10px;
          `}
        >
          <TextB20>{menuData.detailedMenuDTOList[2].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[2].menu1Name)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[2].menu2Name)}
          </TextR16>
          <TextB20
            css={css`
              margin-top: 20px;
              text-align: center;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[3].detailedMenuName)}
          </TextB20>
          <TextR16
            css={css`
              margin-top: 12px;
              margin-bottom: 30px;
            `}
          >
            {isNA(menuData.detailedMenuDTOList[3].mainMenuName)}
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
        <TextB16>{`${dayWeek}(${day})`}</TextB16>
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
          <TextB20>{menuData ? "공휴일" : "준비중입니다."}</TextB20>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;
