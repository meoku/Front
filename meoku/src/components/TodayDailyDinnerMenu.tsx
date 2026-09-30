/**
 * [미사용] 2026-09-30 기준 이 파일을 import 하는 곳이 없다.
 *
 * DailyDinnerMenu.tsx 가 isToday prop 으로 같은 일을 하게 되면서 남은 것으로 보인다.
 *
 * 번들에도 포함되지 않는다. 다음 정리 때까지 쓸 일이 없으면 삭제할 것.
 */
import { css } from '@emotion/react';
import { TextB16, TextB20, TextR16 } from './common/Text';
import { mainDailyMenuTime, tagData } from '../type/type';
import { useQuery } from '@tanstack/react-query';
import icNewTag from '/icNewTag.svg';
import { fetchTagData } from '../api/menuApi';

const DailyDinnerMenu = ({ dayWeek, day, menuData }: mainDailyMenuTime) => {
  const menu1 = menuData?.menuDetailsList?.[4]?.subBridgeList?.[0]?.menuItemId;
  const menu2 = menuData?.menuDetailsList?.[4]?.subBridgeList?.[1]?.menuItemId;

  const { data: tagData } = useQuery({
    queryKey: ['menuTagData', menu1, menu2],
    queryFn: () => fetchTagData(menu1, menu2),
    staleTime: 5 * 60 * 1000,
  });
  const isNA = (value: string): string | JSX.Element => {
    if (value === 'N/A') {
      return '';
    } else {
      return value;
    }
  };
  return menuData?.holidayFg == 'N' && menuData?.menuDetailsList[0]?.dailyMenuDate ? (
    <div
      css={css`
        box-shadow: var(--shadow_card);
        border: var(--border_default);
        box-sizing: border-box;
        width: 220px;
        border-radius: var(--radius_card);
        margin: 0px 10px 30px 10px;
        background-color: var(--color_01);
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
        <TextB16
          css={css`
            color: #ffffff;
          `}
        >{`${dayWeek}(${day})`}</TextB16>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          border-radius: 0 0 var(--radius_card) var(--radius_card);
          /* height: 576px; */
          background-color: var(--background_color_02);
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 200px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[4].menuDetailsName}</TextB20>
          <TextB16
            css={css`
              margin-top: 12px;
              text-align: center;
              color: var(--color_01);
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              `}
            >
              <div>
                {tagData?.map((v: tagData, idx: number) => {
                  if (v.menuItemId == menu1) {
                    return (
                      <img
                        key={v.menuItemId ?? idx}
                        css={css`
                          position: absolute;
                          top: -1px;
                          left: -20px;
                        `}
                        src={icNewTag}
                        alt="New Tag"
                      />
                    );
                  }
                })}
              </div>
              {isNA(menuData.menuDetailsList[4].subBridgeList[0].menuItemName)}
            </div>
          </TextB16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
              `}
            >
              <div>
                {tagData?.map((v: tagData, idx: number) => {
                  if (v.menuItemId == menu2) {
                    return (
                      <img
                        key={v.menuItemId ?? idx}
                        css={css`
                          position: absolute;
                          top: -1px;
                          left: -20px;
                        `}
                        src={icNewTag}
                        alt="New Tag"
                      />
                    );
                  }
                })}
              </div>
              {isNA(menuData.menuDetailsList[4].subBridgeList[1].menuItemName)}
            </div>
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[2].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[3].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[4].menuItemName)}
          </TextR16>
          {/* <TextR16
            css={css`
              margin-top: 6px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[4].subBridgeList[5].menuItemName)}
          </TextR16> */}
          <hr
            css={css`
              margin-top: 16px;
              width: 80%;
            `}
          />
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 60px;
            margin-top: 10px;
            margin-bottom: 10px;
          `}
        >
          <TextB20>{menuData.menuDetailsList[5].menuDetailsName}</TextB20>
          <TextR16
            css={css`
              margin-top: 8px;
              text-align: center;
            `}
          >
            {isNA(menuData.menuDetailsList[5].subBridgeList[0].menuItemName)}
          </TextR16>
          <TextR16
            css={css`
              margin-top: 6px;
              margin-bottom: 30px;
            `}
          >
            {isNA(menuData.menuDetailsList[5].subBridgeList[1].menuItemName)}
          </TextR16>
        </div>
      </div>
    </div>
  ) : (
    <div
      css={css`
        box-shadow: var(--shadow_card);
        border: var(--border_default);
        box-sizing: border-box;
        width: 220px;
        border-radius: var(--radius_card);
        margin: 0px 10px 30px 10px;
        background-color: var(--color_01);
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
        <TextB16
          css={css`
            color: #ffffff;
          `}
        >{`${dayWeek}(${day})`}</TextB16>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          border-radius: 0 0 var(--radius_card) var(--radius_card);
          /* height: 576px; */
          background-color: var(--background_color_02);
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 242px;
            height: 280px;
          `}
        >
          <TextB20>{menuData?.holidayFg == 'Y' ? '공휴일' : '준비중입니다.'}</TextB20>
        </div>
      </div>
    </div>
  );
};

export default DailyDinnerMenu;
