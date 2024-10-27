import { css, keyframes } from "@emotion/react";
import Navbar from "../../components/Navbar";
import Weather from "../../components/Weather";
import Day from "../../components/Day";
import LunchTime from "../../components/LunchTime";
import LunchBtn from "../../components/LunchBtn";
import { useRecoilState } from "recoil";
import timeState from "../../store/atoms/time";
import { useQuery } from "@tanstack/react-query";
import { calculateDayArr, formatDate } from "../../utils/dateUtils";
import { fetchMenuData } from "../../api/menuApi";
import { defaultMenuData } from "../../utils/defaultMenuData";
import { firstMenu } from "../../type/type";
import DailyMenu from "../../components/DailyMenu";
import bottomarrow from "/bottonarrow.svg";
import DinnerTime from "../../components/DinnerTime";
import DailyDinnerMenu from "../../components/DailyDinnerMenu";
interface RequestData {
  date: string;
}

const moveUpDown = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;
const MainPage = () => {
  const [date] = useRecoilState(timeState);
  const requestData: RequestData = {
    date: formatDate(date),
  };

  const { data: menuData } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () => fetchMenuData(requestData),
    initialData: defaultMenuData,
  });

  const dayArr: [string | undefined, number][] = calculateDayArr(date);
  return (
    <div
      css={css`
        width: 100vw;
      `}
    >
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
          margin-top: 26px;
          /* margin-left: 20px; */
          background-color: var(--background_color_01);
        `}
      >
        {menuData?.map((menu: firstMenu, index: number) => {
          return (
            <DailyMenu
              key={index}
              dayWeek={dayArr[index][0]}
              day={dayArr[index][1]}
              menuData={menu}
              isToday={
                dayArr[index][1] == new Date().getDate() &&
                date.getMonth() == new Date().getMonth()
              }
            />
          );
        })}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--background_color_01);
        `}
      >
        <img
          src={bottomarrow}
          css={css`
            width: 74px;
            height: 74px;
            margin-top: 20px;
            animation: ${moveUpDown} 1s ease-in-out infinite;
            cursor: pointer;
          `}
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          }}
        />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.25rem;
            margin-left: 280px;
            height: 96px;
            flex-wrap: nowrap;
            background-color: var(--background_color_01);
          `}
        >
          <Day time={"저녁"} />
          <DinnerTime />
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 36px;
            /* margin-left: 20px; */
          `}
        >
          {menuData.map((menu: firstMenu, index: number) => {
            return (
              <DailyDinnerMenu
                key={index}
                dayWeek={dayArr[index][0]}
                day={dayArr[index][1]}
                menuData={menu}
                isToday={
                  dayArr[index][1] == new Date().getDate() &&
                  date.getMonth() == new Date().getMonth()
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
