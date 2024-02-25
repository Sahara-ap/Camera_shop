import { useState } from 'react';
import { SearchList } from '../search-list/search-list';
import { useAppSelector } from '../../../hooks/store-hooks';
import { getCameras } from '../../../store/cards-data-store/cards-data-selectors';

function formatSearch(searchValue: string) {
  const result = searchValue.toLowerCase().replace(/\s+/g, '');
  return result;
}


function SearchMain(): JSX.Element {

  //TO DO: перейти на стор + всю логику поиска карточек перенести в селектор
  const [search, setSearch] = useState<string>('');
  const cameras = useAppSelector(getCameras);

  const filterBySearchList = cameras.filter((item) => {
    const formatName = formatSearch(item.name);
    const formatSearchValue = formatSearch(search);
    return formatName.includes(formatSearchValue);
  });


  return (
    <div className="form-search">
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
        <SearchList list={filterBySearchList} />
      </form>
      <button className="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchMain };
