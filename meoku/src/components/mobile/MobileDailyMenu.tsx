import { css } from "@emotion/react";
import { TextB16, TextB20, TextR16 } from ".././common/Text";
import { mainDailyMenuTime } from "../../type/type";
import styled from "@emotion/styled";

const MobileMainDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 38px;
  border-radius: 10px;
  background-color: var(--color_05);
  color: var(--background_color_02);
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
const MobileDailyMenu = ({ dayWeek, day, menuData }: mainDailyMenuTime) => {
  const isNA = (value: string): string | JSX.Element => {
    if (value === "N/A") {
      return "";
    } else {
      return value;
    }
  };
  return menuData && menuData.holidayFg == "N" ? (
    <>
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
            점심
          </TextB16>
        </MobileMenuHeader>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>
              {menuData.detailedMenuDTOList[0].detailedMenuName}
            </TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 1.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].mainMenuName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].menu1Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].menu2Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].menu3Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].menu4Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[0].menu5Name)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>
              {menuData.detailedMenuDTOList[1].detailedMenuName}
            </TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 1.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].mainMenuName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].menu1Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].menu2Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].menu3Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].menu4Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[1].menu5Name)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>
              {menuData.detailedMenuDTOList[2].detailedMenuName}
            </TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 1rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[2].mainMenuName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[2].menu1Name)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[2].menu2Name)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>
              {menuData.detailedMenuDTOList[3].detailedMenuName}
            </TextB16>
          </MobileMenuTitle>
          <MobileMenuContent
            css={css`
              height: 4rem;
            `}
          >
            <TextR16
              css={css`
                margin-top: 1rem;
                margin-bottom: 1rem;
              `}
            >
              {isNA(menuData.detailedMenuDTOList[3].mainMenuName)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
    </>
  ) : (
    <MobileMainDiv>
      <div
        css={css`
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
          border-radius: 18px;
          /* margin: 0px 9px 30px 9px; */
          margin: 0px 9px;
          width: 80%;
          background-color: var(--color_05);
          color: var(--background_color_02);
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 44px;
          `}
        >
          <TextB16>{`${dayWeek}(${day})`}</TextB16>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            border-radius: 0 0 18px 18px;
            /* height: 576px; */
            background-color: var(--background_color_02);
            color: var(--color_05);
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 242px;
              height: 576px;
            `}
          >
            <TextB20>{menuData ? "공휴일" : "준비중입니다."}</TextB20>
          </div>
        </div>
      </div>
    </MobileMainDiv>
  );
};

export default MobileDailyMenu;
