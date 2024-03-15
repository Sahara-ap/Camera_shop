import { BannerList } from '../../components/banner-list/banner-list';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CatalogFilterAside } from '../../components/catalog-filter-aside/catalog-filter-aside';
import { CatalogSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ErrorConnection } from '../../components/error-connection/error-connection';
import { CardListWithPagination } from '../../components/card-list-with-pagination/card-list-with-pagination';

import { getHasErrorWithConnection } from '../../store/app-data-store/app-data-selectors';

import { useAppSelector } from '../../hooks/store-hooks';
import { Helmet } from 'react-helmet-async';
import { ModalAddItemWrapper } from '../../components/modal-add-item-wrapper/modal-add-item-wrapper';


function CatalogPage(): JSX.Element {
  const hasErrorWithConnection = useAppSelector(getHasErrorWithConnection);

  return (
    <>
      <Helmet><title>{'Каталог - Фотошоп'}</title></Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <BannerList />
          <div className="page-content">
            <Breadcrumbs page={'catalog'} />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <CatalogFilterAside />
                  <div className="catalog__content">
                    <CatalogSort />
                    {hasErrorWithConnection
                      ? <ErrorConnection page={'catalog'} />
                      : <CardListWithPagination />}

                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <ModalAddItemWrapper />

        <Footer />
      </div>
    </>

  );
}

export { CatalogPage };
