import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import ServicePrepareModal from './modal/ServicePrepareModal';

const FloatingButtonContainer = styled.button`
  position: fixed;
  bottom: 50px;
  left: calc(50% + 600px + 10px);
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
  z-index: 999;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Tooltip = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 130px;
  left: calc(50% + 600px + 10px);
  background-color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-size: 15px;
  color: #333;
  word-wrap: break-word;
  z-index: 999;
  max-width: 256px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateX(${(props) => (props.isVisible ? '0' : '20px')});
  transition: all 0.3s ease;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  text-align: left;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
`;

const MenuButton = styled.button<{ isVisible: boolean; index: number }>`
  position: fixed;
  bottom: ${(props) => 116 + props.index * 66}px;
  left: calc(50% + 600px + 10px);
  //   right: 50px;
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
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMenuVisible) {
        setShowTooltip(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isMenuVisible]);

  const handleClick = () => {
    setIsMenuVisible(!isMenuVisible);
    setShowTooltip(false);
    onClick?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
        setShowTooltip(true);
      }
    };

    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);

  const handleMenuItemClick = (onClick: () => void) => {
    onClick();
    setShowTooltip(false);
  };

  const menuItems = [
    {
      text: '원하는 메뉴 제안하기',
      onClick: () => {
        // navigate('/suggest');
        setIsModalOpen(true);
        setIsMenuVisible(false);
        setShowTooltip(true);
      },
    },
    {
      text: '맛집 리스트',
      onClick: () => {
        setIsModalOpen(true);
        setIsMenuVisible(false);
        setShowTooltip(true);
      },
    },
    {
      text: 'AI추천',
      onClick: () => {
        setIsModalOpen(true);
        setIsMenuVisible(false);
        setShowTooltip(true);
      },
    },
  ];

  return (
    <div ref={menuRef}>
      <Tooltip isVisible={showTooltip && !isMenuVisible}>오늘 메뉴가 별로인가요?</Tooltip>
      {menuItems.map((item, index) => (
        <MenuButton
          key={index}
          isVisible={isMenuVisible}
          index={index}
          onClick={() => handleMenuItemClick(item.onClick)}
        >
          {item.text}
        </MenuButton>
      ))}
      <FloatingButtonContainer onClick={handleClick} />
      <ServicePrepareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default FloatingButton;
