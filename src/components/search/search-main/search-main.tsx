import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../hooks/store-hooks';
import { getCameras } from '../../../store/cards-data-store/cards-data-selectors';

import { SearchList } from '../search-list/search-list';
import { formatSearch } from '../utils/search-utils';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../consts';


function SearchMain(): JSX.Element {

  const [search, setSearch] = useState<string>('');
  const [searchLineIndex, setSearchLineIndex] = useState(-1);
  const cameras = useAppSelector(getCameras);
  const navigate = useNavigate();

  const filterBySearchList = cameras.filter((item) => {
    const formatName = formatSearch(item.name);
    const formatSearchValue = formatSearch(search);
    return formatName.includes(formatSearchValue);
  });

  const isActive = formatSearch(search).length >= 1;
  const isFocusOnSearchList = searchLineIndex >= 0;


  function handleKeydown(event: React.KeyboardEvent) {
    const isUpKey = event.key.startsWith('ArrowUp');
    const isDownKey = event.key.startsWith('ArrowDown');
    const isTabKey = event.key.startsWith('Tab');
    const isEnter = event.key.startsWith('Enter');


    if (isDownKey) {
      event.preventDefault();
      const lastIndexInList = filterBySearchList.length - 1;
      setSearchLineIndex((prev) => prev < lastIndexInList ? (prev + 1) : prev);
    }
    if (isUpKey) {
      event.preventDefault();
      setSearchLineIndex((prev) => prev > 0 ? prev - 1 : prev);
    }
    if (isTabKey) {
      event.preventDefault();
      const lastIndexInList = filterBySearchList.length - 1;
      setSearchLineIndex((prev) => prev < lastIndexInList ? (prev + 1) : prev);
    }
    if (isEnter && isFocusOnSearchList) {
      navigate(`${AppRoute.Product}/${filterBySearchList[searchLineIndex].id}`);
    }

  }


  const searchListRef = useRef<HTMLDivElement>(null);
  const closeSearchList = () => {
    setSearch('');
    setSearchLineIndex(-1);
  };


  // закрытие поиска по клику outside
  function handleOutsideClick(event: MouseEvent) {
    const element = searchListRef.current;
    if (element && !element.contains(event.target as Element)) {
      closeSearchList();
    }

  }
  useEffect(() => {
    let isMounted = true;
    const element = searchListRef.current;

    if (isMounted && element) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      isMounted = false;
      document.removeEventListener('click', handleOutsideClick);
    };
  });


  function removeFocusFromSearchItem () {
    setSearchLineIndex(-1);
  }
  function handleSearchBarFocus () {
    removeFocusFromSearchItem();
  }


  return (
    <div
      className={cn('form-search', { 'list-opened': isActive })}
      onKeyDown={handleKeydown}
      ref={searchListRef}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={handleSearchBarFocus}

          />
        </label>
        {isActive && <SearchList list={filterBySearchList} searchLineIndex={searchLineIndex}/>}
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => closeSearchList()}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchMain };
