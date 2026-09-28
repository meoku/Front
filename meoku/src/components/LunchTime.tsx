import { css } from '@emotion/react';
import { TextB16, TextR14 } from './common/Text';
import { getLunchOrder } from '../utils/lunchOrder';

const LunchTime = () => {
  const arr = getLunchOrder().map((slot) => slot.floor);

  return (
    <div
      css={css`
        display: flex;
        width: 285px;
        height: 96px;
        box-shadow: var(--shadow_card);
        border: var(--border_default);
        box-sizing: border-box;
        border-radius: var(--radius_widget);
        background-color: var(--background_color_02);
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
            width: 86px;
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
            {String(arr[0])}
          </TextR14>
        </div>
        <div
          css={css`
            width: 86px;
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
            {String(arr[1])}
          </TextR14>
        </div>
        <div
          css={css`
            width: 86px;
            height: 16px;
            text-align: center;
          `}
        >
          <TextR14
            css={css`
              color: var(--color_06);
            `}
          >
            {String(arr[2])}
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
          {' '}
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
