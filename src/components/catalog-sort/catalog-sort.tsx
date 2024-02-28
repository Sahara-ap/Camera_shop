import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../utils/utils-functions';
import { SortingOrder, SortingType } from '../../consts';

function CatalogSort(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);
  const sortTypeParam = params.sortType || '';
  const sortOrderParam = params.sortOrder || '';

  const [sortType, setSortType] = useState(sortTypeParam);
  const [sortOrder, setSortOrder] = useState(sortOrderParam);

  function handleSortPriceChange () {
    params.sortType = SortingType.Price;
    setSearchParams(params);
    setSortType(SortingType.Price);
  }

  function handleSortPopularChange () {
    params.sortType = SortingType.Popular;
    setSearchParams(params);
    setSortType(SortingType.Popular);
  }

  function handleSortOrderUpChange () {
    params.sortOrder = SortingOrder.Up;
    setSearchParams(params);
    setSortOrder(SortingOrder.Up);
  }
  function handleSortOrderDownChange () {
    params.sortOrder = SortingOrder.Down;
    setSearchParams(params);
    setSortOrder(SortingOrder.Down);
  }


  return (
    <div className="catalog-sort" data-testid="catalogSortDiv">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortingType.Price}
                onChange={handleSortPriceChange}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortingType.Popular}
                onChange={handleSortPopularChange}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>

          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortOrder === SortingOrder.Up}
                onChange={handleSortOrderUpChange}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortOrder === SortingOrder.Down}
                onChange={handleSortOrderDownChange}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export { CatalogSort };
