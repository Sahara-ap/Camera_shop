import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { getHasErrorWithConnection } from '../../store/app-data-store/app-data-selectors';
import { fetchSelectedCameraAction } from '../../store/api-actions/card-actions';
import { getIsSelectedCameraLoading, getSelectedCameraName } from '../../store/selected-card-data-store/selected-card-data-selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';

import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { SelectedProductInfo } from '../../components/selected-product-info/selected-product-info';
import { SelectedProductSimilar } from '../../components/selected-product-similar/selected-product-similar';
import { SelectedProductReviews } from '../../components/selected-product-reviews/selected-product-reviews';
import { Loading } from '../../components/loading/loading';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { ErrorConnection } from '../../components/error-connection/error-connection';

import { AppRoute } from '../../consts';

function SelectedProductPage(): JSX.Element {

  const { cardId } = useParams();
  const dispatch = useAppDispatch();

  const cameraName = useAppSelector(getSelectedCameraName);
  const isSelectedCardLoading = useAppSelector(getIsSelectedCameraLoading);
  const hasErrorWithConnection = useAppSelector(getHasErrorWithConnection);

  useEffect(() => {
    let isMounted = true;

    if (cardId && isMounted) {
      dispatch(fetchSelectedCameraAction(cardId));
    }
    return () => {
      isMounted = false;
    };
  }, [cardId, dispatch]);


  if (isSelectedCardLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet><title>{'Продукт - Фотошоп'}</title></Helmet>
      <div className="wrapper">
        <Header page={AppRoute.Product} />
        <main>
          <div className="page-content">
            <Breadcrumbs page='product' productName={cameraName} />
            {hasErrorWithConnection
              ? <ErrorConnection page={'product'} />
              :
              <>
                <SelectedProductInfo />
                <SelectedProductSimilar />
                <SelectedProductReviews />
              </>}

          </div>
        </main>
        <span
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          className="up-btn"
        >
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </span>
        <Footer />
      </div>
    </>
  );
}

export { SelectedProductPage };
