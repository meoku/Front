import { css } from '@emotion/react';
import { TextB16, TextB20, TextR16 } from '.././common/Text';
import { mainDailyMenuTime } from '../../type/type';
import styled from '@emotion/styled';

const MobileMainDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const MobileMenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

const MobileMenuContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const MobileMainMenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 10px;
  background-color: var(--background_color_02);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 0.4rem auto;
  padding: 1rem 0;
`;

const MobileDailyMenu = ({ dayWeek, day, menuData, isToday }: mainDailyMenuTime) => {
  const isNA = (value: string): string | JSX.Element => {
    if (value === 'N/A') {
      return '';
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
    background-color: ${isToday ? 'var(--color_01)' : 'var(--color_05)'};
    color: var(--background_color_02);
    margin-top: 12px;
  `;
  return menuData && menuData.holidayFg == 'N' && menuData?.menuDetailsList[0]?.dailyMenuDate ? (
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
            <TextB16>{menuData.menuDetailsList[0]?.menuDetailsName}</TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[0]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[1]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[2]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[3]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[4]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[0]?.subBridgeList[5]?.menuItemName)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      {menuData?.menuDetailsList[1]?.dailyMenuDate ? (
        <MobileMainDiv>
          <MobileMainMenuDiv>
            <MobileMenuTitle>
              <TextB16>{menuData.menuDetailsList[1]?.menuDetailsName}</TextB16>
            </MobileMenuTitle>
            <MobileMenuContent>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[0]?.menuItemName)}
              </TextR16>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[1]?.menuItemName)}
              </TextR16>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[2]?.menuItemName)}
              </TextR16>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[3]?.menuItemName)}
              </TextR16>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[4]?.menuItemName)}
              </TextR16>
              <TextR16
                css={css`
                  margin-top: 0.5rem;
                  margin-bottom: 0.5rem;
                `}
              >
                {isNA(menuData.menuDetailsList[1]?.subBridgeList[5]?.menuItemName)}
              </TextR16>
            </MobileMenuContent>
          </MobileMainMenuDiv>
        </MobileMainDiv>
      ) : (
        <div></div>
      )}
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>{menuData.menuDetailsList[2]?.menuDetailsName}</TextB16>
          </MobileMenuTitle>
          <MobileMenuContent>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[2]?.subBridgeList[0]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[2]?.subBridgeList[1]?.menuItemName)}
            </TextR16>
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[2]?.subBridgeList[2]?.menuItemName)}
            </TextR16>
          </MobileMenuContent>
        </MobileMainMenuDiv>
      </MobileMainDiv>
      <MobileMainDiv>
        <MobileMainMenuDiv>
          <MobileMenuTitle>
            <TextB16>{menuData.menuDetailsList[3]?.menuDetailsName}</TextB16>
          </MobileMenuTitle>
          <MobileMenuContent
            css={css`
              height: 4rem;
            `}
          >
            <TextR16
              css={css`
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
              `}
            >
              {isNA(menuData.menuDetailsList[3]?.subBridgeList[0]?.menuItemName)}
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
          margin-top: 12px;
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
            <TextB20>{menuData?.holidayFg == 'Y' ? '공휴일' : '준비중입니다.'}</TextB20>
          </div>
        </div>
      </div>
    </MobileMainDiv>
  );
};

export default MobileDailyMenu;
