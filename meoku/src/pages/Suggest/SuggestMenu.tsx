import { useState, useRef, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { css } from '@emotion/react';
import FloatingButton from '../../components/FloatingButton';

interface MenuItem {
  id: number;
  name: string;
  isNew?: boolean;
}

type SuggestionType = 'anchor' | 'menu' | null;

const SuggestMenu = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [suggestionType, setSuggestionType] = useState<SuggestionType>('anchor');
  const [reason, setReason] = useState<string>('');
  const searchRef = useRef<HTMLDivElement>(null);

  // 더미 데이터 - 실제로는 API로 받아올 예정
  const dummyMenus: MenuItem[] = [
    { id: 1, name: '캔참치야채비빔밥' },
    { id: 2, name: '순두부해물찌개' },
    { id: 3, name: '순두부장조림' },
    { id: 4, name: '순두부숙성간장' },
    { id: 5, name: '순두부라면' },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearchOpen(true);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = dummyMenus
      .filter((menu) => menu.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setSearchResults(results);
  };

  const handleAddNewMenu = () => {
    const newMenu: MenuItem = {
      id: Date.now(),
      name: searchQuery,
      isNew: true,
    };
    handleSelectMenu(newMenu);
  };

  const handleSelectMenu = (menu: MenuItem) => {
    setSearchQuery(menu.name);
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      css={css`
        width: 100%;
        min-height: 100vh;
        background: #f8f8f8;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        /* 웹에서 최대 너비 제한 */
        @media (min-width: 768px) {
          max-width: 500px;
          margin: 0 auto;
        }
      `}
    >
      {/* 모바일 헤더 시뮬레이션 */}
      <div
        css={css`
          width: 100%;
          height: 92px;
          background: #f8f8f8;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-sizing: border-box;

          /* 웹에서는 헤더 숨김 */
          @media (min-width: 768px) {
            display: none;
          }
        `}
      >
        {/* 뒤로가기 버튼 */}
        <div
          css={css`
            width: 24px;
            height: 24px;
            position: relative;
            cursor: pointer;
          `}
        >
          <div
            css={css`
              width: 11.29px;
              height: 11.29px;
              position: absolute;
              left: 7.62px;
              top: 12.26px;
              transform: rotate(-45deg);
              transform-origin: top left;
              border: 1.92px #666666 solid;
            `}
          />
        </div>

        {/* 상태바 영역 */}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
          `}
        >
          {/* 시그널 아이콘 */}
          <div
            css={css`
              width: 20px;
              height: 14px;
              position: relative;
            `}
          >
            <div
              css={css`
                width: 3px;
                height: 8px;
                position: absolute;
                left: 11px;
                top: 4px;
                background: black;
              `}
            />
            <div
              css={css`
                width: 3px;
                height: 6px;
                position: absolute;
                left: 6.5px;
                top: 6px;
                background: black;
              `}
            />
            <div
              css={css`
                width: 3px;
                height: 4.5px;
                position: absolute;
                left: 2px;
                top: 7.5px;
                background: black;
              `}
            />
          </div>

          {/* WiFi 아이콘 */}
          <div
            css={css`
              width: 16px;
              height: 14px;
              position: relative;
            `}
          >
            <div
              css={css`
                width: 4.37px;
                height: 3.06px;
                position: absolute;
                left: 5.94px;
                top: 8.94px;
                background: black;
              `}
            />
            <div
              css={css`
                width: 9.32px;
                height: 3.31px;
                position: absolute;
                left: 3.46px;
                top: 5.47px;
                background: black;
              `}
            />
            <div
              css={css`
                width: 14.25px;
                height: 4.32px;
                position: absolute;
                left: 1px;
                top: 2px;
                background: black;
              `}
            />
          </div>

          {/* 배터리 아이콘 */}
          <div
            css={css`
              width: 25px;
              height: 14px;
              position: relative;
            `}
          >
            <div
              css={css`
                width: 1px;
                height: 4px;
                position: absolute;
                left: 24px;
                top: 5px;
                background: rgba(60, 60, 67, 0.6);
              `}
            />
            <div
              css={css`
                width: 23px;
                height: 12px;
                position: absolute;
                left: 0;
                top: 1px;
                background: rgba(60, 60, 67, 0.6);
              `}
            />
            <div
              css={css`
                width: 19px;
                height: 8px;
                position: absolute;
                left: 2px;
                top: 3px;
                background: black;
                border-radius: 1px;
              `}
            />
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div
        css={css`
          width: 100%;
          padding: 0 18px;
          box-sizing: border-box;
          flex: 1;
        `}
      >
        {/* 제목 */}
        <h1
          css={css`
            width: 136.72px;
            height: 17px;
            margin: 32px 0 18px 6px;
            color: #333333;
            font-size: 20px;
            font-family: Pretendard, sans-serif;
            font-weight: 700;
            line-height: 1;
          `}
        >
          메뉴 요청
        </h1>

        {/* 타입 선택 버튼 */}
        <div
          css={css`
            display: flex;
            gap: 4px;
            margin-bottom: 14px;
          `}
        >
          <button
            css={css`
              width: 82px;
              height: 32px;
              background: ${suggestionType === 'anchor' ? '#FF4004' : '#E8E8E8'};
              border-radius: 16.5px;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${suggestionType === 'anchor' ? 'white' : '#666666'};
              font-size: 12px;
              font-family: Pretendard, sans-serif;
              font-weight: ${suggestionType === 'anchor' ? '700' : '400'};
              transition: all 0.2s;
              white-space: nowrap;
            `}
            onClick={() => setSuggestionType('anchor')}
          >
            앵콜 요청
          </button>
          <button
            css={css`
              width: 82px;
              height: 32px;
              background: ${suggestionType === 'menu' ? '#FF4004' : '#E8E8E8'};
              border-radius: 16.5px;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${suggestionType === 'menu' ? 'white' : '#666666'};
              font-size: 12px;
              font-family: Pretendard, sans-serif;
              font-weight: ${suggestionType === 'menu' ? '700' : '400'};
              transition: all 0.2s;
              white-space: nowrap;
            `}
            onClick={() => setSuggestionType('menu')}
          >
            메뉴 제안
          </button>
        </div>

        {/* 검색 입력창 */}
        <div
          css={css`
            position: relative;
            margin-bottom: 0;
          `}
          ref={searchRef}
        >
          <div
            css={css`
              width: 100%;
              height: 46px;
              background: white;
              border-radius: 8px;
              border: 1px #f0efee solid;
              display: flex;
              align-items: center;
              padding: 0 16px;
              box-sizing: border-box;
              transition: all 0.2s;
              &:focus-within {
                border-color: #ff4004;
                box-shadow: 0 0 0 2px rgba(255, 64, 4, 0.1);
              }
            `}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="메뉴를 검색하세요"
              css={css`
                flex: 1;
                border: none;
                background: transparent;
                font-size: 14px;
                color: #333333;
                font-family: Pretendard, sans-serif;
                font-weight: 400;
                &::placeholder {
                  color: #999999;
                }
                &:focus {
                  outline: none;
                }
              `}
            />
            <Search
              css={css`
                width: 17px;
                height: 17px;
                color: #d9d9d9;
                cursor: pointer;
              `}
            />
          </div>

          {/* 검색 결과 드롭다운 */}
          {isSearchOpen &&
            (searchResults.length > 0 ? (
              <div
                css={css`
                  position: absolute;
                  width: 100%;
                  top: 100%;
                  left: 0;
                  right: 0;
                  margin-top: 8px;
                  background: white;
                  border-radius: 8px;
                  border: 1px #f0efee solid;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  z-index: 50;
                `}
              >
                {searchResults.map((menu, index) => (
                  <div
                    key={menu.id}
                    css={css`
                      padding: 12px 16px;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      transition: background-color 0.2s;
                      &:hover {
                        background-color: #f8f8f8;
                      }
                    `}
                    onClick={() => handleSelectMenu(menu)}
                  >
                    <span
                      css={css`
                        color: #666666;
                        margin-right: 12px;
                        font-weight: 500;
                        font-size: 14px;
                      `}
                    >
                      {index + 1}.
                    </span>
                    <span
                      css={css`
                        color: #333333;
                        font-size: 14px;
                        font-family: Pretendard, sans-serif;
                      `}
                    >
                      {menu.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              searchQuery.trim() !== '' && (
                <div
                  css={css`
                    position: absolute;
                    width: 100%;
                    top: 100%;
                    left: 0;
                    right: 0;
                    margin-top: 8px;
                    background: white;
                    border-radius: 8px;
                    border: 1px #f0efee solid;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    z-index: 50;
                  `}
                >
                  <div
                    css={css`
                      padding: 16px;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      gap: 12px;
                      transition: background-color 0.2s;
                      &:hover {
                        background-color: #f8f8f8;
                      }
                    `}
                    onClick={handleAddNewMenu}
                  >
                    <Plus size={18} color="#666666" />
                    <div>
                      <div
                        css={css`
                          font-weight: 500;
                          color: #333333;
                          font-size: 14px;
                          font-family: Pretendard, sans-serif;
                        `}
                      >
                        기존에 없는 메뉴입니다.
                      </div>
                      <div
                        css={css`
                          font-size: 12px;
                          color: #999999;
                          font-family: Pretendard, sans-serif;
                        `}
                      >
                        신메뉴로 추가하시겠어요?
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
        </div>

        {/* 앵콜 요청 안내 - 검색창과 이유 입력창 사이 */}
        {suggestionType === 'anchor' && (
          <p
            css={css`
              width: 244px;
              height: 16px;
              margin: 8px 0 0 14px;
              color: #999999;
              font-size: 12px;
              font-family: Pretendard, sans-serif;
              font-weight: 400;
              line-height: 1;
            `}
          >
            *하루에 한번 앵콜을 요청할 수 있습니다.
          </p>
        )}

        {/* 이유 입력창 */}
        <div
          css={css`
            width: 100%;
            height: 94px;
            background: white;
            border-radius: 8px;
            border: 1px #f0efee solid;
            position: relative;
            margin-top: ${suggestionType === 'anchor' ? '9px' : '33px'};
            margin-bottom: 46px;
            transition: all 0.2s;
            &:focus-within {
              border-color: #ff4004;
              box-shadow: 0 0 0 2px rgba(255, 64, 4, 0.1);
            }
          `}
        >
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="자유롭게 요청 이유를 적어주세요. (선택)"
            maxLength={50}
            css={css`
              width: 100%;
              height: 100%;
              padding: 12px 12px 24px 12px;
              border: none;
              border-radius: 8px;
              resize: none;
              font-size: 14px;
              background: transparent;
              color: #333333;
              box-sizing: border-box;
              font-family: Pretendard, sans-serif;
              font-weight: 400;
              &::placeholder {
                color: #999999;
              }
              &:focus {
                outline: none;
              }
            `}
          />
          <div
            css={css`
              position: absolute;
              bottom: 8px;
              right: 12px;
              color: #999999;
              font-size: 11px;
              font-family: Pretendard, sans-serif;
              font-weight: 400;
            `}
          >
            {reason.length} / 50
          </div>
        </div>

        {/* 요청하기 버튼 */}
        <button
          css={css`
            width: 100%;
            height: 38px;
            background: #ff4004;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
            font-family: Pretendard, sans-serif;
            font-weight: 700;
            transition: background-color 0.2s;
            &:hover {
              background: #e63500;
            }
          `}
        >
          요청하기
        </button>

        {/* 안내 문구 */}
        <p
          css={css`
            width: 100%;
            margin: 22px 0 0 0;
            text-align: center;
            color: #666666;
            font-size: 11px;
            font-family: Pretendard, sans-serif;
            font-weight: 400;
            line-height: 15px;
          `}
        >
          소중한 의견 감사합니다. 등록해 주신 의견은 취합하여
          <br />
          영양사 선생님께 주기적으로 전달됩니다.
        </p>
      </div>
      <FloatingButton />
    </div>
  );
};

export default SuggestMenu;
