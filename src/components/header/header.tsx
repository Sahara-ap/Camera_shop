import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { SearchMain } from '../search/search-main/search-main';
import { useAppSelector } from '../../hooks/store-hooks';
import { getTotalCount } from '../../store/basket-store/basket-selectors';


function Header(): JSX.Element {
  const basketCount = useAppSelector(getTotalCount);

  return (
    <header className="header" id="header" data-testid="headerDivElement">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Catalog} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><Link className="main-nav__link" to={AppRoute.Catalog}>Каталог</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Гарантии</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">Доставка</Link>
            </li>
            <li className="main-nav__item"><Link className="main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <SearchMain />
        <Link
          className="header__basket-link"
          to={AppRoute.Basket}
        >
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketCount !== 0 && <span className="header__basket-count">{basketCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export { Header };
