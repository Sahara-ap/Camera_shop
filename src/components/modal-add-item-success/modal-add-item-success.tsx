import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { disableScrollLock, enableScrollLock } from '../../utils/utils-functions';
import { AppRoute } from '../../consts';
import { TLocationState } from '../../types/general-types';

type TModalAddItemSuccessProps = {
  onLinkClick: () => void;
  page?: 'catalog' | 'product';
}
function ModalAddItemSuccess({ onLinkClick, page }: TModalAddItemSuccessProps): JSX.Element {


  const location = useLocation() as TLocationState;
  const hrefForProduct = location.state?.fromForProduct;
  const hrefForCatalog = window.location.href;

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeModal = onLinkClick;
  const navigate = useNavigate();


  function handleGoOnShoppingLinkClick() {
    closeModal();
  }
  function handleToBasketClick() {
    closeModal();
    navigate(AppRoute.Basket);

  }

  function handleCloseButtonClick() {
    closeModal();
  }

  function handleOverlayClick() {
    closeModal();
  }

  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      event.preventDefault();
      closeModal();
    }
  }

  useEffect(() => {
    enableScrollLock();
    buttonRef.current?.focus();

    return () => {
      disableScrollLock();
    };
  });


  return (
    <div
      className="modal is-active modal--narrow"
      onKeyDown={handleModalWindowKeydown}

    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleOverlayClick}
        >

        </div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>

          <div className="modal__buttons">
            <Link
              className="btn btn--transparent modal__btn"
              to={page === 'product' ? hrefForProduct : hrefForCatalog}
              onClick={handleGoOnShoppingLinkClick}
              data-testid="goOnLink"
            >
              Продолжить покупки
            </Link>

            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={buttonRef}
              onClick={handleToBasketClick}
            >
              Перейти в корзину
            </button>
          </div>

          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
            data-testid="closeModalButton"
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

export { ModalAddItemSuccess };
