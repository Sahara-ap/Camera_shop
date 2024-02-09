import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';

import { formatPrice } from '../../utils/utils-functions';
import { ModalAddItem } from '../modal-add-item/modal-add-item';
import { RatingStars } from '../rating-stars/rating-stars';
import { SelectedProductInfoTabs } from '../selected-product-info-tabs/selected-product-info-tabs';

function SelectedProductInfo(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const info = useAppSelector(getSelectedCamera);

  function handleButtonClick() {
    dispatch(setIsBuyProductActive(true));
  }

  if (!info) {
    return null;
  }
  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source type="image/webp" srcSet={`${info.previewImgWebp}, ${info.previewImgWebp2x} 2x`} />
              <img src={info.previewImg} srcSet={`${info.previewImgWebp2x} 2x`} width="560" height="480" alt={info.name} />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{info.name}</h1>
            <div className="rate product__rate">
              <RatingStars rating={info.rating}/>
              <p className="visually-hidden">Рейтинг: {info.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{info.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{formatPrice(info.price)} ₽</p>
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleButtonClick}
              data-testid="selectedProductInfoAddButton"
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>

            <SelectedProductInfoTabs info={info}/>
          </div>
        </div>
      </section>
      <ModalAddItem />
    </div>

  );
}

export { SelectedProductInfo };
