import { css } from '@emotion/react';
import { TextB20, TextR16 } from './Text';

interface ErrorNoticeProps {
  /** 넘기면 "다시 시도" 버튼이 붙는다. 보통 useQuery 의 refetch 를 준다. */
  onRetry?: () => void;
}

/**
 * 서버가 응답하지 않을 때의 안내.
 *
 * "식단이 아직 등록되지 않은 주(= 준비중입니다)" 와 반드시 구분되어야 한다.
 * 둘 다 화면에 식단이 없다는 점은 같지만, 전자는 시간이 지나면 채워지는 정상
 * 상태이고 후자는 장애라 사용자가 다시 시도할 수 있어야 한다.
 */
const ErrorNotice = ({ onRetry }: ErrorNoticeProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        max-width: var(--layout_content_width);
        padding: var(--space_12) var(--space_5);
        border: var(--border_default);
        border-radius: var(--radius_card);
        box-shadow: var(--shadow_card);
        background-color: var(--background_color_02);
      `}
    >
      <TextB20>일시적인 오류입니다</TextB20>
      <TextR16
        css={css`
          margin-top: var(--space_2);
          color: var(--color_04);
        `}
      >
        잠시 후 다시 시도해 주세요
      </TextR16>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          css={css`
            margin-top: var(--space_5);
            padding: var(--space_2) var(--space_6);
            border: none;
            border-radius: var(--radius_widget);
            background-color: var(--color_01);
            color: var(--background_color_02);
            font-family: inherit;
            font-size: var(--font_size_16);
            font-weight: var(--font_weight_bold);
            cursor: pointer;
          `}
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorNotice;
