import { css } from '@emotion/react';
import { TextB16, TextR14 } from './common/Text';

const DinnerTime = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 260px;
        height: 56px;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px;
        background-color: var(--background_color_02);
      `}
    >
      <TextB16>저녁</TextB16>
      <TextR14
        css={css`
          margin-left: 28px;
          margin-right: 28px;
        `}
      >
        전층
      </TextR14>
      <TextR14>18:00 ~ 19:00</TextR14>
    </div>
  );
};
export default DinnerTime;
