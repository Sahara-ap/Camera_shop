import { Link, createSearchParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getParams } from '../../utils/utils-functions';

const STEP = 1;

type TCatalogPaginationProps = {
  totalPages: number;
  pageNumber: number;
  onPaginationClick: (pageNumber: number) => void;

}
function CatalogPagination({ totalPages, pageNumber, onPaginationClick }: TCatalogPaginationProps): JSX.Element | null {
  const lastPage = totalPages;
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('sp from catalog-pag', searchParams)
  const params = getParams(searchParams);
  console.log('params from catalog-pag', params)

  function getPaginationLength(pages: number) {
    switch (pages) {
      case 0:
      case 1:
        return;
      case 2:
        return 2;
      default:
        return 3;
    }
  }

  const length = getPaginationLength(totalPages);
  const paginationRange = new Array(length).fill(null).map((_, index) => {
    let result;
    switch (pageNumber) {
      case 1:
        result = index + pageNumber;
        break;
      case lastPage:
        result = (index - 2) + pageNumber;
        break;
      default:
        result = (index - 1) + pageNumber;
    }

    return result;
  });
  const previousPage = paginationRange[0] - STEP;
  const nextPage = paginationRange[paginationRange.length - 1] + STEP;

  function handlePaginationClick(page: number) {
    onPaginationClick(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }


  return (
    <div className="pagination" data-testid="catalogPaginationDiv">
      <ul className="pagination__list">
        {totalPages >= 4 && pageNumber >= 3 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              onClick={() => handlePaginationClick(previousPage)}
              // to={`?page=${previousPage}`}
              to={{
                search: createSearchParams({
                  ...params,
                  page: String(previousPage)
                }).toString()
              }}
            >Назад
            </Link>
          </li>}

        {paginationRange.map((value) => (
          <li
            key={crypto.randomUUID()}
            className="pagination__item"
          >
            <Link
              className={cn('pagination__link', { 'pagination__link--active': value === pageNumber })}
              onClick={() => handlePaginationClick(value)}
              // to={`?page=${value}`}
              to={{
                search: createSearchParams({
                  ...params,
                  page: String(value)
                }).toString()
              }}

            >
              {value}
            </Link>
          </li>
        ))}

        {totalPages >= 4 && pageNumber < (lastPage - 1) &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              onClick={() => handlePaginationClick(nextPage)}
              // to={`?page=${nextPage}`}
              to={{
                search: createSearchParams({
                  ...params,
                  page: String(nextPage)
                }).toString()
              }}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export { CatalogPagination };
