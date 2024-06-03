import { css } from "@emotion/react";
import icNav from "../assets/icNav.svg";
import { TextR20 } from "./common/Text";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const Text = styled.h2`
  //   font-size: 16px;
  //   /* margin: 0 50px; */
  //   margin-left: 100px;
  //   min-width: 100px;
  //   color: #666666;
  //   &:hover {
  //     font-weight: bold;
  //     cursor: pointer;
  //   }
  // `;
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        background-color: #ffffff;
        height: 80px;
      `}
    >
      <div css={css``}>
        <Link to="/">
          <img
            css={css`
              /* display: flex;
            justify-content: center;
            align-items: center; */
              /* margin: 0 auto; */
              margin-left: -30px;
              width: 252px;
              height: 60px;
              white-space: nowrap;
            `}
            src={icNav}
            alt="image"
          />
        </Link>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          /* min-width: 300px; */
          margin-left: 510px;
        `}
      >
        <TextR20
          css={css`
            color: var(--color_06);
            &:hover {
              font-weight: bold;
              cursor: pointer;
            }
          `}
        >
          구내식당표
        </TextR20>
        <TextR20
          css={css`
            color: var(--color_06);
            margin-left: 90px;
            &:hover {
              font-weight: bold;
              cursor: pointer;
            }
          `}
        >
          맛집리스트
        </TextR20>
        <TextR20
          css={css`
            color: var(--color_06);
            margin-left: 90px;
            &:hover {
              font-weight: bold;
              cursor: pointer;
            }
          `}
        >
          AI추천
        </TextR20>
      </div>
    </div>
  );
};
export default Navbar;
