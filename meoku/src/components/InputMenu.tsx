// InputMenus.tsx
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useState } from 'react';
import plusIco from '/icPlus.svg';
import { adminMenu } from '../type/type';
import { TextB16, TextB20 } from './common/Text';
import ToggleSwitch from './common/ToggleSwitch';
import { deleteMenuData } from '../api/menuApi';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Loading from '../components/common/Loading';
import { DefaultAdminDataDaily } from '../utils/defaultAdminDataDaily';

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
    item.menuDetailsList && item.menuDetailsList.length > 5
      ? ['한식', '일식', 'PLUS', '샐러드팩', '석식', 'PLUS']
      : ['특식', 'PLUS', '샐러드팩', '석식', 'PLUS'];

  useEffect(() => {
    const updatedMenu = { ...menuData };
    // updatedMenu.menuDetailsList.forEach((bridgeItem) => {
    //   bridgeItem.subBridgeList.forEach((subItem) => {
    //     subItem.menuItemName = subItem.menuItemName.trim();
    //   });
    // });
    if (updatedMenu.holidayFg == 'Y') {
      delete updatedMenu.menuDetailsList;
    }
    if (updatedMenu.holidayFg == 'N' && !updatedMenu.menuDetailsList) {
      updatedMenu.menuDetailsList = DefaultAdminDataDaily(updatedMenu.menuDate);
    }
    setItem(updatedMenu);
  }, [menuData]);

  const handleMenuData = (e: ChangeEvent<HTMLInputElement>, index1: number, index2: number) => {
    const newItem = { ...item };
    if (newItem.menuDetailsList) {
      newItem.menuDetailsList[index1].subBridgeList[index2].menuItemName =
        e.target.value.trim() || '';
    }
    setItem(newItem);
    if (onChange) {
      onChange(newItem);
    }
  };

  const handleToggleChange = (isOn: boolean) => {
    const updated = { ...item, holidayFg: isOn ? 'Y' : 'N' };
    setItem(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const deleteMutation = useMutation<AxiosResponse<unknown>, Error, string>({
    mutationFn: (date: string) => deleteMenuData(date),
    onSuccess: () => {
      const clearedMenu = {
        ...item,
        menuDetailsList: (item.menuDetailsList ?? []).map((bridgeItem) => ({
          ...bridgeItem,
          subBridgeList: (bridgeItem.subBridgeList ?? []).map((subItem) => ({
            ...subItem,
            menuItemName: '',
          })),
        })),
      };
      setItem(clearedMenu);
      if (onChange) {
        onChange(clearedMenu);
      }
    },
    onError: (error) => {
      console.error('메뉴 삭제에 실패했습니다.', error);
      alert('메뉴 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      if (day) {
        deleteMutation.mutate(menuData.menuDate);
      } else {
        console.error('삭제할 날짜 정보가 없습니다.');
      }
    }
  };

  return (
    <div
      css={css`
        position: relative;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
        border-radius: 18px;
        margin: 0px 10px;
        background-color: var(--color_02);
      `}
    >
      {deleteMutation.status === 'pending' && (
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
          `}
        >
          <Loading />
        </div>
      )}
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
          onClick={handleDelete}
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
          checked={item.holidayFg === 'Y'}
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
        {item.menuDetailsList &&
          item.menuDetailsList.map((bridgeItem, index1) => {
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
                      key={data.bridgeId || index2}
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
                          // 개별 메뉴 삭제 기능 추가 가능 (현재는 전체 삭제만 구현)
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
