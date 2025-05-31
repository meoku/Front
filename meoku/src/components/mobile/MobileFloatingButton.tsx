import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import ServicePrepareModal from '../modal/ServicePrepareModal';

const FloatingButtonContainer = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
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

const TooltipTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #333;
`;

const TooltipContent = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: #666;
`;

const TooltipHighlight = styled.span`
  font-weight: 700;
  color: #333;
`;

const TooltipLink = styled.a`
  display: inline-block;
  margin-top: 6px;
  color: var(--color_01);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Tooltip = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: white;
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 999;
  max-width: 200px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.isVisible ? '0' : '20px')});
  transition: all 0.3s ease;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  text-align: left;
  width: fit-content;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
`;

const MenuButton = styled.button<{ isVisible: boolean; index: number }>`
  position: fixed;
  bottom: ${(props) => 76 + props.index * 56}px;
  right: 20px;
  height: 40px;
  padding: 0 16px;
  border-radius: 20px;
  background-color: white;
  color: #333;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  transform: translateY(${(props) => (props.isVisible ? '0' : '20px')});
  transition: all 0.3s ease;
  z-index: ${(props) => 999 - props.index};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  width: 140px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface FloatingButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const MobileFloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isMenuVisible) {
        setShowTooltip(true);
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [isMenuVisible]);

  const handleClick = () => {
    if (showTooltip) {
      setIsMenuVisible(false);
    } else {
      setIsMenuVisible(!isMenuVisible);
    }
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
      <Tooltip isVisible={showTooltip && !isMenuVisible}>
        {new Date().toDateString() <= new Date('2025-06-03').toDateString() ? (
          <>
            <TooltipTitle>[공지]직원식당 평가단 모집!</TooltipTitle>
            <TooltipContent>
              직원 여러분의 소중한 의견을 반영해
              <br />
              식당 운영을 개선합니다!
              <br />
              <br />
              모집 대상 : 식당을 이용하는 다이소 직원
              <br />
              모집 인원 : 0명(관계사는 별도 모집)
              <br />
              활동 기간: 6/9 ~ 6/20 (2주간)
              <br />
              <TooltipHighlight>혜택: 모바일 상품권 1만원 증정!</TooltipHighlight>
              <br />
              <TooltipLink
                href="https://answer.moaform.com/answers/MPV01D"
                target="_blank"
                rel="noopener noreferrer"
              >
                신청하러가기
              </TooltipLink>
            </TooltipContent>
          </>
        ) : (
          <TooltipContent>오늘 메뉴가 별로인가요?</TooltipContent>
        )}
      </Tooltip>
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

export default MobileFloatingButton;
