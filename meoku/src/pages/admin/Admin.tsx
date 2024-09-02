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
  // const dayWeek = date.getDay();
  const requestData: RequestData = {
    date: formatDate(date),
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

  const dayArr: [string | undefined, number, string][] =
    calculateDayArrAdmin(date);

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
