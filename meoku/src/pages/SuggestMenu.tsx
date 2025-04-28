import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
}

const SuggestMenu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [selectedMenus, setSelectedMenus] = useState<MenuItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 더미 데이터 - 실제로는 API에서 받아올 수 있습니다
  const dummyMenus: MenuItem[] = [
    { id: 1, name: '치킨' },
    { id: 2, name: '피자' },
    { id: 3, name: '햄버거' },
    { id: 4, name: '초밥' },
    { id: 5, name: '라면' },
    { id: 6, name: '김밥' },
    { id: 7, name: '떡볶이' },
    { id: 8, name: '파스타' },
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">메뉴 추천하기</h1>

        <div className="relative" ref={searchRef}>
          <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="메뉴를 검색하세요..."
              className="flex-1 outline-none bg-transparent"
            />
            <button onClick={() => setIsSearchOpen(true)} className="focus:outline-none">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute w-full top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              {searchResults.map((menu, index) => (
                <div
                  key={menu.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handleSelectMenu(menu)}
                >
                  <span className="text-gray-500 mr-2">{index + 1}.</span>
                  <span>{menu.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {selectedMenus.map((menu) => (
            <div
              key={menu.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <span>{menu.name}</span>
              <button
                onClick={() => handleRemoveMenu(menu.id)}
                className="text-blue-600 hover:text-blue-800"
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
