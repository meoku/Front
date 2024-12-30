//현재날짜 입력 => 현재 몇월 몇주
export const getWeekOfMonth = (date: Date): string => {
  //주에 속하는 월요일 찾기
  const dateDayOfWeek = date.getDay() || 7; // 일요일(0)을 7로 변경
  const daysToSubtract = dateDayOfWeek - 1;
  const dateWeekMonday = new Date(date);
  dateWeekMonday.setDate(date.getDate() - daysToSubtract);

  const monthDays: { [key: number]: number } = {};
  for (let i = 0; i < 5; i++) {
    const day = new Date(dateWeekMonday);
    day.setDate(dateWeekMonday.getDate() + i);
    const month = day.getMonth();
    if (!monthDays[month]) {
      monthDays[month] = 0;
    }
    monthDays[month]++;
  }

  //평일이 더 많이 분포된 month를 결정
  let assignedMonth = date.getMonth();
  let assignedYear = date.getFullYear();
  let maxDays = monthDays[assignedMonth] || 0;

  for (const month in monthDays) {
    const m = parseInt(month, 10);
    if (monthDays[m] > maxDays) {
      assignedMonth = m;
      maxDays = monthDays[m];
    }
  }

  if (assignedMonth < date.getMonth()) {
    assignedYear++;
  }

  //첫 번째 주(월요일) 찾기
  const assignedMonthFirstDay = new Date(assignedYear, assignedMonth, 1);
  const assignedMonthFirstMonday = new Date(assignedMonthFirstDay);
  const firstDayOfWeek = assignedMonthFirstDay.getDay() || 7;
  const daysToSubtractFirstMonday = (firstDayOfWeek + 6) % 7;
  assignedMonthFirstMonday.setDate(
    assignedMonthFirstDay.getDate() - daysToSubtractFirstMonday
  );

  //속하는 수 계산
  let weekdaysInAssignedMonth = 0;
  for (let i = 0; i < 5; i++) {
    const day = new Date(assignedMonthFirstMonday);
    day.setDate(assignedMonthFirstMonday.getDate() + i);
    if (day.getMonth() === assignedMonth) {
      weekdaysInAssignedMonth++;
    }
  }
  //첫 주에 3일 미만이면, 다음 주가 해당 월의 첫 주
  if (weekdaysInAssignedMonth < 3) {
    assignedMonthFirstMonday.setDate(assignedMonthFirstMonday.getDate() + 7);
  }

  //주차 계산
  const diffInDays =
    (dateWeekMonday.getTime() - assignedMonthFirstMonday.getTime()) /
    (7 * 24 * 3600 * 1000);

  //음수가 되면 1주차로 보정
  let weekIndex = Math.floor(diffInDays) + 1;
  if (weekIndex < 1) {
    weekIndex = 1;
  }

  const monthDisplay = assignedMonth + 1;
  return `${monthDisplay}월 ${weekIndex}주`;
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

export const calculateDayArr = (date: Date): [string | undefined, number][] => {
  const dayWeek = date.getDay();
  let dayArr: [string | undefined, number][] = [];

  const calculateDate = (offset: number) => {
    const tempDate = new Date(date); // date 객체를 복사합니다.
    tempDate.setDate(tempDate.getDate() + offset); // offset을 적용합니다.
    return tempDate.getDate();
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
  const targetDate = new Date(date); // date 객체를 복사합니다.
  targetDate.setDate(targetDate.getDate() - num); // targetDate를 기준으로 계산합니다.

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
    const tempDate = new Date(date); // date 객체를 복사합니다.
    tempDate.setDate(tempDate.getDate() + offset); // offset을 적용합니다.
    return tempDate.getDate();
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
