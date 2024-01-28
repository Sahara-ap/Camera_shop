import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useEffect } from 'react';
import cn from 'classnames';

type TCatalogPaginationProps = {
  totalCardsLength: number;
  totalPages: number;
  pageNumber: number;
  onPaginationClick: (pageNumber: number) => void;

}
function CatalogPagination({ totalCardsLength, totalPages, pageNumber, onPaginationClick }: TCatalogPaginationProps): JSX.Element | null {

  function handlePaginationClick(page: number) {
    onPaginationClick(page);
  }

  function getUrl() {
    return new URL(window.location.href);
  }

  function getParams() {
    const url = getUrl();
    const params = Object.fromEntries(url.searchParams);

    return params;
  }

  function setParams(page: number) {
    const url = getUrl();
    url.search = '';
    url.searchParams.set('page', String(page));
  }

  function getPaginationLength(pages: number) {
    switch (pages) {
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
    const value = Number(index + pageNumber);
    return value;
  });

  const navigate = useNavigate();
  useEffect(() => {
    navigate(`${AppRoute.Catalog}?page=${pageNumber}`);

  }, [pageNumber, navigate]);

  const { page } = getParams();
  console.log('page', page);



  const currentPageNumbers = 1


  if (totalCardsLength <= 9) {
    return null;
  }
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {paginationRange.map((value) => (
          <li
            key={crypto.randomUUID()}
            className="pagination__item"
          >
            <Link
              className={cn(
                'pagination__link',
                { 'pagination__link--active': value === pageNumber }
              )}
              to={`${AppRoute.Catalog}?page=${value}`}
              onClick={() => handlePaginationClick(value)}
            >
              {value}
            </Link>
          </li>
        ))}
        {totalPages >= 4 &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text" to="2">Далее</Link>
          </li>
        }

        {/* <li className="pagination__item"><Link className="pagination__link pagination__link--active" to="1">1</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="2">2</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link" to="3">3</Link>
        </li>
        <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="2">Далее</Link>
        </li> */}
      </ul>
    </div>
  );
}

export { CatalogPagination };
