import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';

import { getIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { disableScrollLock, enableScrollLock, formatPrice } from '../../utils/utils-functions';
import { setIsAddProductToCartSuccess, setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';
import { Dispatch, useEffect, useRef } from 'react';
import { addItemToBasketList } from '../../store/basket-store/basket-slice';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';
import { saveToStorage } from '../../services/localStorage';
import { AnyAction } from '@reduxjs/toolkit';
import { saveToStorageAction } from '../../store/middleware/middleware-count';

function ModalAddItem(): JSX.Element | null {

  const dispatch = useAppDispatch();
  const isBuyProductActive = useAppSelector(getIsBuyProductActive);
  const productData = useAppSelector(getSelectedCamera);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const modal = {
    closeAddWindow: () => dispatch(setIsBuyProductActive(false)),
    openSuccessWindow: () => dispatch(setIsAddProductToCartSuccess(true)),
  };


  function handleCloseButtonClick() {
    modal.closeAddWindow();
  }

  function handleOverlayClick() {
    modal.closeAddWindow();
  }

  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    event.preventDefault();
    if (event.key.startsWith('Esc')) {
      modal.closeAddWindow();
    }
  }
  useEffect(() => {
    if (isBuyProductActive) {
      enableScrollLock();

      buttonRef.current?.focus();
    }

    return () => {
      disableScrollLock();
    };
  });

  const addItemToBasketListPromise = (): Promise<unknown> => {
    const result = new Promise ((resolve) => {
      if (productData) {
        resolve(dispatch(addItemToBasketList(productData)));
      }
    });
    return result;
  };

  function handleAddButtonClick() {
    modal.closeAddWindow();
    modal.openSuccessWindow();
    addItemToBasketListPromise()
      .then(() => dispatch(saveToStorageAction()));

    // if (productData) {
    //   dispatch(addItemToBasketList(productData));
    // }
  }

  if (!productData) {
    return null;
  }
  return (
    <div
      className={'modal is-active'}
      tabIndex={-1}
      data-testid="modalAddItemDiv"
      onKeyDown={handleModalWindowKeydown}
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
              ref={buttonRef}
              onClick={handleAddButtonClick}
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
