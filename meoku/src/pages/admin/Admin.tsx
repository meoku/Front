import { useEffect, useState } from "react";
import InputMenus from "../../components/InputMenu";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/react";
import axios from "axios";
import { DailyMenu } from "../../type/type";
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
  const [menuData, setMenuData] = useState<DailyMenu[]>([]);
  // const [kk, setKK] = useState(0);
  useEffect(() => {
    axios.get("/menuData").then((res) => {
      console.log(res.data);
      setMenuData(res.data);
    });
  }, []);
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
        {menuData[0] && (
          <InputMenus menuData={menuData[0].detailedMenuDTOList} day={"월"} />
        )}
        {menuData[1] && (
          <InputMenus menuData={menuData[1].detailedMenuDTOList} day={"화"} />
        )}
        {menuData[2] && (
          <InputMenus menuData={menuData[2].detailedMenuDTOList} day={"수"} />
        )}
        {menuData[3] && (
          <InputMenus menuData={menuData[3].detailedMenuDTOList} day={"목"} />
        )}
        {menuData[4] && (
          <InputMenus menuData={menuData[4].detailedMenuDTOList} day={"금"} />
        )}
      </div>
    </div>
  );
};

export default Admin;
