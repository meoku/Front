import { css } from "@emotion/react";
import styled from "@emotion/styled";
import icNav from "../assets/icNav.svg";
const Navbar = () => {
  const Text = styled.h2`
    font-size: 16px;
    margin: 0 50px;
    min-width: 100px;
    color: #666666;
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  `;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      `}
    >
      <div
        css={css`
          width: 50%;
        `}
      >
        <img
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            width: 252px;
            height: 60px;
            white-space: nowrap;
            min-width: 300px;
          `}
          src={icNav}
          alt="image"
        />
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          width: 50%;
          min-width: 300px;
        `}
      >
        <Text>구내식당표</Text>
        <Text>맛집리스트</Text>
        <Text>AI 추천</Text>
      </div>
    </div>
  );
};
export default Navbar;
