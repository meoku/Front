// Admin.tsx
import InputMenus from "../../components/InputMenu";
import Navbar from "../../components/Navbar";
import { css } from "@emotion/react";
import Weather from "../../components/Weather";
import Day from "../../components/Day";
import LunchTime from "../../components/LunchTime";
import LunchBtn from "../../components/LunchBtn";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import timeState from "../../store/atoms/time";
import { adminMenu } from "../../type/type";
import { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import {
  fetchAdminMenuData,
  uploadMenuData,
  uploadMenuFile,
} from "../../api/menuApi";
import { calculateDayArrAdmin, formatDate } from "../../utils/dateUtils";

interface RequestData {
  date: string;
}

const Admin = () => {
  const [date] = useRecoilState(timeState);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [sendFileState, setSendFileState] = useState(false);
  const [fileData, setFileData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dayArr: [string | undefined, number, string][] =
    calculateDayArrAdmin(date);

  const requestData: RequestData = {
    date: formatDate(date),
  };

  const { data: fetchedMenuData, refetch } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () =>
      fetchAdminMenuData(requestData, sendFileState, dayArr, fileData),
  });

  const [menuData, setMenuData] = useState<adminMenu[]>([]);

  useEffect(() => {
    refetch();
    setSendFileState(false);
  }, [fileData]);

  useEffect(() => {
    if (fetchedMenuData) {
      setMenuData(fetchedMenuData);
    }
  }, [fetchedMenuData]);

  const postMenuData = async (data: adminMenu[]) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].holidayFg === "Y") {
        delete data[i].menuDetailsList;
      }
      if (data[i].holidayFg === "N") {
        const detailsList = data[i].menuDetailsList || [];
        for (const detail of detailsList) {
          for (const bridge of detail.subBridgeList) {
            if (bridge.menuItemName === " " || !bridge.menuItemName) {
              alert(`${i + 1}번째 메뉴 값이 없습니다.`);
              return;
            }
          }
        }
      }
    }
    try {
      setIsLoading(true);
      console.log("Sending data:", data);
      await uploadMenuData(data);
      alert("저장성공");
    } catch (error) {
      console.error("Failed to post data:", error);
      alert("저장실패");
    } finally {
      setIsLoading(false);
    }
  };

  const postMenuFile = async () => {
    if (!selectedFile) {
      alert("파일이 선택되지 않았습니다.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("menuFile", selectedFile);

    try {
      const data = await uploadMenuFile(selectedFile);
      setFileData(data);
      setSendFileState(true);
    } catch (error) {
      console.error("Failed to upload file:", error);
      alert("파일 업로드 실패");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div
      css={css`
        height: 1200px;
        width: 160%;
        overflow-x: auto;
      `}
    >
      {isLoading && <Loading />}
      <Navbar />
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
          height: 96px;
          flex-wrap: nowrap;
        `}
      >
        <Weather />
        <Day time={"점심"} />
        <LunchTime />
        <LunchBtn />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 20px 0px;
          padding-left: 750px;
        `}
      >
        <input type="file" accept="*.pdf image/*" onChange={handleFileChange} />
        <button
          css={css`
            background-color: orange;
            margin-right: 10px;
          `}
          onClick={() => {
            if (confirm("사진을 전송 하시겠습니까?")) {
              postMenuFile();
            } else {
              return;
            }
          }}
        >
          사진 전송
        </button>
        <button
          css={css`
            background-color: orange;
          `}
          onClick={() => {
            for (let i = 0; i < menuData.length; i++) {
              if (menuData[i]) {
                menuData[i].menuDate = dayArr[i][2];
              }
            }
            if (confirm("등록 하시겠습니까?")) {
              postMenuData(menuData);
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
          align-items: flex-start;
          width: 90%;
          height: 70vh;
          margin: 0 auto;
        `}
      >
        {menuData?.[0] && (
          <InputMenus
            menuData={menuData[0]}
            dayWeek={dayArr[0][0]}
            day={dayArr[0][1]}
            onChange={(updatedMenu) => {
              setMenuData((prev) => {
                const newMenus = [...prev];
                newMenus[0] = updatedMenu;
                return newMenus;
              });
            }}
          />
        )}
        {menuData?.[1] && (
          <InputMenus
            menuData={menuData[1]}
            dayWeek={dayArr[1][0]}
            day={dayArr[1][1]}
            onChange={(updatedMenu) => {
              setMenuData((prev) => {
                const newMenus = [...prev];
                newMenus[1] = updatedMenu;
                return newMenus;
              });
            }}
          />
        )}
        {menuData?.[2] && (
          <InputMenus
            menuData={menuData[2]}
            dayWeek={dayArr[2][0]}
            day={dayArr[2][1]}
            onChange={(updatedMenu) => {
              setMenuData((prev) => {
                const newMenus = [...prev];
                newMenus[2] = updatedMenu;
                return newMenus;
              });
            }}
          />
        )}
        {menuData?.[3] && (
          <InputMenus
            menuData={menuData[3]}
            dayWeek={dayArr[3][0]}
            day={dayArr[3][1]}
            onChange={(updatedMenu) => {
              setMenuData((prev) => {
                const newMenus = [...prev];
                newMenus[3] = updatedMenu;
                return newMenus;
              });
            }}
          />
        )}
        {menuData?.[4] && (
          <InputMenus
            menuData={menuData[4]}
            dayWeek={dayArr[4][0]}
            day={dayArr[4][1]}
            onChange={(updatedMenu) => {
              setMenuData((prev) => {
                const newMenus = [...prev];
                newMenus[4] = updatedMenu;
                return newMenus;
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
