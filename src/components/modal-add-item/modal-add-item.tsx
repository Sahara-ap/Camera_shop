import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';

import { getIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';
import { formatPrice } from '../../utils/utils-functions';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';
import { useEffect} from 'react';

function ModalAddItem(): JSX.Element | null {

  const dispatch = useAppDispatch();
  const isBuyProductActive = useAppSelector(getIsBuyProductActive);
  const productData = useAppSelector(getSelectedCamera);


  function handleCloseButtonClick() {
    dispatch(setIsBuyProductActive(false));
  }

  function handleOverlayClick() {
    dispatch(setIsBuyProductActive(false));
  }

  function handleModalWindowKeydown(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key.startsWith('Esc')) {
      dispatch(setIsBuyProductActive(false));
    }
  }
  useEffect(() => {
    if (isBuyProductActive) {
      document.addEventListener('keydown', handleModalWindowKeydown);
      document.body.classList.add('scroll-lock');
    }

    return () => {
      document.removeEventListener('keydown', handleModalWindowKeydown);
      document.body.classList.remove('scroll-lock');
    };
  });


  if (!productData) {
    return null;
  }
  return (
    <div
      className={cn('modal', { 'is-active': isBuyProductActive })}
      tabIndex={-1}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content" >
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp"
                  srcSet={`${productData.previewImgWebp}, ${productData.previewImgWebp2x} 2x`}
                />
                <img
                  src={productData.previewImg}
                  srcSet={`${productData.previewImg2x} 2x`}
                  width="140" height="120"
                  alt={productData.name}

                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{productData.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{productData.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{productData.category}</li>
                <li className="basket-item__list-item">{productData.level} уровень</li>
              </ul>
              <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{formatPrice(productData.price)} ₽</p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              tabIndex={0}
              className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину

            </button>
          </div>
          <button
            onClick={handleCloseButtonClick}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"

          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}

export { ModalAddItem };
