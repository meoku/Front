// src/utils/weatherUtils.ts
import icCloudy from "/weather/cloudy.svg";
import icSun from "/weather/sunny.svg";
import icDark from "/weather/dark.svg";
import icRain from "/weather/rain.svg";
import icSnow from "/weather/snow.svg";
import icSnowRain from "/weather/snowRain.svg";
import icHeavyRain from "/weather/snowRain.svg";

export const getWeatherImg = (isRain: boolean, value: string): string => {
  if (isRain) {
    if (value === "1") {
      return icRain;
    } else if (value === "2") {
      return icSnowRain;
    } else if (value === "3") {
      return icSnow;
    } else if (value === "4") {
      return icHeavyRain;
    }
  } else {
    if (value === "1") {
      return icSun;
    } else if (value === "3") {
      return icCloudy;
    } else if (value === "4") {
      return icDark;
    }
  }
  return "";
};
