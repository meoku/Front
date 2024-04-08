import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from "./common/Text";
import { mainDailyMenuTime } from "../type/type";
const DailyDinnerMenu = ({ dayWeek, day }: mainDailyMenuTime) => {
  return (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 9px 30px 9px;
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
          <TextB20>한식</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
            `}
          >
            일이삼사오육칠팔
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
            `}
          >
            일이삼사오육칠팔
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
            `}
          >
            일이삼사오육칠팔
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
            `}
          >
            일이삼사
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
            `}
          >
            일이삼사오육칠팔구십일이
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
            `}
          >
            일이삼사오육칠팔
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
            height: 60px;
            margin-top: 10px;
            margin-bottom: 32;
          `}
        >
          <TextB20>PLUS</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
            `}
          >
            일이삼사오육칠팔
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              margin-bottom: 30px;
            `}
          >
            일이삼사오육칠팔
          </TextR16>
        </div>
      </div>
    </div>
  );
};

export default DailyDinnerMenu;