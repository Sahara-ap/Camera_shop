import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CatalogPage } from '../pages/catalog-page/catalog-page';
import { SelectedProductPage } from '../pages/selected-product-page/selected-product-page';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../consts';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';


function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          <Route path={AppRoute.Product} element={<SelectedProductPage />} />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export { App };
