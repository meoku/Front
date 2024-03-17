import InputMenu from "../../components/InputMenu";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/react";
const Admin = () => {
  return (
    <div>
      <Navbar />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100vw;
          height: 80vh;
        `}
      >
        <InputMenu />
        <InputMenu />
        <InputMenu />
        <InputMenu />
        <InputMenu />
      </div>
    </div>
  );
};

export default Admin;
