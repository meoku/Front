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
import axios from "axios";
import { firstMenu } from "./type/type";
import TodayDailyMenu from "./components/TodayDailyMenu";
import TodayDailyDinnerMenu from "./components/TodayDailyDinnerMenu";
import { BrowserView, MobileView } from "react-device-detect";
import styled from "@emotion/styled";
import icNav from "/icNav.svg";
import icHamburger from "/icHamburger.svg";
import leftarrow from "/leftarrow.svg";
import rightarrow from "/rightarrow.svg";
import icMonth from "/icMonth.svg";
import icShare from "/icShare.svg";
import { Link } from "react-router-dom";
import { TextB20 } from "./components/common/Text";
import Slider from "react-slick";
import MobileDailyMenu from "./components/mobile/MobileDailyMenu";
import MobileTodayDailyMenu from "./components/mobile/MobileTodayDailyyMenu";
import MobileTodayDailyDinnerMenu from "./components/mobile/MobileTodayDailyDinnerMenu";
import MobileDailyDinnerMenu from "./components/mobile/MobileDailyDinnerMenu";
import { useEffect, useRef, useState } from "react";
import sunnyImage from "/weather/ImageSunny.svg";

interface RequestData {
  isMonthOrWeek: string;
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
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const date = new Date();
  const dayWeek = date.getDay();
  const sliderRef = useRef<Slider | null>(null);
  useEffect(() => {
    const day = new Date().getDay();
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
  const getWeatherDate = async () => {
    const res = await axios.get(
      "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1/meoku/getCurrentWeatherData"
    );
    return res;
  };
  const { data: weatherData } = useQuery({
    queryKey: ["data"],
    queryFn: () => getWeatherDate(),
  });

  const getWeekOfMonth = (date: Date) => {
    const month = date.getMonth() + 1;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    const weekOfMonth = Math.ceil(
      (date.getDate() + (7 - adjustedFirstDayOfWeek)) / 7
    );
    return `${month}월 ${weekOfMonth}주`;
  };

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
  const MobileMain = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    height: 44px;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 44px;
    background-color: var(--color_02);
    border-radius: 5px;
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    initialSlide: selectedDay - 1,
    slidesToScroll: 1,
    beforeChange: (left: number, right: number) => {
      if (left > right) {
        if (right == 0) setSelectedDay(1);
        else if (right == 1) setSelectedDay(2);
        else if (right == 2) setSelectedDay(3);
        else setSelectedDay(selectedDay - 1);
      }
      if (left < right) {
        if (right == 4) setSelectedDay(5);
        else if (right == 3) setSelectedDay(4);
        else if (right == 2) setSelectedDay(3);
        else setSelectedDay(selectedDay + 1);
      }
    },
  };
  const MobileDays = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
            {menuData &&
              menuData.map((menu: firstMenu, index: number) => {
                return dayArr[index][1] == new Date().getDate() ? (
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
                animation: ${moveUpDown} 1s ease-in-out infinite;
              `}
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
              {menuData &&
                menuData.map((menu: firstMenu, index: number) => {
                  return dayArr[index][1] == new Date().getDate() ? (
                    <TodayDailyDinnerMenu
                      key={index}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                      menuData={menu}
                    />
                  ) : (
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
      </BrowserView>
      <MobileView>
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
            src={icHamburger}
            alt="image"
          />
        </MobileMain>
        <MobileHeader>
          <MobileWeather>
            <div>
              <div>서울특별시</div>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                {`${
                  weatherData?.data?.responseBody?.oneHourTemperature
                    ? weatherData?.data?.responseBody?.oneHourTemperature + "’"
                    : ""
                }`}
                <img src={sunnyImage} alt="sun" />
              </div>
            </div>
          </MobileWeather>
          <MobileDay>
            <img src={leftarrow} alt="arrowImg" />
            <TextB20
              css={css`
                color: var(--color_01);
              `}
            >
              {getWeekOfMonth(new Date())}
            </TextB20>
            <img src={rightarrow} alt="arrowImg" />
          </MobileDay>
          <MobileSideBtn>
            <img src={icMonth} alt="arrowImg" />
            <img src={icShare} alt="arrowImg" />
          </MobileSideBtn>
        </MobileHeader>
        <div>
          <MobileDays>
            {selectedDay == 1 ? (
              date.getDay() === selectedDay ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    // setSelectedDay(1);
                    sliderRef?.current?.slickGoTo(0);
                  }}
                >
                  월
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    // setSelectedDay(1);
                    sliderRef?.current?.slickGoTo(0);
                  }}
                >
                  월
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  // setSelectedDay(1);
                  sliderRef?.current?.slickGoTo(0);
                }}
              >
                월
              </MobileDayBtn>
            )}
            {selectedDay == 2 ? (
              date.getDay() === selectedDay ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    // setSelectedDay(2);
                    sliderRef?.current?.slickGoTo(1);
                  }}
                >
                  화
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    // setSelectedDay(2);
                    sliderRef?.current?.slickGoTo(1);
                  }}
                >
                  화
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  // setSelectedDay(2);
                  sliderRef?.current?.slickGoTo(1);
                }}
              >
                화
              </MobileDayBtn>
            )}
            {selectedDay == 3 ? (
              date.getDay() === selectedDay ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    // setSelectedDay(3);
                    sliderRef?.current?.slickGoTo(2);
                  }}
                >
                  수
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    // setSelectedDay(3);
                    sliderRef?.current?.slickGoTo(2);
                  }}
                >
                  수
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  // setSelectedDay(3);
                  sliderRef?.current?.slickGoTo(2);
                }}
              >
                수
              </MobileDayBtn>
            )}
            {selectedDay == 4 ? (
              date.getDay() === selectedDay ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    // setSelectedDay(4);
                    sliderRef?.current?.slickGoTo(3);
                  }}
                >
                  목
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    // setSelectedDay(4);
                    sliderRef?.current?.slickGoTo(3);
                  }}
                >
                  목
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  // setSelectedDay(4);
                  sliderRef?.current?.slickGoTo(3);
                }}
              >
                목
              </MobileDayBtn>
            )}
            {selectedDay == 5 ? (
              date.getDay() === selectedDay ? (
                <MobileDayBtnSelectedToday
                  onClick={() => {
                    // setSelectedDay(5);
                    sliderRef?.current?.slickGoTo(4);
                  }}
                >
                  금
                </MobileDayBtnSelectedToday>
              ) : (
                <MobileDayBtnSelected
                  onClick={() => {
                    // setSelectedDay(5);
                    sliderRef?.current?.slickGoTo(4);
                  }}
                >
                  금
                </MobileDayBtnSelected>
              )
            ) : (
              <MobileDayBtn
                onClick={() => {
                  // setSelectedDay(5);
                  sliderRef?.current?.slickGoTo(4);
                }}
              >
                금
              </MobileDayBtn>
            )}
          </MobileDays>
          <Slider {...settings} ref={sliderRef}>
            {menuData &&
              menuData.map((menu: firstMenu, index: number) => {
                return dayArr[index][1] == new Date().getDate() ? (
                  <div>
                    <MobileTodayDailyMenu
                      key={index + "mobileToday"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                      menuData={menu}
                    />
                    <MobileTodayDailyDinnerMenu
                      key={index + "mobileTodayDinner"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                      menuData={menu}
                    />
                  </div>
                ) : (
                  <div>
                    <MobileDailyMenu
                      key={index + "mobile"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                      menuData={menu}
                    />
                    <MobileDailyDinnerMenu
                      key={index + "mobileDinner"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                      menuData={menu}
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </MobileView>
    </div>
  );
}

export default App;
