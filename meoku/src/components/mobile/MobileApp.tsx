import styled from '@emotion/styled';
import { calculateDayArr, formatDate, getWeekOfMonth } from '../../utils/dateUtils';
import timeState from '../../store/atoms/time';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import icHamburger from '/icHamburger.svg';
import icNav from '/icNav.svg';
import leftarrow from '/leftarrow.svg';
import Slider from 'react-slick';
import { TextB20, TextR16 } from '../common/Text';
import rightarrow from '/rightarrow.svg';
import MobileModal from './MobileModal';
import MobileDailyMenu from './MobileDailyMenu';
import MobileDailyDinnerMenu from './MobileTodayDailyDinnerMenu';
import { firstMenu } from '../../type/type';
import { useQuery } from '@tanstack/react-query';
import { fetchMenuData } from '../../api/menuApi';
import { defaultMenuData } from '../../utils/defaultMenuData';
import { fetchWeatherData } from '../../api/weatherApi';
import { getWeatherImg } from '../../utils/weatherUtils';
import MobileFloatingButton from './MobileFloatingButton';

const MobileMain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  height: 44px;
  position: relative;
  z-index: 50;
`;

const PageContainer = styled.div`
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ContentWrapper = styled.div`
  height: 100%;
  overflow: hidden;
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  margin-top: 12px;
`;
const MobileWeather = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 44px;
  background-color: var(--color_02);
  border-radius: 6px;
`;
const MobileDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MobileSideBtn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90px;
`;
const MobileDays = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;
const MobileDayBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  background-color: var(--color_02);
  border-radius: 10px;
  margin: 6px 6px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MobileDayBtnSelected = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  background-color: var(--color_04);
  color: var(--background_color_02);
  border-radius: 10px;
  margin: 6px 6px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MobileDayBtnSelectedToday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  background-color: var(--color_01);
  color: var(--background_color_02);
  border-radius: 10px;
  margin: 6px 6px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;
const NavigationMenu = styled.div<NavigationMenuProps>`
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  z-index: 2;
  padding: 10px 0 10px 0;
`;
const MenuItem = styled.div`
  padding: 10px 0 10px 42px;
  /* border-bottom: 1px solid #f0f0f0; */

  a {
    text-decoration: none;
    color: #000;
    font-size: 18px;
  }
`;
interface RequestData {
  date: string;
}
interface NavigationMenuProps {
  isOpen: boolean;
}
const SliderContainer = styled.div`
  position: relative;
  height: 100%;
`;

