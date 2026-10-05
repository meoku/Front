import { css } from '@emotion/react';
import { TextB16 } from './Text';

interface SectionLabelProps {
  children: string;
}

/**
 * 가운데에 놓이는 알약 모양 구역 라벨.
 *
 *              ╭────────╮
 *              │  점심  │
 *              ╰────────╯
 *
 * 디자인 캔버스 "먹구 메인 페이지" > 개선안 — 메인(`pp-meal`) 기준.
 * 이전에는 글자 양옆으로 직선을 뻗는 형태였는데, 직선을 없애고 카드와 같은
 * 재질(흰 배경 + 테두리 + shadow_card)의 칩으로 바꿨다.
 *
 * 좌우 10px 여백은 식단 카드가 각각 margin 10px 을 갖고 있어서, 라벨이 놓이는
 * 영역의 폭을 카드 줄과 맞추려고 둔 것이다.
 */
const SectionLabel = ({ children }: SectionLabelProps) => {
  return (
    <h2
      css={css`
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: var(--layout_content_width);
        margin: 0 auto;
        padding: 0 10px;
        /* h2 의 기본 글자 크기/굵기를 지우고, 글자 스타일은 칩이 정하게 한다. */
        font-size: inherit;
        font-weight: 400;
      `}
    >
      <span
        css={css`
          display: inline-flex;
          align-items: center;
          height: 34px;
          padding: 0 22px;
          background-color: var(--background_color_02);
          border: var(--border_default);
          /* 높이 34px 의 절반(17px)보다 커서 완전한 알약이 된다. */
          border-radius: 18px;
          box-shadow: var(--shadow_card);
        `}
      >
        <TextB16
          css={css`
            color: var(--color_06);
            white-space: nowrap;
          `}
        >
          {children}
        </TextB16>
      </span>
    </h2>
  );
};

export default SectionLabel;
