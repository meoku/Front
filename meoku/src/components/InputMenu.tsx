import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
// import minusIco from "/minus.svg";
import plusIco from "/icPlus.svg";
import { adminMenu } from "../type/type";
import { TextB16, TextB20 } from "./common/Text";
interface InputMenusProps {
  menuData: adminMenu;
  day: string | undefined | number;
  dayWeek: string | undefined | number;
  // handleMenuData: (data: menuDetail[], day: string) => void;
}
const InputMenus = ({ menuData, day, dayWeek }: InputMenusProps) => {
  const [item1, setItem1] = useState<adminMenu>(menuData);
  let titleIndex = 0;
  const titleArr =
    item1.menuDetailsList.length > 5
      ? ["한식", "일식", "PLUS", "샐러드팩", "석식", "PLUS"]
      : ["특식", "PLUS", "샐러드팩", "석식", "PLUS"];
  useEffect(() => {
    setItem1(menuData);
  }, [menuData]);
  const InputTextMenu = styled.input`
    width: 174px;
    margin-left: 4px;
    margin-right: 8px;
    margin-bottom: 4px;
    background-color: #f0efee;
    border-radius: 5px;
    color: #666666;
  `;
  const InputMenu = styled.div`
    display: flex;
    flex-direction: column;
  `;
  const handleMenuData = (
    e: ChangeEvent<HTMLInputElement>,
    index1: number,
    index2: number
  ) => {
    if (dayWeek === "월요일") {
      menuData.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value;
    } else if (dayWeek === "화요일") {
      menuData.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value;
    } else if (dayWeek === "수요일") {
      menuData.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value;
    } else if (dayWeek === "목요일") {
      menuData.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value;
    } else if (dayWeek === "금요일") {
      menuData.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value;
    }
  };
  return (
    <div
      css={css`
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 10px;
        background-color: var(--color_02);
      `}
    >
      <TextB16
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 44px;
        `}
      >
        {`${dayWeek}(${day})`}
      </TextB16>
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: var(--background_color_01);
        `}
      >
        {item1.menuDetailsList.map((bridgeItem, index1) => {
          return (
            <InputMenu>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                `}
              >
                <TextB20
                  css={css`
                    color: #666666;
                    margin-top: 16px;
                    margin-bottom: 9px;
                  `}
                >
                  {titleArr[titleIndex++]}
                </TextB20>
              </div>
              {bridgeItem?.subBridgeList.map((data, index2) => {
                return (
                  <div
                    css={css`
                      display: flex;
                      width: 214px;
                      margin-left: 8px;
                    `}
                  >
                    <img
                      css={css`
                        width: 20px;
                        height: 20px;
                        cursor: pointer;
                      `}
                      onClick={() => {
                        // const newArr = [...item1];
                        // newArr.splice(idx, 1);
                        // setItem1(newArr);
                      }}
                      src={plusIco}
                    />
                    <InputTextMenu
                      key={data.bridgeId}
                      defaultValue={data.menuItemName}
                      placeholder="데이터가 없습니다."
                      onChange={(e) => handleMenuData(e, index1, index2)}
                    ></InputTextMenu>
                  </div>
                );
              })}
            </InputMenu>
          );
        })}
      </div>
    </div>
  );
};
export default InputMenus;
