import { css } from '@emotion/react';
import icNav from '/icNav.svg';
import { TextR20 } from './common/Text';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ServicePrepareModal from './modal/ServicePrepareModal';

const categories = [
  {
    name: '구내식당표',
    sub: [
      { name: '식단표', path: '/' },
      { name: '메뉴제안', path: '/suggest' },
      { name: '설문조사', path: '/survey' },
    ],
  },
  {
    name: '맛집리스트',
    sub: [
      { name: '전체', path: '/restaurants' },
      { name: '내주변', path: '/restaurants/nearby' },
    ],
  },
  {
    name: 'AI추천',
    sub: [{ name: 'AI추천', path: '/ai' }],
  },
];

const registeredPaths = ['/', '/suggest'];

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 대분류/소분류 자동 선택
  let selectedCategoryIdx = 0;
  let selectedSubIdx = 0;
  categories.forEach((cat, i) => {
    cat.sub.forEach((sub, j) => {
      if (location.pathname === sub.path) {
        selectedCategoryIdx = i;
        selectedSubIdx = j;
      }
    });
  });

  return (
    <nav>
      {/* 상단 네브바 */}
      <div
        css={css`
          width: 100%;
          background: #fff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            padding: 0 24px;
          `}
        >
          {/* 로고 */}
          <Link to="/">
            <img
              css={css`
                width: 252px;
                height: 60px;
                object-fit: contain;
                white-space: nowrap;
              `}
              src={icNav}
              alt="logo"
            />
          </Link>
          {/* 대분류 메뉴 */}
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 56px;
            `}
          >
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                css={css`
                  background: none;
                  border: none;
                  outline: none;
                  cursor: pointer;
                  padding-bottom: 6px;
                  transition: color 0.2s;
                `}
                onClick={() => {
                  const firstSub = cat.sub[0];
                  if (registeredPaths.includes(firstSub.path)) {
                    navigate(firstSub.path);
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              >
                <TextR20
                  css={css`
                    color: ${selectedCategoryIdx === i ? 'var(--color_01)' : 'var(--color_06)'};
                    font-weight: ${selectedCategoryIdx === i ? 'bold' : 'normal'};
                    font-size: 20px;
                  `}
                >
                  {cat.name}
                </TextR20>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* 소분류 바 */}
      <div
        css={css`
          width: 100%;
          background: var(--background_color_01, #f8f8f8);
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            height: 60px;
            padding: 0;
            gap: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          `}
        >
          {categories[selectedCategoryIdx].sub.map((sub, j) => (
            <button
              key={sub.name}
              css={css`
                background: none;
                border: none;
                outline: none;
                color: ${selectedSubIdx === j ? 'var(--color_01)' : '#666'};
                font-weight: bold;
                font-size: 16px;
                min-width: 140px;
                padding: 0 28px;
                cursor: pointer;
                position: relative;
                padding-bottom: 4px;
                transition: color 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
                line-height: 1;
              `}
              onClick={() => {
                if (registeredPaths.includes(sub.path)) {
                  navigate(sub.path);
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              {sub.name}
              {selectedSubIdx === j && (
                <span
                  css={css`
                    display: block;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -1.5px;
                    width: 100%;
                    height: 3px;
                    background: var(--color_01);
                    border-radius: 2px;
                  `}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <ServicePrepareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};
export default Navbar;
