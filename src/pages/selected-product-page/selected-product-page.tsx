import { useEffect } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';
import { fetchSelectedCameraAction } from '../../store/api-actions/card-action';
import { useParams } from 'react-router-dom';
import { SelectedProductInfo } from '../../components/selected-product-info/selected-product-info';
import { SelectedProductSimilar } from '../../components/selected-product-similar/selected-product-similar';
import { SelectedProductReviews } from '../../components/selected-product-reviews/selected-product-reviews';

function SelectedProductPage(): JSX.Element {
  const { cardId } = useParams();
  const selectedCard = useAppSelector(getSelectedCamera);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (cardId && isMounted) {
      dispatch(fetchSelectedCameraAction(cardId));
    }
    return () => {
      isMounted = false;
    };
  }, [cardId, dispatch]);

  console.log(selectedCard);


  return (
    <div className="wrapper">
      <Header page={AppRoute.Product} />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Ретрокамера Das Auge IV
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <SelectedProductInfo />
          <SelectedProductSimilar />
          <SelectedProductReviews />
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export { SelectedProductPage };
