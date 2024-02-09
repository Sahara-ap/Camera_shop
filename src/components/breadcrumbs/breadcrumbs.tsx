import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { TCard, TPage } from '../../types/generalTypes';

type TBreadcrumbsProps = {
  page: TPage;
  productName?: TCard['name'];
}
function Breadcrumbs({ page, productName }: TBreadcrumbsProps): JSX.Element {

  return (
    <div className="breadcrumbs" data-testid="brewadcrumbsDivElement">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </Link>
          </li>
          {page === 'catalog' &&
            <li className="breadcrumbs__item">
              <span className='breadcrumbs__link breadcrumbs__link--active' >
                Каталог
              </span>
            </li>}

          {page === 'product' &&
            <>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Catalog}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {productName}
                </span>
              </li>
            </>}
        </ul>
      </div>
    </div>
  );
}

export { Breadcrumbs };
