import { css } from "@emotion/react";
import { TextB16, TextR14 } from "./common/Text";

const LunchTime = () => {
  let arr = [["1, 3층"], ["2층"], ["4, 5, 6층"]];
  const currentDate = new Date(); // 현재 날짜
  const weeksSinceEpoch = getWeeksSince1970(currentDate);
  getFloorDate(weeksSinceEpoch);
  function getFloorDate(week: number) {
    if (week % 3 == 0) {
      arr = [["1·3층"], ["2층"], ["4·5·6층"]];
    } else if (week % 3 == 1) {
      arr = [["4·5·6층"], ["1·3층"], ["2층"]];
    } else {
      arr = [["2층"], ["4·5·6층"], ["1·3층"]];
    }
  }
  function getWeeksSince1970(date: Date) {
    const timeDifferenceInMilliseconds =
      date.getTime() - date.getTimezoneOffset() * 60 * 1000; // UTC 기준으로 시간 차이 계산
    const daysSince1970 = Math.floor(
      timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000)
    ); // 1970년 1월 1일부터의 일수 계산
    const dayOfWeek = (daysSince1970 + 3) % 7; // 1970년 1월 1일이 목요일(4)이므로 3을 더하여 월요일 기준으로 조정
    const weeksSince1970 = Math.floor((daysSince1970 + 3 - dayOfWeek) / 7) + 1; // 월요일 기준으로 주차 계산
    return weeksSince1970;
  }
  return (
    <div
      css={css`
        display: flex;
        min-width: 260px;
        height: 96px;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px;
      `}
    >
      <div
        css={css`
          margin-left: 20px;
          margin-top: 20px;
          margin-right: 20px;
          white-space: nowrap;
        `}
      >
        <TextB16
          css={css`
            color: var(--color_05);
          `}
        >
          점심
        </TextB16>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        `}
      >
        <div
          css={css`
            width: 56px;
            height: 16px;
            text-align: center;
            margin-bottom: 6px;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            {arr[0][0]}
          </TextR14>
        </div>
        <div
          css={css`
            width: 56px;
            height: 16px;
            text-align: center;
            margin-bottom: 6px;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            {arr[0][1]}
          </TextR14>
        </div>
        <div
          css={css`
            width: 56px;
            height: 16px;
            text-align: center;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            {arr[0][2]}
          </TextR14>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          margin-top: 20px;
        `}
      >
        <div
          css={css`
            width: 142px;
            height: 16px;
            text-align: center;
            margin-bottom: 6px;
          `}
        >
          {" "}
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            11:30 ~ 12:30
          </TextR14>
        </div>
        <div
          css={css`
            width: 142px;
            height: 16px;
            text-align: center;
            margin-bottom: 6px;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            12:00 ~ 13:00
          </TextR14>
        </div>
        <div
          css={css`
            width: 142px;
            height: 16px;
            text-align: center;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            12:30 ~ 13:30
          </TextR14>
        </div>
      </div>
    </div>
  );
};

export default LunchTime;
