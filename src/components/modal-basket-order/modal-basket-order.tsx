import { useEffect, useRef } from 'react';
import { disableScrollLock, enableScrollLock } from '../../utils/utils-functions';
import { AppRoute, LoadingDataStatus } from '../../consts';
import { useNavigate } from 'react-router-dom';

type TModalBasketOrderProps = {
  onClick: () => void;
  sendigOrderStatus: LoadingDataStatus;
}
function ModalBasketOrder({ onClick, sendigOrderStatus }: TModalBasketOrderProps): JSX.Element {
  const closeModal = onClick;
  const isSendingSuccess = sendigOrderStatus === LoadingDataStatus.Success;
  const navigate = useNavigate();

  const ratingRef = useRef<HTMLButtonElement | null>(null);


  function handleCloseButtonClick() {
    closeModal();
    navigate(AppRoute.Catalog);
  }
  function handleOverlayClick() {
    closeModal();
  }
  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      closeModal();
    }
  }

  useEffect(() => {
    enableScrollLock();
    ratingRef.current?.focus();

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
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">{isSendingSuccess ? 'Спасибо за покупку' : 'Ошибка'}</p>
          {isSendingSuccess &&
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>}
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              onClick={handleCloseButtonClick}
              type="button"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            onClick={handleCloseButtonClick}
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

export { ModalBasketOrder };
