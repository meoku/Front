import { css } from "@emotion/react";
// import snowImage from "/weather/ImageSnow.svg";
import icMain from "/icMain.svg";
import { TextB24, TextR14 } from "./common/Text";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  console.log(weatherData);
  return (
    <div
      css={css`
        display: flex;
        min-width: 430px;
        height: 96px;
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.16);
        border-radius: 15px;
        background-color: var(--background_color_02);
      `}
    >
      <div>
        <img
          // src={snowImage}
          src={icMain}
          css={css`
            width: 75px;
            height: 75px;
            margin-top: 13px;
            margin-left: 28px;
            /* visibility: hidden; */
          `}
        />
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: right;
          margin-left: 10px;
        `}
      >
        <p
          css={css`
            font-size: 33.6px;
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
            margin-top: 5px;
            font-size: 15px;
            font-weight: bold;
            white-space: nowrap;
          `}
        >
          {`${weatherData?.data?.responseBody?.dailyMaximumTemperature} / ${weatherData?.data?.responseBody?.dailyMinimumTemperature}`}
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
        {
          <TextB24>{`${
            weatherData?.data?.responseBody?.precipitationType == "0"
              ? skyMap.get(weatherData?.data?.responseBody?.skyCondition)
              : rainMap.get(weatherData?.data?.responseBody?.precipitationType)
          }`}</TextB24>
        }
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          margin-top: 15px;
          margin-right: 34px;
        `}
      >
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
          `}
        >
          위치:
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            font-size: 12px;
          `}
        >
          서울시 도곡동
        </p>
        <p
          css={css`
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 32px;
            font-size: 12px;
            color: #585858;
          `}
        >
          <ul>
            <li>
              <TextR14>• 자외선 보통</TextR14>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
};
export default Weather;
