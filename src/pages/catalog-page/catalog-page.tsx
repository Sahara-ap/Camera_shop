import { Banner } from '../../components/banner/banner';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CardList } from '../../components/card-list/card-list';
import { CatalogFilterAside } from '../../components/catalog-filter-aside/catalog-filter-aside';
import { CatalogSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../consts';

function CatalogPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header page={AppRoute.Catalog} />
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogFilterAside />
                <div className="catalog__content">
                  <CatalogSort />
                  <CardList />
                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                      </li>
                      <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export { CatalogPage };
