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
        box-shadow: var(--shadow_card);
        border: var(--border_default);
        box-sizing: border-box;
        border-radius: var(--radius_widget);
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
