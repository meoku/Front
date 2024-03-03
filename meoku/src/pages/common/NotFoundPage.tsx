import { css } from "@emotion/react";
import icNav from "../../assets/icNav.svg";
const NotFoundPage = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 5rem; /* 변경: 텍스트 크기 조정 */
        margin: 0 auto;
        &:hover {
          color: pink;
        }
      `}
    >
      <img
        css={css`
          width: 100rem;
        `}
        src={icNav}
        alt="Vite logo"
      />
      존재하지 않는 페이지 입니다.
    </div>
  );
};
export default NotFoundPage;
