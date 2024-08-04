import { useState, useEffect } from "react";

const getDayWeek = (day: number) => {
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return days[day];
};

const useDayArr = (currentDate: Date) => {
  const [dayArr, setDayArr] = useState<[string | undefined, number][]>([]);
  const dayWeek = currentDate.getDay();

  useEffect(() => {
    const newDayArr: [string | undefined, number][] = [];
    if (dayWeek === 0) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() + 1),
          new Date(new Date().setDate(currentDate.getDate() - 6)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 2),
          new Date(new Date().setDate(currentDate.getDate() - 5)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 3),
          new Date(new Date().setDate(currentDate.getDate() - 4)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 4),
          new Date(new Date().setDate(currentDate.getDate() - 3)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 5),
          new Date(new Date().setDate(currentDate.getDate() - 2)).getDate(),
        ]
      );
    } else if (dayWeek === 1) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay()),
          new Date(new Date().setDate(currentDate.getDate())).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 1),
          new Date(new Date().setDate(currentDate.getDate() + 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 2),
          new Date(new Date().setDate(currentDate.getDate() + 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 3),
          new Date(new Date().setDate(currentDate.getDate() + 3)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 4),
          new Date(new Date().setDate(currentDate.getDate() + 4)).getDate(),
        ]
      );
    } else if (dayWeek === 2) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() - 1),
          new Date(new Date().setDate(currentDate.getDate() - 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay()),
          new Date(new Date().setDate(currentDate.getDate())).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 1),
          new Date(new Date().setDate(currentDate.getDate() + 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 2),
          new Date(new Date().setDate(currentDate.getDate() + 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 3),
          new Date(new Date().setDate(currentDate.getDate() + 3)).getDate(),
        ]
      );
    } else if (dayWeek === 3) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() - 2),
          new Date(new Date().setDate(currentDate.getDate() - 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 1),
          new Date(new Date().setDate(currentDate.getDate() - 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay()),
          new Date(new Date().setDate(currentDate.getDate())).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 1),
          new Date(new Date().setDate(currentDate.getDate() + 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 2),
          new Date(new Date().setDate(currentDate.getDate() + 2)).getDate(),
        ]
      );
    } else if (dayWeek === 4) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() - 3),
          new Date(new Date().setDate(currentDate.getDate() - 3)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 2),
          new Date(new Date().setDate(currentDate.getDate() - 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 1),
          new Date(new Date().setDate(currentDate.getDate() - 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay()),
          new Date(new Date().setDate(currentDate.getDate())).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() + 1),
          new Date(new Date().setDate(currentDate.getDate() + 1)).getDate(),
        ]
      );
    } else if (dayWeek === 5) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() - 4),
          new Date(new Date().setDate(currentDate.getDate() - 4)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 3),
          new Date(new Date().setDate(currentDate.getDate() - 3)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 2),
          new Date(new Date().setDate(currentDate.getDate() - 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 1),
          new Date(new Date().setDate(currentDate.getDate() - 1)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay()),
          new Date(new Date().setDate(currentDate.getDate())).getDate(),
        ]
      );
    } else if (dayWeek === 6) {
      newDayArr.push(
        [
          getDayWeek(currentDate.getDay() - 5),
          new Date(new Date().setDate(currentDate.getDate() - 5)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 4),
          new Date(new Date().setDate(currentDate.getDate() - 4)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 3),
          new Date(new Date().setDate(currentDate.getDate() - 3)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 2),
          new Date(new Date().setDate(currentDate.getDate() - 2)).getDate(),
        ],
        [
          getDayWeek(currentDate.getDay() - 1),
          new Date(new Date().setDate(currentDate.getDate() - 1)).getDate(),
        ]
      );
    }
    setDayArr(newDayArr);
  }, [currentDate, dayWeek]);

  return dayArr;
};

export default useDayArr;
