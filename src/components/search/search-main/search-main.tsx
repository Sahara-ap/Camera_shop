import './saerch-main.css';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../hooks/store-hooks';
import { getCameras } from '../../../store/cards-data-store/cards-data-selectors';

import { SearchList } from '../search-list/search-list';
import { activateDownKey, activateTabKey, activateUpKey, filterBySearch, formatSearch } from '../utils/search-utils';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../consts';

const UL_SHOW_SYMBOLS_NUMBER = 3;
const CLEAR_BUTTON_ACTIVE_SYMBOLS_NUMBER = 1;

function SearchMain(): JSX.Element {
  const navigate = useNavigate();
  const searchListRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [search, setSearch] = useState<string>('');
  const [searchLineIndex, setSearchLineIndex] = useState(-1);
  const cameras = useAppSelector(getCameras);

  function closeSearchListAndFocus() {
    setSearch('');
    setSearchLineIndex(-1);
    const formElement = formRef.current;
    const input = formElement?.search as HTMLInputElement;
    input.focus();
  }

  function removeFocusFromSearchItem() {
    setSearchLineIndex(-1);
  }
  const filterCards = filterBySearch(cameras, search);
  const isActiveUl = formatSearch(search).length >= UL_SHOW_SYMBOLS_NUMBER;
  const isActiveButton = formatSearch(search).length >= CLEAR_BUTTON_ACTIVE_SYMBOLS_NUMBER;


  function handleKeydown(event: React.KeyboardEvent) {
    const lastIndexInUl = filterCards.length - 1;

    activateDownKey(event, lastIndexInUl, setSearchLineIndex);
    activateUpKey(event, setSearchLineIndex);
    activateTabKey(event, lastIndexInUl, setSearchLineIndex);

    const isEnter = event.key.startsWith('Enter');
    const isFocusOnSearchList = searchLineIndex >= 0;
    if (isEnter && isFocusOnSearchList) {
      const path = `${AppRoute.Product}/${filterCards[searchLineIndex].id}`;
      navigate(path);
    }
  }

  function handleOutsideClick(event: MouseEvent) {
    const element = searchListRef.current;
    if (element && !element.contains(event.target as Element)) {
      setSearch('');
      setSearchLineIndex(-1);
    }
  }
  useEffect(() => {
    let isMounted = true;
    const element = searchListRef.current;

    if (isMounted && element) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  function handleSearchBarFocus() {
    removeFocusFromSearchItem();
  }


  return (
    <div
      className={cn('form-search', { 'list-opened': isActiveUl })}
      onKeyDown={handleKeydown}
      ref={searchListRef}
      data-testid={'searchMainDiv'}

    >
      <form ref={formRef}>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            name='search'
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={handleSearchBarFocus}

          />
        </label>
        {isActiveUl && <SearchList list={filterCards} searchLineIndex={searchLineIndex} />}
      </form>
      {isActiveButton &&
        <button
          className="form-search__reset"
          type="reset"
          onClick={() => closeSearchListAndFocus()}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg><span className="visually-hidden">Сбросить поиск</span>
        </button>}
    </div>
  );
}

export { SearchMain };
