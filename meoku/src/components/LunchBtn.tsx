import { css } from "@emotion/react";
import monthBtn from "/monthBtn.svg";
import shareBtn from "/shareBtn.svg";
const LunchBtn = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      <img
        src={monthBtn}
        css={css`
          width: 52px;
          height: 68px;
          margin-left: 1.5rem;
          margin-right: 1rem;
        `}
      />
      <img
        src={shareBtn}
        css={css`
          width: 52px;
          height: 68px;
          /* margin-right: 1.625rem; */
        `}
      />
    </div>
  );
};

export default LunchBtn;
