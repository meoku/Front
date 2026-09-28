import { css } from '@emotion/react';
import { useEffect } from 'react';
import { getLunchOrder } from '../../utils/lunchOrder';

interface ModalProps {
  closeModal: () => void;
}

/**
 * 모바일 배식순서 팝업.
 * 타임배너를 탭하면 열리고, 이번 주 배식 순서 3개를 전부 보여준다.
 * 순서는 타임배너와 같은 getLunchOrder() 를 쓴다.
 */
const MobileModal = ({ closeModal }: ModalProps) => {
  const slots = getLunchOrder();

  // ESC 로 닫기 + 열려 있는 동안 뒤 화면 스크롤 잠금
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal]);

  return (
    <div
      onClick={closeModal}
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        z-index: 999999;
      `}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lunch-order-title"
        /* 팝업 안을 눌렀을 때는 닫히지 않도록 */
        onClick={(e) => e.stopPropagation()}
        css={css`
          width: 100%;
          max-width: 300px;
          box-sizing: border-box;
          background: var(--background_color_02);
          border-radius: var(--radius_mobile);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          padding: 24px 20px 20px;
        `}
      >
        <h2
          id="lunch-order-title"
          css={css`
            margin: 0;
            text-align: center;
            font-size: var(--font_size_16);
            font-weight: var(--font_weight_bold);
            color: var(--color_06);
          `}
        >
          배식 순서
        </h2>
        <p
          css={css`
            margin: 4px 0 0;
            text-align: center;
            font-size: var(--font_size_12);
            color: var(--color_04);
          `}
        >
          이번 주 점심
        </p>

        <ul
          css={css`
            list-style: none;
            margin: 20px 0 0;
            padding: 0;
          `}
        >
          {slots.map((slot, i) => (
            <li
              key={slot.start}
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                padding: 14px 0;
                border-top: ${i === 0 ? 'none' : 'var(--border_default)'};
              `}
            >
              <span
                css={css`
                  font-size: var(--font_size_14);
                  font-weight: var(--font_weight_bold);
                  color: var(--color_06);
                  white-space: nowrap;
                `}
              >
                {slot.range}
              </span>
              <span
                css={css`
                  font-size: var(--font_size_14);
                  color: var(--color_05);
                  text-align: right;
                `}
              >
                {slot.floor}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={closeModal}
          css={css`
            width: 100%;
            margin-top: 20px;
            padding: 12px 0;
            border: none;
            border-radius: var(--radius_mobile_sm);
            background-color: var(--color_01);
            color: var(--background_color_02);
            font-family: inherit;
            font-size: var(--font_size_14);
            font-weight: var(--font_weight_bold);
            cursor: pointer;
          `}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MobileModal;
