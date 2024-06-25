import leftarrow from "/leftarrow.svg";
import rightarrow from "/rightarrow.svg";
import { css } from "@emotion/react";
import { TextB20 } from "./common/Text";
import { useRecoilState } from "recoil";
import timeState from "../store/atoms/time";
const Day = ({ time }: { time: string }) => {
  const [date, setDate] = useRecoilState(timeState);
  const getWeekOfMonth = (date: Date): string => {
    const WEEK_KOR = ["1", "2", "3", "4", "5"];
    const THURSDAY_NUM = 4; // 첫째주의 기준은 목요일(4)이다. (https://info.singident.com/60)

    const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDate.getDay();

    let firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek; // 첫째주 목요일
    if (firstThursday <= 0) {
      firstThursday = firstThursday + 7; // 한주는 7일
    }
    const untilDateOfFirstWeek = firstThursday - 7 + 3; // 월요일기준으로 계산 (월요일부터 한주의 시작)
    const weekNum = Math.ceil((date.getDate() - untilDateOfFirstWeek) / 7) - 1;

    if (weekNum < 0) {
      // 첫째주 이하일 경우 전월 마지막주 계산
      const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
      const result = getWeekOfMonth(lastDateOfMonth);
      return result;
    }

    return `${date.getMonth() + 1 + "월"} ${WEEK_KOR[weekNum]}주`;
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
          cursor: pointer;
        `}
        onClick={() =>
          setDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000))
        }
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
              cursor: pointer;
            `}
            onClick={() => {
              if (date.getDate() == new Date().getDate()) return;
              setDate(new Date());
            }}
          >
            {getWeekOfMonth(date)}
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
          cursor: pointer;
        `}
        onClick={() =>
          setDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))
        }
      />
    </div>
  );
};
export default Day;
