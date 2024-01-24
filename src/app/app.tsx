import { Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../pages/catalog-page/catalog-page';
import { SelectedProductPage } from '../pages/selected-product-page/selected-product-page';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../consts';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import HistoryRouter from '../components/history-router';
import browserHistory from '../browser-history';


function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          <Route path={AppRoute.Product} element={<SelectedProductPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export { App };
