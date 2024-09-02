import { css } from "@emotion/react";
import { TextB16, TextR16 } from ".././common/Text";
import { mainDailyMenuTime } from "../../type/type";
import styled from "@emotion/styled";

const MobileMainDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const MobileMenuTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 30%;
  height: 100%;
  position: relative;
  top: 1.5rem;
  left: 2rem;
`;
const MobileMenuContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 2rem;
  width: 80%;
`;
const MobileMainMenuDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 10px;
  background-color: var(--background_color_02);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 0.4rem auto;
`;
const MobileDailyDinnerMenu = ({
  dayWeek,
  day,
  menuData,
  isToday,
}: mainDailyMenuTime) => {
  const isNA = (value: string): string | JSX.Element => {
    if (value === "N/A") {
      return "";
    } else {
      return value;
    }
  };
  const MobileMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    height: 38px;
    border-radius: 10px;
    background-color: ${isToday ? "var(--color_01)" : "var(--color_05)"};
    color: var(--background_color_02);
  `;
  return menuData?.holidayFg == "N" &&
    menuData?.menuDetailsList[0]?.dailyMenuDate ? (
    <div
      css={css`
        margin-top: 20px;
      `}
    >
      <MobileMainDiv>
        <MobileMenuHeader>
          <TextB16
            css={css`
              position: relative;
              left: 1.2rem;
            `}
          >
            {`${dayWeek}(${day})`}
          </TextB16>
          <TextB16
            css={css`
              position: relative;
              right: 1.2rem;
            `}
          >
            저녁
          </TextB16>
        </MobileMenuHeader>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>{menuData.menuDetailsList[4].menuDetailsName}</TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 1.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[4].subBridgeList[0].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[4].subBridgeList[1].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[4].subBridgeList[2].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[4].subBridgeList[3].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[4].subBridgeList[4].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(
                menuData.menuDetailsList[4]?.subBridgeList[5]?.menuItemName
              )}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>{menuData.menuDetailsList[5].menuDetailsName}</TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 1.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[5].subBridgeList[0].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[5].subBridgeList[1].menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(
                menuData.menuDetailsList[5]?.subBridgeList[2]?.menuItemName
              )}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
    </div>
  ) : (
    <></>
  );
};

export default MobileDailyDinnerMenu;
