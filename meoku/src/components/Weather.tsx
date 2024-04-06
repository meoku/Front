import { css } from "@emotion/react";
import snowImage from "../assets/weather/ImageSnow.svg";
import { TextB24, TextR14 } from "./common/Text";
const Weather = () => {
  return (
    <div
      css={css`
        display: flex;
        min-width: 430px;
        height: 96px;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px;
      `}
    >
      <div>
        <img
          src={snowImage}
          css={css`
            width: 75px;
            height: 75px;
            margin-top: 13px;
            margin-left: 28px;
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          text-align: right;
          margin-top: 7px;
          margin-left: 10px;
        `}
      >
        <p
          css={css`
            font-size: 53.6px;
          `}
        >
          -10˚
        </p>

        <p
          css={css`
            margin-right: 20px;
            font-size: 15px;
            font-weight: bold;
            white-space: nowrap;
          `}
        >
          5 / -11
        </p>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          text-align: right;
          margin-top: 32px;
          margin-left: 18px;
        `}
      >
        {<TextB24>눈</TextB24>}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 15px;
          margin-left: 85px;
        `}
      >
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
          `}
        >
          내위치:
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
          `}
        >
          서울시 도곡동
        </p>
        <p
          css={css`
            margin-top: 32px;
            font-size: 12px;
            color: #585858;
          `}
        >
          <ul>
            <li>
              <TextR14>• 자외선 보통</TextR14>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};
export default Weather;
