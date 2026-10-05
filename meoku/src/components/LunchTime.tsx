import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { TextR14 } from './common/Text';
import { DINNER_SLOTS, getLunchOrder, LunchSlot } from '../utils/lunchOrder';

/**
 * 배식 순서 위젯.
 *
 * 디자인 캔버스 "먹구 메인 페이지" > 개선안 — 메인(`mk-mealtime` + `pp-mt`) 기준.
 * 이전에는 점심만 보여주고 왼쪽에 '점심' 글자 라벨이 붙어 있었는데,
 * 왼쪽을 점심/저녁 탭으로 바꾸고 오른쪽 패널을 세로로 밀어 전환하게 했다.
 *
 *   ┌───────┬──────────────────────────────┐
 *   │ 점심  │ 1·3층           11:30 ~ 12:30 │
 *   │ 저녁  │ 2·4층(IT)       12:00 ~ 13:00 │
 *   │       │ 4(아성)·5·6층   12:30 ~ 13:30 │
 *   └───────┴──────────────────────────────┘
 *
 * 폭이 285px → 324px 로 늘어난 값도 디자인 그대로다. 이 폭이어야 오른쪽 묶음
 * (배식순서 + 공유)의 자연 폭이 날씨 위젯과 같은 428px 이 되어, 주차를 기준으로
 * 좌우가 빈틈 없이 대칭이 된다.
 */

/** 패널 한 칸의 높이. 위젯 96px − 테두리 2px. 슬라이드 거리로도 쓴다. */
const PANEL_HEIGHT = 94;
/** 이 거리 이상 끌면 클릭이 아니라 스와이프로 본다. */
const SWIPE_THRESHOLD = 24;

const MEALS = ['점심', '저녁'] as const;

const panelStyle = css`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 12px;
  height: ${PANEL_HEIGHT}px;
  padding: 0 20px 0 14px;
`;

const colStyle = css`
  display: flex;
  flex-direction: column;

  /* 줄 간격 6px. 첫 줄에는 붙지 않게 인접 형제에만 준다. */
  > p + p {
    margin-top: 6px;
  }
`;

const cellStyle = css`
  height: 16px;
  white-space: nowrap;
`;

const MealPanel = ({ slots }: { slots: LunchSlot[] }) => (
  <div css={panelStyle}>
    <div css={colStyle}>
      {slots.map((slot) => (
        <TextR14
          key={slot.start}
          css={[
            cellStyle,
            css`
              text-align: left;
              color: var(--color_05);
            `,
          ]}
        >
          {slot.floor}
        </TextR14>
      ))}
    </div>
    <div css={colStyle}>
      {slots.map((slot) => (
        <TextR14
          key={slot.start}
          css={[
            cellStyle,
            css`
              text-align: right;
              color: var(--color_06);
              /* 시간 숫자 폭을 고정해 세 줄의 자릿수가 어긋나지 않게 한다. */
              font-variant-numeric: tabular-nums;
            `,
          ]}
        >
          {slot.range}
        </TextR14>
      ))}
    </div>
  </div>
);

const LunchTime = () => {
  const [meal, setMeal] = useState(0);
  const dragStartY = useRef<number | null>(null);
  /** 스와이프로 이미 바꿨으면 뒤따라오는 click 은 무시한다. */
  const swiped = useRef(false);

  const panels = [getLunchOrder(), DINNER_SLOTS];

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    swiped.current = false;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const startY = dragStartY.current;
    dragStartY.current = null;
    if (startY === null) return;

    const dy = e.clientY - startY;
    if (Math.abs(dy) < SWIPE_THRESHOLD) return;

    swiped.current = true;
    // 위로 밀면 다음(저녁), 아래로 밀면 이전(점심).
    setMeal(dy < 0 ? 1 : 0);
  };

  const handleClick = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    setMeal((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div
      css={css`
        display: flex;
        box-sizing: border-box;
        width: 324px;
        height: 96px;
        overflow: hidden;
        box-shadow: var(--shadow_card);
        border: var(--border_default);
        border-radius: var(--radius_widget);
        background-color: var(--background_color_02);
      `}
    >
      <div
        role="group"
        aria-label="점심·저녁 선택"
        css={css`
          flex: none;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          width: 66px;
          padding-left: 14px;
        `}
      >
        {MEALS.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={meal === index}
            onClick={() => setMeal(index)}
            css={css`
              width: 46px;
              height: 28px;
              padding: 0;
              border: 0;
              border-radius: 8px;
              background: none;
              font-size: 14px;
              color: ${meal === index ? 'var(--color_01)' : 'var(--color_04)'};
              font-weight: ${meal === index ? 'bold' : 'normal'};
              cursor: pointer;
              transition:
                background 0.2s ease,
                color 0.2s ease;

              &:hover {
                color: ${meal === index ? 'var(--color_01)' : 'var(--color_06)'};
              }

              &:focus-visible {
                outline: 2px solid var(--color_06);
                outline-offset: 2px;
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        aria-label={
          meal === 0
            ? '점심 배식시간. 누르거나 위로 넘기면 저녁 배식시간을 볼 수 있습니다.'
            : '저녁 배식시간. 누르거나 아래로 넘기면 점심 배식시간을 볼 수 있습니다.'
        }
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        css={css`
          flex: 1;
          height: 100%;
          overflow: hidden;
          padding: 0;
          border: 0;
          background: none;
          color: inherit;
          text-align: left;
          cursor: pointer;
          user-select: none;
          /* 세로 제스처는 위젯이 받고, 가로 제스처는 브라우저에 넘긴다. */
          touch-action: pan-x;

          &:focus-visible {
            outline: 2px solid var(--color_06);
            outline-offset: -3px;
            border-radius: var(--radius_widget);
          }
        `}
      >
        <div
          style={{ transform: `translateY(-${meal * PANEL_HEIGHT}px)` }}
          css={css`
            transition: transform 0.3s ease;

            @media (prefers-reduced-motion: reduce) {
              transition: none;
            }
          `}
        >
          {panels.map((slots, index) => (
            <MealPanel key={MEALS[index]} slots={slots} />
          ))}
        </div>
      </button>
    </div>
  );
};

export default LunchTime;
