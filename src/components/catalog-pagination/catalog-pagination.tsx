import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '../../consts';

const STEP = 1;

type TCatalogPaginationProps = {
  totalPages: number;
  pageNumber: number;
  onPaginationClick: (pageNumber: number) => void;

}
function CatalogPagination({ totalPages, pageNumber, onPaginationClick }: TCatalogPaginationProps): JSX.Element | null {

  const lastPage = totalPages;

  function handlePaginationClick(page: number) {
    onPaginationClick(page);
  }

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


  return (
    <div className="pagination">
      <ul className="pagination__list">
        {totalPages >= 4 && pageNumber >= 3 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}?page${paginationRange[0] - STEP}`}
              onClick={() => handlePaginationClick(paginationRange[0] - STEP)}
            >Назад
            </Link>
          </li>}

        {paginationRange.map((value) => (
          <li
            key={value}
            className="pagination__item"
          >
            <Link
              className={cn('pagination__link', { 'pagination__link--active': value === pageNumber })}
              to={`${AppRoute.Catalog}?page=${value}`}
              onClick={() => handlePaginationClick(value)}
            >
              {value}
            </Link>
          </li>
        ))}

        {totalPages >= 4 && pageNumber < (lastPage - 1) &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}?page${paginationRange[paginationRange.length - 1] + STEP}`}
              onClick={() => handlePaginationClick(paginationRange[paginationRange.length - 1] + STEP)}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export { CatalogPagination };
