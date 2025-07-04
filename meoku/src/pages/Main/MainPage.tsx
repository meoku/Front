import { css } from '@emotion/react';
import Navbar from '../../components/Navbar';
import Weather from '../../components/Weather';
import Day from '../../components/Day';
import LunchTime from '../../components/LunchTime';
import LunchBtn from '../../components/LunchBtn';
import { useRecoilState } from 'recoil';
import timeState from '../../store/atoms/time';
import { useQuery } from '@tanstack/react-query';
import { calculateDayArr, formatDate } from '../../utils/dateUtils';
import { fetchMenuData } from '../../api/menuApi';
import { defaultMenuData } from '../../utils/defaultMenuData';
import { firstMenu } from '../../type/type';
import DailyMenu from '../../components/DailyMenu';
import DailyDinnerMenu from '../../components/DailyDinnerMenu';
import FloatingButton from '../../components/FloatingButton';

const MainPage = () => {
  const [date] = useRecoilState(timeState);
  const formattedDate = formatDate(date);

  const { data: menuData } = useQuery({
    queryKey: ['menuData', formattedDate],
    queryFn: () => fetchMenuData({ date: formattedDate }),
    placeholderData: defaultMenuData,
    staleTime: 5 * 60 * 1000,
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
          align-items: center;
          // margin-top: 1.25rem;
          height: 96px;
          flex-wrap: nowrap;
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 1.25rem auto;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            position: absolute;
            left: 10px;
          `}
        >
          <Weather />
        </div>
        <Day time={'점심'} />
        <div
          css={css`
            display: flex;
            align-items: center;
            position: absolute;
            right: 10px;
          `}
        >
          <LunchTime />
          <LunchBtn />
        </div>
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
                dayArr[index][1] == new Date().getDate() && date.getMonth() == new Date().getMonth()
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
          margin-top: 1.25rem;
          background-color: var(--background_color_01);
          position: relative;
          width: 100%;
        `}
      >
        {/* <img
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
              behavior: 'smooth',
            });
          }}
        /> */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 96px;
            flex-wrap: nowrap;
            background-color: var(--background_color_01);
            width: 100%;
          `}
        >
          <Day time={'저녁'} showArrows={false} />
          {/* <DinnerTime /> */}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            // margin-top: 36px;
            /* margin-left: 20px; */
          `}
        >
          {Array.isArray(menuData) &&
            menuData.map((menu: firstMenu, index: number) => {
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
      <FloatingButton />
    </div>
  );
};

export default MainPage;
