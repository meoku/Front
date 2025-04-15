import { css } from "@emotion/react";
// import snowImage from "/weather/ImageSnow.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../api/weatherApi";
import { getWeatherImg } from "../utils/weatherUtils";

const Weather = () => {
  const skyMap = new Map();
  const rainMap = new Map();
  skyMap.set("1", "맑음");
  skyMap.set("3", "구름");
  skyMap.set("4", "흐림");
  rainMap.set("1", "비");
  rainMap.set("2", "비/눈");
  rainMap.set("3", "눈");
  rainMap.set("4", "소나기");
  const { data: weatherData } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetchWeatherData(),
  });
  const getUvIndex = () => {
    const value = weatherData?.data?.responseBody?.uvIndex;
    if (value < 3) {
      return "좋음";
    } else if (value < 6) {
      return "보통";
    } else if (value < 8) {
      return "나쁨";
    } else if (value < 10) {
      return "매우 나쁨";
    } else {
      return "위험";
    }
  };
  return (
    <div
      css={css`
        display: flex;
        min-width: 428px;
        height: 96px;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px;
        background-color: var(--background_color_02);
        color: var(--color_06);
      `}
    >
      <div>
        <img
          // src={snowImage}
          src={`${
            weatherData?.data?.responseBody?.precipitationType == "0"
              ? getWeatherImg(
                  false,
                  weatherData?.data?.responseBody?.skyCondition
                )
              : getWeatherImg(
                  true,
                  weatherData?.data?.responseBody?.precipitationType
                )
          }`}
          css={css`
            width: 64px;
            height: 64px;
            margin-top: 16px;
            margin-left: 24px;
            /* visibility: hidden; */
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 20px;
          margin-bottom: 2px;
          margin-top: 16px;
        `}
      >
        <p
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 33.6px;
            padding: 0 8px;
            height: 46px;
            width: 86px;
            font-size: 42px;
          `}
        >
          {`${
            weatherData?.data?.responseBody?.temperature
              ? weatherData?.data?.responseBody?.temperature + "˚"
              : ""
          }`}
        </p>

        <p
          css={css`
            display: flex;
            justify-content: center;
            margin-top: 2px;
            font-size: 11px;
            font-weight: 500;
            white-space: nowrap;
            height: 16px;
            padding: 2px 7px 2px 3px;
          `}
        >
          {`최저 ${weatherData?.data?.responseBody?.dailyMinimumTemperature}˚ | 최고 ${weatherData?.data?.responseBody?.dailyMaximumTemperature}˚`}
        </p>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: right;
          /* margin-top: 32px; */
          white-space: nowrap;
          margin-left: 18px;
        `}
      >
        {/* {
          <TextB24>{`${
            weatherData?.data?.responseBody?.precipitationType == "0"
              ? skyMap.get(weatherData?.data?.responseBody?.skyCondition)
              : rainMap.get(weatherData?.data?.responseBody?.precipitationType)
          }`}</TextB24>
        } */}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: 19px;
          margin-right: 32px;
        `}
      >
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
          `}
        >
          위치: 서울시 도곡동
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-top: 4px;
            height: 14px;
            font-size: 12px;
          `}
        >
          {`체감온도 ${weatherData?.data?.responseBody?.percivedTemperature}˚`}
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 12px;
            font-size: 12px;
            height: 16px;
          `}
        >
          {`• 자외선 ${getUvIndex()}  |`}
          <span
            css={css`
              font-weight: 400;
              font-size: 14px;
            `}
          >
            &nbsp;
            {`${
              weatherData?.data?.responseBody?.precipitationType == "0"
                ? skyMap.get(weatherData?.data?.responseBody?.skyCondition)
                : rainMap.get(
                    weatherData?.data?.responseBody?.precipitationType
                  )
            }
            `}
          </span>
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 20px;
            font-size: 12px;
            color: #585858;
          `}
        >
          <ul>
            <li>
              {/* <TextR14>{`• 자외선 ${getUvIndex()}`}</TextR14>
              <TextR14>{`• 체감온도 ${weatherData?.data?.responseBody?.percivedTemperature}`}</TextR14> */}
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};
export default Weather;
