import leftarrow from "../assets/leftarrow.svg";
import rightarrow from "../assets/rightarrow.svg";
import { css } from "@emotion/react";
import { TextB20 } from "./common/Text";
const Day = ({ time }: { time: string }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
      `}
    >
      <img
        src={leftarrow}
        css={css`
          width: 34px;
          height: 34px;
          margin-left: 2.4rem;
          margin-right: 1.625rem;
        `}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          /* justify-content: center; */
        `}
      >
        <div
          css={css`
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            width: 140px;
          `}
        >
          <p
            css={css`
              font-size: 32px;
              font-weight: bold;
              color: var(--color_01);
              text-align: center;
            `}
          >
            12월 5주
          </p>
          <div
            css={css`
              flex-wrap: nowrap;
              margin: 0 auto;
            `}
          >
            <TextB20
              css={css`
                color: var(--color_05);
              `}
            >
              {time}
            </TextB20>
          </div>
        </div>
      </div>
      <img
        src={rightarrow}
        css={css`
          width: 34px;
          height: 34px;
          margin-left: 1.625rem;
          margin-right: 2.5rem;
        `}
      />
    </div>
  );
};
export default Day;
