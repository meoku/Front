//현재날짜 입력 => 현재 몇월 몇주
export const getWeekOfMonth = (date: Date): string => {
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDate.getDay();

  const nowDay = date.getDay() === 0 ? 7 : date.getDay();
  const startWeekOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - nowDay + 1
  );
  const endWeekOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - nowDay + 5
  );
  let weekIndex = ((startWeekOfDay.getDate() / 7) >> 0) + 1;

  if (firstDayOfWeek !== 1) {
    weekIndex += 1;
  }
  if (firstDate.getDay() !== 1) {
    weekIndex -= 1;
  }
  if (startWeekOfDay.getMonth() != endWeekOfDay.getMonth()) {
    weekIndex = 5;
  }
  if (startWeekOfDay.getDate() % 7 === 0) {
    weekIndex -= 1;
  }
  return `${startWeekOfDay.getMonth() + 1}월 ${weekIndex}주`;
};

//숫자 => 요일변환
export const getDayWeek = (day: number) => {
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
// const getDayWeek = (day: number) => {
//   const days = [
//     "일요일",
//     "월요일",
//     "화요일",
//     "수요일",
//     "목요일",
//     "금요일",
//     "토요일",
//   ];
//   return days[day];
// };

export const calculateDayArr = (date: Date): [string | undefined, number][] => {
  const dayWeek = date.getDay();
  let dayArr: [string | undefined, number][] = [];

  const calculateDate = (offset: number) => {
    return new Date(new Date().setDate(date.getDate() + offset)).getDate();
  };

  switch (dayWeek) {
    case 0:
      dayArr = [
        [getDayWeek(dayWeek + 1), calculateDate(-6)],
        [getDayWeek(dayWeek + 2), calculateDate(-5)],
        [getDayWeek(dayWeek + 3), calculateDate(-4)],
        [getDayWeek(dayWeek + 4), calculateDate(-3)],
        [getDayWeek(dayWeek + 5), calculateDate(-2)],
      ];
      break;
    case 1:
      dayArr = [
        [getDayWeek(dayWeek), calculateDate(0)],
        [getDayWeek(dayWeek + 1), calculateDate(1)],
        [getDayWeek(dayWeek + 2), calculateDate(2)],
        [getDayWeek(dayWeek + 3), calculateDate(3)],
        [getDayWeek(dayWeek + 4), calculateDate(4)],
      ];
      break;
    case 2:
      dayArr = [
        [getDayWeek(dayWeek - 1), calculateDate(-1)],
        [getDayWeek(dayWeek), calculateDate(0)],
        [getDayWeek(dayWeek + 1), calculateDate(1)],
        [getDayWeek(dayWeek + 2), calculateDate(2)],
        [getDayWeek(dayWeek + 3), calculateDate(3)],
      ];
      break;
    case 3:
      dayArr = [
        [getDayWeek(dayWeek - 2), calculateDate(-2)],
        [getDayWeek(dayWeek - 1), calculateDate(-1)],
        [getDayWeek(dayWeek), calculateDate(0)],
        [getDayWeek(dayWeek + 1), calculateDate(1)],
        [getDayWeek(dayWeek + 2), calculateDate(2)],
      ];
      break;
    case 4:
      dayArr = [
        [getDayWeek(dayWeek - 3), calculateDate(-3)],
        [getDayWeek(dayWeek - 2), calculateDate(-2)],
        [getDayWeek(dayWeek - 1), calculateDate(-1)],
        [getDayWeek(dayWeek), calculateDate(0)],
        [getDayWeek(dayWeek + 1), calculateDate(1)],
      ];
      break;
    case 5:
      dayArr = [
        [getDayWeek(dayWeek - 4), calculateDate(-4)],
        [getDayWeek(dayWeek - 3), calculateDate(-3)],
        [getDayWeek(dayWeek - 2), calculateDate(-2)],
        [getDayWeek(dayWeek - 1), calculateDate(-1)],
        [getDayWeek(dayWeek), calculateDate(0)],
      ];
      break;
    case 6:
      dayArr = [
        [getDayWeek(dayWeek - 5), calculateDate(-5)],
        [getDayWeek(dayWeek - 4), calculateDate(-4)],
        [getDayWeek(dayWeek - 3), calculateDate(-3)],
        [getDayWeek(dayWeek - 2), calculateDate(-2)],
        [getDayWeek(dayWeek - 1), calculateDate(-1)],
      ];
      break;
  }

  return dayArr;
};

export const getTodayWeek = (date: Date, num: number) => {
  const targetDate = new Date(date);
  targetDate.setDate(date.getDate() - num);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const calculateDayArrAdmin = (
  date: Date
): [string | undefined, number, string][] => {
  const dayWeek = date.getDay();
  let dayArr: [string | undefined, number, string][] = [];

  const calculateDate = (offset: number) => {
    return new Date(new Date().setDate(date.getDate() + offset)).getDate();
  };

  const createDayEntry = (offset: number, weekOffset: number) => {
    return [
      getDayWeek(dayWeek + offset),
      calculateDate(-weekOffset),
      getTodayWeek(date, weekOffset),
    ] as [string | undefined, number, string];
  };

  switch (dayWeek) {
    case 0:
      dayArr = [
        createDayEntry(1, 6),
        createDayEntry(2, 5),
        createDayEntry(3, 4),
        createDayEntry(4, 3),
        createDayEntry(5, 2),
      ];
      break;
    case 1:
      dayArr = [
        createDayEntry(0, 0),
        createDayEntry(1, -1),
        createDayEntry(2, -2),
        createDayEntry(3, -3),
        createDayEntry(4, -4),
      ];
      break;
    case 2:
      dayArr = [
        createDayEntry(-1, 1),
        createDayEntry(0, 0),
        createDayEntry(1, -1),
        createDayEntry(2, -2),
        createDayEntry(3, -3),
      ];
      break;
    case 3:
      dayArr = [
        createDayEntry(-2, 2),
        createDayEntry(-1, 1),
        createDayEntry(0, 0),
        createDayEntry(1, -1),
        createDayEntry(2, -2),
      ];
      break;
    case 4:
      dayArr = [
        createDayEntry(-3, 3),
        createDayEntry(-2, 2),
        createDayEntry(-1, 1),
        createDayEntry(0, 0),
        createDayEntry(1, -1),
      ];
      break;
    case 5:
      dayArr = [
        createDayEntry(-4, 4),
        createDayEntry(-3, 3),
        createDayEntry(-2, 2),
        createDayEntry(-1, 1),
        createDayEntry(0, 0),
      ];
      break;
    case 6:
      dayArr = [
        createDayEntry(-5, 5),
        createDayEntry(-4, 4),
        createDayEntry(-3, 3),
        createDayEntry(-2, 2),
        createDayEntry(-1, 1),
      ];
      break;
  }

  return dayArr;
};
//yyyy-mm-dd포맷으로 변경
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
