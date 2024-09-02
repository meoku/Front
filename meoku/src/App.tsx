import { css, keyframes } from "@emotion/react";
import "./App.css";
import Day from "./components/Day";
import LunchBtn from "./components/LunchBtn";
import LunchTime from "./components/LunchTime";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import DailyMenu from "./components/DailyMenu";
import bottomarrow from "/bottonarrow.svg";
import DinnerTime from "./components/DinnerTime";
import DailyDinnerMenu from "./components/DailyDinnerMenu";
import { useQuery } from "@tanstack/react-query";
import { firstMenu } from "./type/type";
import { BrowserView, MobileView } from "react-device-detect";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import timeState from "./store/atoms/time";
import { fetchMenuData } from "./api/menuApi";
import { fetchWeatherData } from "./api/weatherApi";
import { calculateDayArr, formatDate } from "./utils/dateUtils";
import { defaultMenuData } from "./utils/defaultMenuData";
import MobileApp from "./components/mobile/MobileApp";

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

function App() {
  const [date] = useRecoilState(timeState);
  const [selectedDay, setSelectedDay] = useState(date.getDay());
  useEffect(() => {
    const day = date.getDay();
    if (day == 0) setSelectedDay(0);
    else if (day === 1) setSelectedDay(1);
    else if (day === 2) setSelectedDay(2);
    else if (day === 3) setSelectedDay(3);
    else if (day === 4) setSelectedDay(4);
    else if (day === 5) setSelectedDay(5);
    else if (day === 6) setSelectedDay(6);
  }, []);
  useEffect(() => {
    if (selectedDay <= 0) {
      setSelectedDay(5);
    } else if (selectedDay > 5) {
      setSelectedDay(1);
    }
  }, [selectedDay]);
  const requestData: RequestData = {
    date: formatDate(date),
  };

  const { data: menuData } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () => fetchMenuData(requestData),
    initialData: defaultMenuData,
  });

  const { data: weatherData } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetchWeatherData(),
  });

  const dayArr: [string | undefined, number][] = calculateDayArr(date);

  return (
    <div>
      <BrowserView>
        <div
          css={css`
            min-width: 1340px;
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
      </BrowserView>
      <MobileView>
        <MobileApp weatherData={weatherData} menuData={menuData} />
      </MobileView>
    </div>
  );
}

export default App;
