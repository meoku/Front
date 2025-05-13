import { useState, useRef, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { css } from '@emotion/react';

interface MenuItem {
  id: number;
  name: string;
  isNew?: boolean;
}

type SuggestionType = 'anchor' | 'menu' | null;

const SuggestMenu = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<MenuItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [suggestionType, setSuggestionType] = useState<SuggestionType>(null);
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
      id: Date.now(), // 임시 ID 생성
      name: searchQuery,
      isNew: true,
    };
    handleSelectMenu(newMenu);
  };

  const handleSelectMenu = (menu: MenuItem) => {
    if (!selectedMenus.some((selectedMenu) => selectedMenu.id === menu.id)) {
      setSelectedMenus([...selectedMenus, menu]);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const handleRemoveMenu = (menuId: number) => {
    setSelectedMenus(selectedMenus.filter((menu) => menu.id !== menuId));
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
        min-height: 100vh;
        width: 100%;
        background-color: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          background-color: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 64rem;
          box-sizing: border-box;
        `}
      >
        <h1
          css={css`
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
          `}
        >
          메뉴 제안하기
        </h1>

        <div
          css={css`
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          `}
        >
          <button
            css={css`
              padding: 0.75rem 1.5rem;
              border-radius: 9999px;
              border: 1px solid #e5e7eb;
              background-color: ${suggestionType === 'anchor' ? '#FF3C00' : 'white'};
              color: ${suggestionType === 'anchor' ? 'white' : '#374151'};
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
              &:hover {
                background-color: ${suggestionType === 'anchor' ? '#FF3C00' : '#f3f4f6'};
              }
            `}
            onClick={() => setSuggestionType('anchor')}
          >
            앵콜 요청
          </button>
          <button
            css={css`
              padding: 0.75rem 1.5rem;
              border-radius: 9999px;
              border: 1px solid #e5e7eb;
              background-color: ${suggestionType === 'menu' ? '#FF3C00' : 'white'};
              color: ${suggestionType === 'menu' ? 'white' : '#374151'};
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
              &:hover {
                background-color: ${suggestionType === 'menu' ? '#FF3C00' : '#f3f4f6'};
              }
            `}
            onClick={() => setSuggestionType('menu')}
          >
            메뉴 제안
          </button>
        </div>

        <div
          css={css`
            position: relative;
            margin: 0 auto;
            width: 100%;
          `}
          ref={searchRef}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              background-color: #f3f4f6;
              // border-radius: 9999px;
              border-radius: 0.75rem;
              padding: 0.75rem 1.25rem;
              transition: all 0.2s;
              border: 1px solid #e5e7eb;
              &:focus-within {
                background-color: white;
                border-color: #ff3c00;
                box-shadow:
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
            `}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="메뉴를 검색하세요..."
              css={css`
                flex: 1;
                border: none;
                background: transparent;
                font-size: 1rem;
                color: #374151;
                font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
                &:focus {
                  outline: none;
                }
                &::placeholder {
                  color: #9ca3af;
                }
              `}
            />
            <Search
              css={css`
                width: 1.25rem;
                height: 1.25rem;
                color: #9ca3af;
              `}
            />
          </div>

          {isSearchOpen &&
            (searchResults.length > 0 ? (
              <div
                css={css`
                  position: absolute;
                  width: 100%;
                  top: 100%;
                  left: 0;
                  right: 0;
                  margin-top: 0.5rem;
                  background-color: white;
                  border-radius: 1rem;
                  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  z-index: 50;
                `}
              >
                {searchResults.map((menu, index) => (
                  <div
                    key={menu.id}
                    css={css`
                      padding: 0.75rem 1.25rem;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      transition: background-color 0.2s;
                      &:hover {
                        background-color: #f3f4f6;
                      }
                    `}
                    onClick={() => handleSelectMenu(menu)}
                  >
                    <span
                      css={css`
                        color: #6b7280;
                        margin-right: 0.75rem;
                        font-weight: 500;
                      `}
                    >
                      {index + 1}.
                    </span>
                    <span>{menu.name}</span>
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
                    margin-top: 0.5rem;
                    background-color: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    z-index: 50;
                  `}
                >
                  <div
                    css={css`
                      padding: 1rem 1.25rem;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      gap: 0.75rem;
                      transition: background-color 0.2s;
                      &:hover {
                        background-color: #f3f4f6;
                      }
                    `}
                    onClick={handleAddNewMenu}
                  >
                    <Plus size={18} />
                    <div>
                      <div
                        css={css`
                          font-weight: 500;
                          color: #374151;
                        `}
                      >
                        기존에 없는 메뉴입니다.
                      </div>
                      <div
                        css={css`
                          font-size: 0.875rem;
                          color: #6b7280;
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

        <div
          css={css`
            margin-top: 1rem;
            width: 100%;
            box-sizing: border-box;
          `}
        >
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="이유를 입력해주세요..."
            css={css`
              width: 100%;
              min-height: 120px;
              padding: 1rem;
              border: 1px solid #e5e7eb;
              border-radius: 0.75rem;
              resize: vertical;
              font-size: 1rem;
              background-color: #f3f4f6;
              color: #374151;
              box-sizing: border-box;
              font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
              &:focus {
                outline: none;
                border-color: #ff3c00;
                background-color: white;
                box-shadow:
                  0 4px 6px -1px rgba(0, 0, 0, 0.1),
                  0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              &::placeholder {
                color: #9ca3af;
              }
            `}
          />
        </div>

        <div
          css={css`
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            width: 100%;
          `}
        >
          <button
            css={css`
              width: 100%;
              padding: 1rem;
              background-color: #ff3c00;
              color: white;
              border: none;
              border-radius: 0.75rem;
              font-weight: 600;
              font-size: 1.125rem;
              cursor: pointer;
              transition: background-color 0.2s;
              &:hover {
                background-color: #e63500;
              }
            `}
          >
            제안하기
          </button>

          <p
            css={css`
              color: #6b7280;
              font-size: 0.875rem;
              text-align: center;
              line-height: 1.5;
            `}
          >
            소중한 의견 감사합니다. 등록해 주신 의견은 취합하여 영양사 선생님께 주기적으로
            전달됩니다.
          </p>
        </div>

        <div
          css={css`
            margin-top: 1.5rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
          `}
        >
          {selectedMenus.map((menu) => (
            <div
              key={menu.id}
              css={css`
                background-color: ${menu.isNew ? '#fee2e2' : '#dbeafe'};
                color: ${menu.isNew ? '#991b1b' : '#1e40af'};
                padding: 0.375rem 1rem;
                border-radius: 9999px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-weight: 500;
              `}
            >
              <span>{menu.name}</span>
              <button
                onClick={() => handleRemoveMenu(menu.id)}
                css={css`
                  color: ${menu.isNew ? '#dc2626' : '#2563eb'};
                  border: none;
                  background: none;
                  padding: 0;
                  cursor: pointer;
                  font-size: 1.25rem;
                  line-height: 1;
                  &:hover {
                    color: ${menu.isNew ? '#991b1b' : '#1e40af'};
                  }
                `}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestMenu;
