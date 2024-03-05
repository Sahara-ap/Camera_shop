import { useSearchParams } from 'react-router-dom';
import { getParams } from '../../utils/utils-functions';
import { SortingOrder, SortingType } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getSortOrder, getSortType } from '../../store/app-data-store/app-data-selectors';
import { setSortOrder, setSortType } from '../../store/app-data-store/app-data-slice';
import { useEffect } from 'react';

function CatalogSort(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = getParams(searchParams);

  const dispatch = useAppDispatch();
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);

  useEffect(() => {
    const sortTypeParam = params.sortType || SortingType.Non;
    dispatch(setSortType(sortTypeParam));

  }, [dispatch, params.sortType]);

  useEffect(() => {
    const sortOrderParam = params.sortOrder || SortingOrder.Non;
    dispatch(setSortOrder(sortOrderParam));
  }, [dispatch, params.sortOrder]);


  function handleSortTypeChange(sortingType: SortingType) {
    params.sortType = sortingType;
    setSearchParams(params);
  }

  function handleSortOrderChange(sortingOrder: SortingOrder) {
    params.sortOrder = sortingOrder;
    setSearchParams(params);
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
                checked={sortType === SortingType.Price || (sortType === SortingType.Non && sortOrder !== SortingOrder.Non)}
                onChange={() => handleSortTypeChange(SortingType.Price)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortingType.Popular}
                onChange={() => handleSortTypeChange(SortingType.Popular)}
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
                checked={(sortOrder === SortingOrder.Up) || (sortType !== SortingType.Non && sortOrder !== SortingOrder.Down)}
                onChange={() => handleSortOrderChange(SortingOrder.Up)}
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
                onChange={() => handleSortOrderChange(SortingOrder.Down)}
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
