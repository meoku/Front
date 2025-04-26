import leftarrow from '/leftarrow.svg';
import rightarrow from '/rightarrow.svg';
import { css } from '@emotion/react';
import { TextB20 } from './common/Text';
import { useRecoilState } from 'recoil';
import timeState from '../store/atoms/time';
import { getWeekOfMonth } from '../utils/dateUtils';
const Day = ({ time }: { time: string }) => {
  const [date, setDate] = useRecoilState(timeState);
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
        onClick={() => setDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000))}
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
        onClick={() => setDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))}
      />
    </div>
  );
};
export default Day;
