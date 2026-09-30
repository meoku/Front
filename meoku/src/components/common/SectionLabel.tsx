import { css } from '@emotion/react';
import { TextB20 } from './Text';

interface SectionLabelProps {
  children: string;
}

const lineStyle = css`
  flex: 1;
  height: 0;
  border-top: var(--border_default);
`;

/**
 * 가운데 글자, 양옆으로 직선이 뻗는 구분선.
 *
 *   ───────────────  점심  ───────────────
 *
 * 좌우 10px 여백은 식단 카드가 각각 margin 10px 을 갖고 있어서,
 * 직선 끝이 카드의 보이는 가장자리와 맞도록 둔 것이다.
 */
const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        gap: var(--space_4);
        box-sizing: border-box;
        width: 100%;
        max-width: var(--layout_content_width);
        margin: 0 auto;
        padding: 0 10px;
      `}
    >
      <span css={lineStyle} />
      <TextB20
        css={css`
          color: var(--color_05);
          white-space: nowrap;
        `}
      >
        {children}
      </TextB20>
      <span css={lineStyle} />
    </div>
  );
};

export default SectionLabel;
