import { useEffect, useState } from "react";
import InputMenus from "../../components/InputMenu";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/react";
import axios from "axios";
import { dailyMenu, menuDetail } from "../../type/type";
import { postMenuData } from "../../api/temp";
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
  const [menuData, setMenuData] = useState<dailyMenu[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  // const handleSubmit = async () => {
  //   if (selectedFile) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("image", selectedFile);

  //       const response = await axios.post("/api/upload", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };
  const handleMenuData = (data: menuDetail[], day: string) => {
    const arr = menuData;
    if (day == "월") {
      arr[0].detailedMenuDTOList = data;
      setMenuData(arr);
    } else if (day == "화") {
      arr[1].detailedMenuDTOList = data;
      setMenuData(arr);
    } else if (day == "수") {
      arr[2].detailedMenuDTOList = data;
      setMenuData(arr);
    } else if (day == "목") {
      arr[3].detailedMenuDTOList = data;
      setMenuData(arr);
    } else if (day == "금") {
      arr[4].detailedMenuDTOList = data;
      setMenuData(arr);
    }
  };
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {/* <button
          css={css`
            background-color: orange;
            margin-right: 10px;
          `}
          onClick={() => {
            if (confirm("사진을 전송 하시겠습니까?")) {
              postMenuData(menuData, selectedFile);
            } else {
              return;
            }
          }}
        >
          사진 전송
        </button> */}
        <button
          css={css`
            background-color: orange;
          `}
          onClick={() => {
            if (confirm("전송 하시겠습니까?")) {
              postMenuData(menuData, selectedFile);
            } else {
              return;
            }
          }}
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
          height: 70vh;
          margin: 0 auto;
        `}
      >
        {menuData[0] && (
          <InputMenus
            menuData={menuData[0].detailedMenuDTOList}
            day={"월"}
            handleMenuData={handleMenuData}
          />
        )}
        {menuData[1] && (
          <InputMenus
            menuData={menuData[1].detailedMenuDTOList}
            day={"화"}
            handleMenuData={handleMenuData}
          />
        )}
        {menuData[2] && (
          <InputMenus
            menuData={menuData[2].detailedMenuDTOList}
            day={"수"}
            handleMenuData={handleMenuData}
          />
        )}
        {menuData[3] && (
          <InputMenus
            menuData={menuData[3].detailedMenuDTOList}
            day={"목"}
            handleMenuData={handleMenuData}
          />
        )}
        {menuData[4] && (
          <InputMenus
            menuData={menuData[4].detailedMenuDTOList}
            day={"금"}
            handleMenuData={handleMenuData}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
