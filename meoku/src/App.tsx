import { css } from "@emotion/react";
import "./App.css";
import Day from "./components/Day";
import LunchBtn from "./components/LunchBtn";
import LunchTime from "./components/LunchTime";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import DailyMenu from "./components/DailyMenu";
import bottomarrow from "./assets/bottonarrow.svg";
// import DinnerTime from "./components/DinnerTime";

function App() {
  const date = new Date();
  const dayWeek = date.getDay();
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
        <Day />
        <LunchTime />
        <LunchBtn />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 86px;
        `}
      >
        <DailyMenu dayWeek={dayArr[0][0]} day={dayArr[0][1]} />
        <DailyMenu dayWeek={dayArr[1][0]} day={dayArr[1][1]} />
        <DailyMenu dayWeek={dayArr[2][0]} day={dayArr[2][1]} />
        <DailyMenu dayWeek={dayArr[3][0]} day={dayArr[3][1]} />
        <DailyMenu dayWeek={dayArr[4][0]} day={dayArr[4][1]} />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
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
      </div>
      {/* <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
          height: 96px;
          flex-wrap: nowrap;
          background-color: var(--background_color_01);
        `}
      >
        <Day />
        <DinnerTime />
      </div> */}
    </div>
  );
}

export default App;
