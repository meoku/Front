import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { getLunchOrder } from '../../utils/lunchOrder';

/**
 * 모바일 상단 배식 시간 배너.
 *
 * Figma: M/widget/timebanner/01 (92x48, radius 6)
 * - 배식 순서 3개를 한 칸에 하나씩 보여주고, 세로 스와이프로 넘긴다.
 * - 오른쪽 세로 3점이 현재 위치를 나타낸다.
 * - 탭하면 기존과 동일하게 배식순서 팝업이 열린다.
 */

interface Props {
  onClick: () => void;
}

const SWIPE_THRESHOLD = 20; // 이만큼 끌어야 한 칸 넘어감 (px)

const MobileTimeBanner = ({ onClick }: Props) => {
  const slots = getLunchOrder();
  const [index, setIndex] = useState(0);

  // 스와이프인지 탭인지 구분하기 위한 상태
  const startY = useRef<number | null>(null);
  const swiped = useRef(false);

  const move = (delta: number) => {
    setIndex((prev) => Math.min(slots.length - 1, Math.max(0, prev + delta)));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    swiped.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;
    const delta = e.touches[0].clientY - startY.current;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    // 위로 끌면 다음 칸, 아래로 끌면 이전 칸
    move(delta < 0 ? 1 : -1);
    startY.current = e.touches[0].clientY;
    swiped.current = true;
  };

  const handleTouchEnd = () => {
    startY.current = null;
  };

  // 스와이프로 넘긴 직후의 클릭은 팝업을 열지 않는다
  const handleClick = () => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    onClick();
  };

  // 키보드 접근성 (위/아래로 이동, Enter/Space 로 팝업)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  // 층 순서가 주마다 바뀌므로, 칸 수가 줄어드는 경우에 대비해 index 를 보정
  useEffect(() => {
    if (index > slots.length - 1) setIndex(0);
  }, [slots.length, index]);

  const current = slots[index];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`배식 순서 ${current.range} ${current.floor}. 탭하면 전체 순서를 볼 수 있습니다.`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      css={css`
        position: relative;
        width: 92px;
        height: 48px;
        box-sizing: border-box;
        border-radius: var(--radius_mobile_sm);
        background-color: var(--color_02);
        cursor: pointer;
        user-select: none;
        touch-action: pan-x; /* 세로 스와이프를 이 배너가 가져간다 */
        overflow: hidden;
      `}
    >
      {/* 텍스트 영역: 오른쪽 닷(6px) 자리를 비워둔다 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding-right: 14px;
          gap: 6px;
        `}
      >
        <span
          css={css`
            font-size: var(--font_size_12);
            font-weight: var(--font_weight_medium);
            color: var(--color_05);
            line-height: 1;
          `}
        >
          {current.start}
        </span>
        <span
          css={css`
            font-size: var(--font_size_12);
            font-weight: var(--font_weight_medium);
            color: var(--color_04);
            line-height: 1;
            white-space: nowrap;
          `}
        >
          {current.floor}
        </span>
      </div>

      {/* 세로 스와이프 닷 (Figma: x=78, 6x34) */}
      <div
        aria-hidden
        css={css`
          position: absolute;
          top: 7px;
          right: 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        {slots.map((_, i) => (
          <span
            key={i}
            css={css`
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: ${i === index ? 'var(--color_05)' : 'var(--color_03)'};
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTimeBanner;
