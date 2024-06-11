import leftarrow from "/leftarrow.svg";
import rightarrow from "/rightarrow.svg";
import { css } from "@emotion/react";
import { TextB20 } from "./common/Text";
const Day = ({ time }: { time: string }) => {
  const getWeekOfMonth = (date: Date) => {
    const month = date.getMonth() + 1;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    const weekOfMonth = Math.ceil(
      (date.getDate() + (7 - adjustedFirstDayOfWeek)) / 7
    );
    return `${month}월 ${weekOfMonth}주`;
  };
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
            {getWeekOfMonth(new Date())}
          </p>
          <div
            css={css`
              flex-wrap: nowrap;
              margin: 6px auto;
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
