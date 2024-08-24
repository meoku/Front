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

interface RequestData {
  date: string;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Admin = () => {
  const [date] = useRecoilState(timeState);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [sendFileState, setSendFileState] = useState(false);
  const [fileData, setFileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dayWeek = date.getDay();
  const requestData: RequestData = {
    date: formatDate(date),
    // date: "2024-05-31",
  };
  const { data: menuData, refetch } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () =>
      fetchAdminMenuData(requestData, sendFileState, dayArr, fileData),
  });

  useEffect(() => {
    refetch();
    setSendFileState(false);
  }, [fileData]);
  const postMenuData = async (data: adminMenu[]) => {
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
  const getTodayWeek = (date: Date, num: number) => {
    const targetDate = new Date(date);
    targetDate.setDate(date.getDate() - num);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  let dayArr: [string | undefined, number, string][] = [];
  const getDayWeek = (day: number) => {
    if (day === 0) {
      return "일요일";
    } else if (day === 1) {
      return "월요일";
    } else if (day === 2) {
      return "화요일";
    } else if (day === 3) {
      return "수요일";
    } else if (day === 4) {
      return "목요일";
    } else if (day === 5) {
      return "금요일";
    } else if (day === 6) {
      return "토요일";
    }
  };
  if (dayWeek === 0) {
    dayArr = [
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() - 6)).getDate(),
        getTodayWeek(date, 6),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() - 5)).getDate(),
        getTodayWeek(date, 5),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
        getTodayWeek(date, 4),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
        getTodayWeek(date, 3),
      ],
      [
        getDayWeek(date.getDay() + 5),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
        getTodayWeek(date, 2),
      ],
    ];
  } else if (dayWeek === 1) {
    dayArr = [
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
        getTodayWeek(date, 0),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
        getTodayWeek(date, -1),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
        getTodayWeek(date, -2),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() + 3)).getDate(),
        getTodayWeek(date, -3),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(date.getDate() + 4)).getDate(),
        getTodayWeek(date, -4),
      ],
    ];
  } else if (dayWeek === 2) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
        getTodayWeek(date, 1),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
        getTodayWeek(date, 0),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
        getTodayWeek(date, -1),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
        getTodayWeek(date, -2),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() + 3)).getDate(),
        getTodayWeek(date, -3),
      ],
    ];
  } else if (dayWeek == 3) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
        getTodayWeek(date, 2),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
        getTodayWeek(date, 1),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
        getTodayWeek(date, 0),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
        getTodayWeek(date, -1),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
        getTodayWeek(date, -2),
      ],
    ];
  } else if (dayWeek == 4) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
        getTodayWeek(date, 3),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
        getTodayWeek(date, 2),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
        getTodayWeek(date, 1),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
        getTodayWeek(date, 0),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
        getTodayWeek(date, -1),
      ],
    ];
  } else if (dayWeek == 5) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
        getTodayWeek(date, 4),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
        getTodayWeek(date, 3),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
        getTodayWeek(date, 2),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
        getTodayWeek(date, 1),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
        getTodayWeek(date, 0),
      ],
    ];
  } else if (dayWeek == 6) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 5),
        new Date(new Date().setDate(date.getDate() - 5)).getDate(),
        getTodayWeek(date, 5),
      ],
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
        getTodayWeek(date, 4),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
        getTodayWeek(date, 3),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
        getTodayWeek(date, 2),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
        getTodayWeek(date, 1),
      ],
    ];
  }
  return (
    <div
      css={css`
        height: 1200px;
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
        <input type="file" accept="image/*" onChange={handleFileChange} />
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
            if (confirm("등록 하시겠습니까?")) {
              postMenuData(menuData);
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
          align-items: flex-start;
          /* flex-wrap: wrap; */
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
            // handleMenuData={handleMenuData}
          />
        )}
        {menuData?.[1] && (
          <InputMenus
            menuData={menuData[1]}
            dayWeek={dayArr[1][0]}
            day={dayArr[1][1]}
            // handleMenuData={handleMenuData}
          />
        )}
        {menuData?.[2] && (
          <InputMenus
            menuData={menuData[2]}
            dayWeek={dayArr[2][0]}
            day={dayArr[2][1]}
            // handleMenuData={handleMenuData}
          />
        )}
        {menuData?.[3] && (
          <InputMenus
            menuData={menuData[3]}
            dayWeek={dayArr[3][0]}
            day={dayArr[3][1]}
            // handleMenuData={handleMenuData}
          />
        )}
        {menuData?.[4] && (
          <InputMenus
            menuData={menuData[4]}
            dayWeek={dayArr[4][0]}
            day={dayArr[4][1]}
            // handleMenuData={handleMenuData}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
