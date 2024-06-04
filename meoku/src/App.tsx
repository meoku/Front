import { css } from "@emotion/react";
import "./App.css";
import Day from "./components/Day";
import LunchBtn from "./components/LunchBtn";
import LunchTime from "./components/LunchTime";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import DailyMenu from "./components/DailyMenu";
import bottomarrow from "./assets/bottonarrow.svg";
import DinnerTime from "./components/DinnerTime";
import DailyDinnerMenu from "./components/DailyDinnerMenu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { firstMenu } from "./type/type";
import TodayDailyMenu from "./components/TodayDailyMenu";

interface RequestData {
  isMonthOrWeek: string;
  date: string;
}

const fetchData = async ({ isMonthOrWeek, date }: RequestData) => {
  const response = await axios.post(
    "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1/meoku/weekdaysmenu",
    {
      isMonthOrWeek,
      date,
    }
  );
  return response.data;
};

function App() {
  const date = new Date();
  const dayWeek = date.getDay();
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const requestData: RequestData = {
    isMonthOrWeek: "week",
    date: formatDate(new Date()),
    // date: "2024-05-31",
  };
  const { data: menuData } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () => fetchData(requestData),
  });
  console.log(menuData);
  // console.log(menuData[1]);
  // console.log(menuData[2]);
  // console.log(menuData[3]);

  let dayArr: [string | undefined, number][] = [];
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
        new Date(new Date().setDate(new Date().getDate() - 6)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(new Date().getDate() - 5)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(new Date().getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(new Date().getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 5),
        new Date(new Date().setDate(new Date().getDate() - 2)).getDate(),
      ],
    ];
  } else if (dayWeek === 1) {
    dayArr = [
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(new Date().getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(new Date().getDate() + 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(new Date().getDate() + 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(new Date().getDate() + 4)).getDate(),
      ],
    ];
  } else if (dayWeek === 2) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(new Date().getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(new Date().getDate() + 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(new Date().getDate() + 3)).getDate(),
      ],
    ];
  } else if (dayWeek == 3) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(new Date().getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(new Date().getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(new Date().getDate() + 2)).getDate(),
      ],
    ];
  } else if (dayWeek == 4) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(new Date().getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(new Date().getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(new Date().getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(new Date().getDate() + 1)).getDate(),
      ],
    ];
  } else if (dayWeek == 5) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(new Date().getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(new Date().getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(new Date().getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(new Date().getDate())).getDate(),
      ],
    ];
  } else if (dayWeek == 6) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 5),
        new Date(new Date().setDate(new Date().getDate() - 5)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(new Date().getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(new Date().getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(new Date().getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(new Date().getDate() - 1)).getDate(),
      ],
    ];
  }
  return (
    <div>
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
          background-color: var(--background_color_01);
        `}
      >
        {menuData &&
          menuData.map((menu: firstMenu, index: number) => {
            return dayArr[index][1] == new Date().getDate() + 1 ? (
              <TodayDailyMenu
                key={index}
                dayWeek={dayArr[index][0]}
                day={dayArr[index][1]}
                menuData={menu}
              />
            ) : (
              <DailyMenu
                key={index}
                dayWeek={dayArr[index][0]}
                day={dayArr[index][1]}
                menuData={menu}
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
          `}
        />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 1.25rem;
            margin-left: 252px;
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
            align-items: flex-start;
            margin-top: 36px;
          `}
        >
          {menuData &&
            menuData.map((menu: firstMenu, index: number) => {
              return (
                <DailyDinnerMenu
                  key={index}
                  dayWeek={dayArr[index][0]}
                  day={dayArr[index][1]}
                  menuData={menu}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
