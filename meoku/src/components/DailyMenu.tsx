import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from "./common/Text";
import { mainDailyMenuTime } from "../type/type";
const DailyMenu = ({ dayWeek, day, menuData }: mainDailyMenuTime) => {
  return (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 9px;
        background-color: var(--color_02);
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 214px;
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
          width: 214px;
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
            width: 166px;
            height: 200px;
            margin-top: 16px;
          `}
        >
          <TextB20>{menuData.detailedMenuDTOList[0].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].mainMenuName}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].menu1Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].menu2Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].menu3Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].menu4Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[0].menu5Name}
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
            width: 166px;
            /* height: 170px; */
          `}
        >
          <TextB20>{menuData.detailedMenuDTOList[1].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[1].mainMenuName}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
              /* letter-spacing: ${menuData.detailedMenuDTOList[1].mainMenuName
                .length > 4
                ? "-3px"
                : "0px"}; */
            `}
          >
            {menuData.detailedMenuDTOList[1].menu1Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[1].menu2Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[1].menu3Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[1].menu4Name}
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
            width: 166px;
            height: 150px;
            margin-top: 10px;
          `}
        >
          <TextB20>{menuData.detailedMenuDTOList[2].detailedMenuName}</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[2].menu1Name}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[2].menu2Name}
          </TextR16>
          <TextB20
            css={css`
              margin-top: 20px;
              text-align: center;
            `}
          >
            {menuData.detailedMenuDTOList[3].detailedMenuName}
          </TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              margin-bottom: 30px;
            `}
          >
            {menuData.detailedMenuDTOList[3].mainMenuName}
          </TextR16>
        </div>
      </div>
    </div>
  );
};

export default DailyMenu;
