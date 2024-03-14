import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useEffect, useRef } from 'react';
import { disableScrollLock, enableScrollLock, reduceFirstLetter } from '../../utils/utils-functions';
import { setIsRemoveFromBasketActive } from '../../store/modal-windows-store/modal-windows-slice';
import { getBasketRemoveItem } from '../../store/basket-store/basket-selectors';
import { deleteBasketItem } from '../../store/basket-store/basket-slice';

type TModalBasketRemoveItemProps = {
  isActive: boolean;
}
function ModalBasketRemoveItem({ isActive }: TModalBasketRemoveItemProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const card = useAppSelector(getBasketRemoveItem);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const modal = {
    closeRemoveWindow: () => dispatch(setIsRemoveFromBasketActive(false)),
  };


  function handleCloseButtonClick() {
    modal.closeRemoveWindow();
  }

  function handleOverlayClick() {
    modal.closeRemoveWindow();
  }

  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      event.preventDefault();
      modal.closeRemoveWindow();
    }
  }
  useEffect(() => {
    if (isActive) {
      enableScrollLock();

      buttonRef.current?.focus();
    }

    return () => {
      disableScrollLock();
    };
  });

  function handelRemoveButton() {
    if (card) {
      dispatch(deleteBasketItem(card.id));
    }
    modal.closeRemoveWindow();


  }
  if (!card) {
    return null;
  }
  return (
    <div
      className="modal is-active"
      onKeyDown={handleModalWindowKeydown}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${card.previewImgWebp}, ${card.previewImgWebp2x} 2x`} />
                <img src={card.previewImg} srcSet={`${card.previewImg2x} 2x`} width="140" height="120" alt={card.name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{card.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{card.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{card.type} {reduceFirstLetter(card.category)}</li>
                <li className="basket-item__list-item">{card.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              ref={buttonRef}
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              tabIndex={0}
              onClick={handelRemoveButton}
            >
              Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to="#"
              tabIndex={0}
              onClick={() => modal.closeRemoveWindow()}
            >
              Продолжить покупки
            </Link>
          </div>
          <button
            onClick={handleCloseButtonClick}
            className="cross-btn"
            type="button"
            tabIndex={0}
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

export { ModalBasketRemoveItem };
