import { useEffect } from 'react';

import { BannerList } from '../../components/banner-list/banner-list';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CardList } from '../../components/card-list/card-list';
import { CatalogFilterAside } from '../../components/catalog-filter-aside/catalog-filter-aside';
import { CatalogPagination } from '../../components/catalog-pagination/catalog-pagination';
import { CatalogSort } from '../../components/catalog-sort/catalog-sort';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Loading } from '../../components/loading/loading';
import { ErrorConnection } from '../../components/error-connection/error-connection';

import { getHasErrorWithConnection } from '../../store/app-data-store/app-data-selectors';
import { fetchCamerasAction } from '../../store/api-actions/card-actions';
import { getCameras, getIsCamerasLoading } from '../../store/cards-data-store/cards-data-selectors';

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { AppRoute } from '../../consts';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const hasErrorWithConnection = useAppSelector(getHasErrorWithConnection);
  const isCameraLoading = useAppSelector(getIsCamerasLoading);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);


  if (isCameraLoading) {
    return <Loading />;
  }
  return (
    <div className="wrapper">
      <Header page={AppRoute.Catalog} />
      <main>
        <BannerList />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <CatalogFilterAside />
                <div className="catalog__content">
                  <CatalogSort />
                  {hasErrorWithConnection
                    ? <ErrorConnection page={'catalog'}/>
                    :
                    <>
                      <CardList cards={cameras} />
                      <CatalogPagination />
                    </>}

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
