import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { disableScrollLock, enableScrollLock } from '../../utils/utils-functions';

type TModalAddItemSuccessProps = {
  onLinkClick: () => void;
}
function ModalAddItemSuccess({ onLinkClick }: TModalAddItemSuccessProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const closeModal = onLinkClick;


  function handleGoOnShoppingLinkClick() {
    closeModal();
  }

  function handleCloseButtonClick() {
    closeModal();
  }

  function handleOverlayClick() {
    closeModal();
  }

  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    event.preventDefault();
    if (event.key.startsWith('Esc')) {
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
              to="#"
              onClick={handleGoOnShoppingLinkClick}
            >
              Продолжить покупки
            </Link>

            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              ref={buttonRef}
            >
              Перейти в корзину
            </button>
          </div>

          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
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
