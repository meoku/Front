/**
 * 배식 순서.
 *
 * 시간대는 고정이고, 각 시간대에 배정되는 층이 주 단위로 로테이션된다.
 * 원래 LunchTime.tsx 안에 있던 로직을 그대로 옮긴 것으로, 계산 방식은 바꾸지 않았다.
 * 모바일 타임배너와 배식순서 팝업이 같은 순서를 보여주도록 여기서만 계산한다.
 */

export interface LunchSlot {
  /** 배너용 시작 시간 ("11:30") */
  start: string;
  /** 팝업용 전체 구간 ("11:30 ~ 12:30") */
  range: string;
  /** 해당 시간대에 배식하는 층 */
  floor: string;
}

const TIME_SLOTS = [
  { start: '11:30', range: '11:30 ~ 12:30' },
  { start: '12:00', range: '12:00 ~ 13:00' },
  { start: '12:30', range: '12:30 ~ 13:30' },
];

/** 1970-01-01(목)부터의 주차. 월요일 기준. */
function getWeeksSince1970(date: Date) {
  const timeDifferenceInMilliseconds = date.getTime() - date.getTimezoneOffset() * 60 * 1000;
  const daysSince1970 = Math.floor(timeDifferenceInMilliseconds / (24 * 60 * 60 * 1000));
  const dayOfWeek = (daysSince1970 + 3) % 7;
  return Math.floor((daysSince1970 + 3 - dayOfWeek) / 7) + 1;
}

/** 이번 주 층 순서 */
function getFloorOrder(week: number): string[] {
  if (week % 3 == 0) {
    return ['4(아성)·5·6층', '1·3층', '2·4층(IT)'];
  } else if (week % 3 == 1) {
    return ['1·3층', '2·4층(IT)', '4(아성)·5·6층'];
  }
  return ['2·4층(IT)', '4(아성)·5·6층', '1·3층'];
}

/** 이번 주 배식 순서 3개. 시간 순으로 정렬되어 있다. */
export function getLunchOrder(date: Date = new Date()): LunchSlot[] {
  const floors = getFloorOrder(getWeeksSince1970(date));
  return TIME_SLOTS.map((slot, i) => ({ ...slot, floor: floors[i] }));
}

/**
 * 저녁 배식. 점심과 달리 층 로테이션이 없어 전층이 한 시간대에 배식한다.
 * 서버에서 내려주는 값이 아니라 디자인(개선안 — 메인)에 적힌 고정값이다.
 */
export const DINNER_SLOTS: LunchSlot[] = [
  { start: '18:00', range: '18:00 ~ 19:00', floor: '전층' },
];
