import { useState } from "react";
import InputMenu from "../../components/InputMenu";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/react";
const Admin = () => {
  // const onchangeImageUpload = (e) => {
  //   const { files } = e.target;
  //   const uploadFile = files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(uploadFile);
  //   reader.onloadend = () => {
  //     setUploadImgUrl(reader.result);
  //   };
  // };
  return (
    <div>
      <Navbar />
      <div
        css={css`
          display: flex;
          justify-content: right;
          align-items: center;
          margin: 30px 90px 10px 0;
        `}
      >
        <input type="file" accept="image/*" />
        <button
          css={css`
            background-color: orange;
          `}
        >
          등록하기
        </button>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          /* flex-wrap: wrap; */
          width: 90%;
          height: 80vh;
          margin: 0 auto;
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
