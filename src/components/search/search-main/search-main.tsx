import { useState } from 'react';
import cn from 'classnames';

import { useAppSelector } from '../../../hooks/store-hooks';
import { getCameras } from '../../../store/cards-data-store/cards-data-selectors';

import { SearchList } from '../search-list/search-list';
import { formatSearch } from '../utils/search-utils';


function SearchMain(): JSX.Element {

  //TO DO: перейти на стор + всю логику поиска карточек перенести в селектор
  const [search, setSearch] = useState<string>('');
  const cameras = useAppSelector(getCameras);

  const filterBySearchList = cameras.filter((item) => {
    const formatName = formatSearch(item.name);
    const formatSearchValue = formatSearch(search);
    return formatName.includes(formatSearchValue);
  });

  const isActive = formatSearch(search).length >= 1;

  return (
    <div className={cn('form-search', { 'list-opened': isActive })}>
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

          />
        </label>
        {isActive && <SearchList list={filterBySearchList} onSearchListClick={setSearch}/>}
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={() => setSearch('')}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchMain };
