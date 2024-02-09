import { Link } from 'react-router-dom';
import cn from 'classnames';

const STEP = 1;

type TCatalogPaginationProps = {
  totalPages: number;
  pageNumber: number;
  onPaginationClick: (pageNumber: number) => void;

}
function CatalogPagination({ totalPages, pageNumber, onPaginationClick }: TCatalogPaginationProps): JSX.Element | null {
  const lastPage = totalPages;

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
              to={`?page=${previousPage}`}
              onClick={() => handlePaginationClick(previousPage)}
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
              to={`?page=${value}`}
            >
              {value}
            </Link>
          </li>
        ))}

        {totalPages >= 4 && pageNumber < (lastPage - 1) &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`?page=${nextPage}`}
              onClick={() => handlePaginationClick(nextPage)}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export { CatalogPagination };
