import { css } from "@emotion/react";
const InputMenu = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto 0;
      `}
    >
      <div>월</div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 3rem;
          border: 1px solid black;
          border-radius: 50px;
        `}
      >
        <h6>한식</h6>
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <h6>일품</h6>
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <h6>plus</h6>
        <input />
        <input />
        <h6>샐러드팩</h6>
        <input />
        <h6>간편식</h6>
        <input />
        <h6>석식</h6>
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <input />
        <h6>plus</h6>
        <input />
        <input />
      </div>
      <div>
        <button>+</button>
        <button>-</button>
      </div>
    </div>
  );
};
export default InputMenu;
