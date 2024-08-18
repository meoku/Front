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
// import icMonth from "/icMonth.svg";
// import icShare from "/icShare.svg";
import { Link } from "react-router-dom";
import { TextB20 } from "./components/common/Text";
import Slider from "react-slick";
import MobileDailyMenu from "./components/mobile/MobileDailyMenu";
import MobileTodayDailyMenu from "./components/mobile/MobileTodayDailyyMenu";
import MobileTodayDailyDinnerMenu from "./components/mobile/MobileTodayDailyDinnerMenu";
import MobileDailyDinnerMenu from "./components/mobile/MobileDailyDinnerMenu";
import { useEffect, useRef, useState } from "react";
import sunnyImage from "/weather/ImageSunny.svg";
import { useRecoilState } from "recoil";
import timeState from "./store/atoms/time";
import MobileModal from "./components/mobile/MobileModal";

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

const fetchData = async ({ date }: RequestData) => {
  const response = await axios.post(
    // "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1/meoku/weekdaysmenu",
    "https://port-0-meokuserver-1cupyg2klv9emciy.sel5.cloudtype.app/api/v1/meokumenu/weekdaysmenu",
    {
      date,
    }
  );
  for (let i = 0; i < 5; i++) {
    if (response.data[i].menuDetailsList.length == 5) {
      response.data[i].menuDetailsList.splice(1, 0, []);
    }
  }
  return response.data;
};

function App() {
  const [date, setDate] = useRecoilState(timeState);
  const [selectedDay, setSelectedDay] = useState(date.getDay());
  // const date = new Date();
  const dayWeek = date.getDay();
  const sliderRef = useRef<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const requestData: RequestData = {
    date: formatDate(date),
    // date: "2024-05-31",
  };
  const { data: menuData } = useQuery({
    queryKey: ["data", requestData],
    queryFn: () => fetchData(requestData),
  });
  const noMenuData = [[], [], [], [], []];
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
  const getWeekOfMonth = (date: Date): string => {
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
        new Date(new Date().setDate(date.getDate() - 6)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() - 5)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 5),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
      ],
    ];
  } else if (dayWeek === 1) {
    dayArr = [
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() + 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 4),
        new Date(new Date().setDate(date.getDate() + 4)).getDate(),
      ],
    ];
  } else if (dayWeek === 2) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 3),
        new Date(new Date().setDate(date.getDate() + 3)).getDate(),
      ],
    ];
  } else if (dayWeek == 3) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 2),
        new Date(new Date().setDate(date.getDate() + 2)).getDate(),
      ],
    ];
  } else if (dayWeek == 4) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
      ],
      [
        getDayWeek(date.getDay() + 1),
        new Date(new Date().setDate(date.getDate() + 1)).getDate(),
      ],
    ];
  } else if (dayWeek == 5) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
      ],
      [
        getDayWeek(date.getDay()),
        new Date(new Date().setDate(date.getDate())).getDate(),
      ],
    ];
  } else if (dayWeek == 6) {
    dayArr = [
      [
        getDayWeek(date.getDay() - 5),
        new Date(new Date().setDate(date.getDate() - 5)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 4),
        new Date(new Date().setDate(date.getDate() - 4)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 3),
        new Date(new Date().setDate(date.getDate() - 3)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 2),
        new Date(new Date().setDate(date.getDate() - 2)).getDate(),
      ],
      [
        getDayWeek(date.getDay() - 1),
        new Date(new Date().setDate(date.getDate() - 1)).getDate(),
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
            {menuData && menuData.length > 0 ? (
              menuData.map((menu: firstMenu, index: number) => {
                return dayArr[index][1] == new Date().getDate() &&
                  date.getMonth() == new Date().getMonth() ? (
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
              })
            ) : (
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
                {noMenuData.map((_, index: number) => {
                  return (
                    <div>
                      <DailyMenu
                        key={index + "mobile2"}
                        dayWeek={dayArr[index][0]}
                        day={dayArr[index][1]}
                        // menuData={menu}
                      />
                    </div>
                  );
                })}
              </div>
            )}
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
              {menuData && menuData.length > 0 ? (
                menuData.map((menu: firstMenu, index: number) => {
                  return dayArr[index][1] == new Date().getDate() &&
                    date.getMonth() == new Date().getMonth() ? (
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
                })
              ) : (
                <div
                  css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  {noMenuData.map((_, index: number) => {
                    return (
                      <div>
                        <DailyDinnerMenu
                          key={index + "mobile2"}
                          dayWeek={dayArr[index][0]}
                          day={dayArr[index][1]}
                          // menuData={menu}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
                  weatherData?.data?.responseBody?.temperature
                    ? weatherData?.data?.responseBody?.temperature + "’"
                    : ""
                }`}
                <img src={sunnyImage} alt="sun" />
              </div>
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
              date.getDay() === selectedDay &&
              dayArr[0][1] == new Date().getDate() ? (
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
              date.getDay() === selectedDay &&
              dayArr[1][1] == new Date().getDate() ? (
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
              date.getDay() === selectedDay &&
              dayArr[2][1] == new Date().getDate() ? (
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
              date.getDay() === selectedDay &&
              dayArr[3][1] == new Date().getDate() ? (
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
              date.getDay() === selectedDay &&
              dayArr[4][1] == new Date().getDate() ? (
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
          {menuData && menuData.length > 0 ? (
            <Slider {...settings} ref={sliderRef}>
              {menuData.map((menu: firstMenu, index: number) => {
                return dayArr[index][1] == new Date().getDate() &&
                  date.getMonth() == new Date().getMonth() ? (
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
          ) : (
            // <div>
            //   {noMenuData.map((_, index: number) => {
            //     return selectedDay - 1 == index ? (
            //       <div>
            //         <MobileDailyMenu
            //           key={index + "mobile2"}
            //           dayWeek={dayArr[index][0]}
            //           day={dayArr[index][1]}
            //           // menuData={menu}
            //         />
            //       </div>
            //     ) : (
            //       <div></div>
            //     );
            //   })}
            // </div>
            <Slider {...settings} ref={sliderRef}>
              {noMenuData.map((_, index: number) => {
                return dayArr[index][1] == date.getDate() &&
                  date.getMonth() == new Date().getMonth() ? (
                  <div>
                    <MobileDailyMenu
                      key={index + "mobileToday"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                    />
                  </div>
                ) : (
                  <div>
                    <MobileDailyMenu
                      key={index + "mobile"}
                      dayWeek={dayArr[index][0]}
                      day={dayArr[index][1]}
                    />
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
      </MobileView>
    </div>
  );
}

export default App;
