import { css } from "@emotion/react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.3);
        z-index: 9999;
      `}
    >
      <SyncLoader color="#ff3c00" />
    </div>
  );
};

export default Loading;
