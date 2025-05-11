import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const FloatingButtonContainer = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  padding: 0;
  background-image: url('/meoku_floating_button.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const MenuButton = styled.button<{ isVisible: boolean; index: number }>`
  position: fixed;
  bottom: ${(props) => 116 + props.index * 66}px;
  right: 56px;
  height: 56px;
  padding: 0 24px;
  border-radius: 28px;
  background-color: white;
  color: #333;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: ${(props) => 999 - props.index};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  width: 180px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface FloatingButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsMenuVisible(!isMenuVisible);
    onClick?.();
  };

  const menuItems = [
    {
      text: '원하는 메뉴 제안하기',
      onClick: () => {
        navigate('/suggest');
        setIsMenuVisible(false);
      },
    },
    { text: '맛집 리스트', onClick: () => console.log('맛집 리스트') },
    { text: 'AI추천', onClick: () => console.log('AI추천') },
  ];

  return (
    <>
      {menuItems.map((item, index) => (
        <MenuButton key={index} isVisible={isMenuVisible} index={index} onClick={item.onClick}>
          {item.text}
        </MenuButton>
      ))}
      <FloatingButtonContainer onClick={handleClick} />
    </>
  );
};

export default FloatingButton;