const SliderContent = styled.div`
  max-height: calc(100vh - 180px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const MobileApp = () => {
  const [date, setDate] = useRecoilState(timeState);
  const [selectedDay, setSelectedDay] = useState(date.getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHamOpen, setIsHamOpen] = useState(false);
  const dayArr: [string | undefined, number][] = calculateDayArr(date);
  const sliderRef = useRef<Slider | null>(null);
  const requestData: RequestData = {
    date: formatDate(date),
  };
  const { data: menuData } = useQuery({
    queryKey: ['data', requestData],
    queryFn: () => fetchMenuData(requestData),
    initialData: defaultMenuData,
  });

  const { data: weatherData } = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchWeatherData(),
  });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleHamburger = () => {
    setIsHamOpen(!isHamOpen);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: selectedDay - 1,
    slidesToScroll: 1,
    beforeChange: (left: number, right: number) => {
      if (left < 0 || right < 0) {
        return;
      }
      if (left > right) {
        if (right == 0) setSelectedDay(1);
        else if (right == 1) setSelectedDay(2);
        else if (right == 2) setSelectedDay(3);
        else if (right == 3) setSelectedDay(4);
        // else setSelectedDay(selectedDay - 1);
      }
      if (left < right) {
        if (right == 4) setSelectedDay(5);
        else if (right == 3) setSelectedDay(4);
        else if (right == 2) setSelectedDay(3);
        else if (right == 1) setSelectedDay(2);
        // else setSelectedDay(selectedDay + 1);
      }
    },
  };
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
  return (
    <PageContainer>
      <MobileMain>
        <Link to="/">
          <img
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 148px;
              height: 32px;
              white-space: nowrap;
              position: relative;
              left: 10px;
            `}
            src={icNav}
            alt="image"
          />
        </Link>
        <img
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            position: relative;
            right: 10px;
          `}
          onClick={() => {
            toggleHamburger();
          }}
          src={icHamburger}
          alt="image"
        />
      </MobileMain>
      {isHamOpen && (
        <>
          <div
            css={css`
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              z-index: 1;
            `}
            onClick={toggleHamburger}
          />
          <NavigationMenu isOpen={isHamOpen}>
            <MenuItem>
              <TextR16>구내식당표</TextR16>
              {/* <Link to="/menu1">구내식당표</Link> */}
            </MenuItem>
            <MenuItem>
              <TextR16>맛집리스트</TextR16>
              {/* <Link to="/menu2">맛집리스트</Link> */}
            </MenuItem>
            <MenuItem>
              <TextR16>AI 추천</TextR16>
              {/* <Link to="/menu3">AI 추천</Link> */}
            </MenuItem>
          </NavigationMenu>
        </>
      )}
      <ContentWrapper>
        <MobileHeader>
          <MobileWeather>
            <img
              src={`${
                weatherData?.data?.responseBody?.precipitationType == '0'
                  ? getWeatherImg(false, weatherData?.data?.responseBody?.skyCondition)
                  : getWeatherImg(true, weatherData?.data?.responseBody?.precipitationType)
              }`}
              css={css`
                width: 25.626px; // 수정 요구 필요
                height: 27.222px;
                padding: 2.5px 3.258px 2.278px 3.116px;
              `}
            />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: 1px;
              `}
            >
              <h1
                css={css`
                  color: var(--color_06);
                  text-align: right;
                  font-size: 23px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                  padding-left: 1px;
                `}
              >
                {`${
                  weatherData?.data?.responseBody?.temperature
                    ? weatherData?.data?.responseBody?.temperature + '˚'
                    : ''
                }`}
              </h1>
              <h1
                css={css`
                  color: var(--color_06);
                  text-align: right;
                  font-size: 7px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                `}
              >
                서울특별시
              </h1>
            </div>
          </MobileWeather>
          <MobileDay>
            <img
              src={leftarrow}
              alt="arrowImg"
              onClick={() => {
                setDate(new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000));
                setSelectedDay(5);
                sliderRef?.current?.slickGoTo(4);
              }}
            />
            <div
              onClick={() => {
                if (date.getDate() == new Date().getDate()) return;
                setDate(new Date());
                setSelectedDay(new Date().getDay());
                sliderRef?.current?.slickGoTo(new Date().getDay() - 1);
              }}
            >
              <TextB20
                css={css`
                  color: var(--color_01);
                  cursor: pointer;
                `}
              >
                {getWeekOfMonth(date)}
              </TextB20>
            </div>
            <img
              src={rightarrow}
              alt="arrowImg"
              onClick={() => {
                setDate(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000));
                setSelectedDay(1);
                sliderRef?.current?.slickGoTo(0);
              }}
            />
          </MobileDay>
          <MobileSideBtn>
            {/* <img src={icMonth} alt="arrowImg" /> */}
            {/* <img src={icShare} alt="arrowImg" /> */}
            {isModalOpen && <MobileModal closeModal={closeModal} />}
            <button
              css={css`
                border: 1px solid black;
                white-space: nowrap;
                padding: 5px 10px;
                background-color: #f9f9f9;
                color: black;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                text-decoration: none;
                cursor: pointer;
                &:hover {
                  background-color: #f0f0f0;
                }
              `}
              onClick={openModal}
            >
              식단순서
            </button>
          </MobileSideBtn>
        </MobileHeader>
        <div>
          <MobileDays>
            {selectedDay == 1 ? (
              date.getDay() === selectedDay && dayArr[0][1] == new Date().getDate() ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    setSelectedDay(1);
                    sliderRef?.current?.slickGoTo(0);
                  }}
                >
                  월
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    setSelectedDay(1);
                    sliderRef?.current?.slickGoTo(0);
                  }}
                >
                  월
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  setSelectedDay(1);
                  sliderRef?.current?.slickGoTo(0);
                }}
              >
                월
              </MobileDayBtn>
            )}
            {selectedDay == 2 ? (
              date.getDay() === selectedDay && dayArr[1][1] == new Date().getDate() ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    setSelectedDay(2);
                    sliderRef?.current?.slickGoTo(1);
                  }}
                >
                  화
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    setSelectedDay(2);
                    sliderRef?.current?.slickGoTo(1);
                  }}
                >
                  화
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  setSelectedDay(2);
                  sliderRef?.current?.slickGoTo(1);
                }}
              >
                화
              </MobileDayBtn>
            )}
            {selectedDay == 3 ? (
              date.getDay() === selectedDay && dayArr[2][1] == new Date().getDate() ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    setSelectedDay(3);
                    sliderRef?.current?.slickGoTo(2);
                  }}
                >
                  수
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    setSelectedDay(3);
                    sliderRef?.current?.slickGoTo(2);
                  }}
                >
                  수
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  setSelectedDay(3);
                  sliderRef?.current?.slickGoTo(2);
                }}
              >
                수
              </MobileDayBtn>
            )}
            {selectedDay == 4 ? (
              date.getDay() === selectedDay && dayArr[3][1] == new Date().getDate() ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    setSelectedDay(4);
                    sliderRef?.current?.slickGoTo(3);
                  }}
                >
                  목
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    setSelectedDay(4);
                    sliderRef?.current?.slickGoTo(3);
                  }}
                >
                  목
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  setSelectedDay(4);
                  sliderRef?.current?.slickGoTo(3);
                }}
              >
                목
              </MobileDayBtn>
            )}
            {selectedDay == 5 ? (
              date.getDay() === selectedDay && dayArr[4][1] == new Date().getDate() ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    setSelectedDay(5);
                    sliderRef?.current?.slickGoTo(4);
                  }}
                >
                  금
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    setSelectedDay(5);
                    sliderRef?.current?.slickGoTo(4);
                  }}
                >
                  금
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  setSelectedDay(5);
                  sliderRef?.current?.slickGoTo(4);
                }}
              >
                금
              </MobileDayBtn>
            )}
          </MobileDays>
          <SliderContainer>
            <Slider {...settings} ref={sliderRef}>
              {menuData?.map((menu: firstMenu, index: number) => {
                return (
                  <div key={`menu-slide-${index}`}>
                    <SliderContent>
                      <MobileDailyMenu
                        key={index + 'mobile'}
                        dayWeek={dayArr[index][0]}
                        day={dayArr[index][1]}
                        menuData={menu}
                        isToday={
                          dayArr[index][1] == new Date().getDate() &&
                          date.getMonth() == new Date().getMonth()
                        }
                      />
                      <MobileDailyDinnerMenu
                        key={index + 'mobileDinner'}
                        dayWeek={dayArr[index][0]}
                        day={dayArr[index][1]}
                        menuData={menu}
                        isToday={
                          dayArr[index][1] == new Date().getDate() &&
                          date.getMonth() == new Date().getMonth()
                        }
                      />
                    </SliderContent>
                  </div>
                );
              })}
            </Slider>
          </SliderContainer>
        </div>
      </ContentWrapper>
      <MobileFloatingButton />
    </PageContainer>
  );
};
export default MobileApp;
