// InputMenus.tsx
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import plusIco from "/icPlus.svg";
import { adminMenu } from "../type/type";
import { TextB16, TextB20 } from "./common/Text";
import ToggleSwitch from "./common/ToggleSwitch";

interface InputMenusProps {
  menuData: adminMenu;
  day: string | number | undefined;
  dayWeek: string | number | undefined;
  onChange?: (updatedMenu: adminMenu) => void;
}

const InputTextMenu = styled.input`
  width: 174px;
  margin-left: 4px;
  margin-right: 8px;
  margin-bottom: 4px;
  background-color: #f0efee;
  border-radius: 5px;
  color: #666666;
`;
const InputMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputMenus = ({ menuData, day, dayWeek, onChange }: InputMenusProps) => {
  const [item, setItem] = useState<adminMenu>(menuData);

  let titleIndex = 0;
  const titleArr =
    item.menuDetailsList.length > 5
      ? ["한식", "일식", "PLUS", "샐러드팩", "석식", "PLUS"]
      : ["특식", "PLUS", "샐러드팩", "석식", "PLUS"];

  useEffect(() => {
    const updatedMenu = { ...menuData };
    updatedMenu.menuDetailsList.forEach((bridgeItem) => {
      bridgeItem.subBridgeList.forEach((subItem) => {
        subItem.menuItemName = subItem.menuItemName.trim();
      });
    });
    setItem(updatedMenu);
  }, [menuData]);

  const handleMenuData = (
    e: ChangeEvent<HTMLInputElement>,
    index1: number,
    index2: number
  ) => {
    const newItem = { ...item };
    newItem.menuDetailsList[index1].subBridgeList[index2].menuItemName =
      e.target.value.trim() || "";
    setItem(newItem);
    if (onChange) {
      onChange(newItem);
    }
  };

  const handleToggleChange = (isOn: boolean) => {
    const updated = { ...item, holidayFg: isOn ? "Y" : "N" };
    setItem(updated);
    if (onChange) {
      onChange(updated);
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
      <div
        css={css`
          display: flex;
          justify-content: space-around;
          align-items: center;
        `}
      >
        <h6
          css={css`
            width: 40px;
            cursor: pointer;
          `}
        >
          x
        </h6>
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
        <ToggleSwitch
          checked={item.holidayFg === "Y"}
          onToggle={handleToggleChange}
          css={css`
            width: 56px;
          `}
        />
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
        {item.menuDetailsList.map((bridgeItem, index1) => {
          return (
            <InputMenuContainer key={index1}>
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
              {bridgeItem.subBridgeList.map((data, index2) => {
                return (
                  <div
                    key={data.bridgeId}
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
                        // 삭제기능
                      }}
                      src={plusIco}
                      alt="plus"
                    />
                    <InputTextMenu
                      value={data.menuItemName}
                      onChange={(e) => handleMenuData(e, index1, index2)}
                    />
                  </div>
                );
              })}
            </InputMenuContainer>
          );
        })}
      </div>
    </div>
  );
};

export default InputMenus;
