import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../pages/catalog-page/catalog-page';
import { SelectedProductPage } from '../pages/selected-product-page/selected-product-page';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../consts';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import HistoryRouter from '../components/history-router/history-router';
import browserHistory from '../browser-history';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/store-hooks';
import { fetchCamerasAction } from '../store/api-actions/card-actions';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          <Route path={`${AppRoute.Product}/:cardId`} element={<SelectedProductPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export { App };
