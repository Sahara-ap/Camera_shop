import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { useEffect, useRef } from 'react';
import { setIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-slice';
import { DELAY } from '../../consts';
import { disableScrollLock, enableScrollLock } from '../../utils/utils-functions';

type TModalReviewSuccessProps = {
  onLinkClick: () => void;
}
function ModalReviewSuccess({ onLinkClick }: TModalReviewSuccessProps): JSX.Element {
  const closeModal = onLinkClick;

  // const isActive = useAppSelector(getIsReviewModalSuccessActive);

  // const dispatch = useAppDispatch();
  const ratingRef = useRef<HTMLButtonElement | null>(null);


  function handleCloseButtonClick() {
    // dispatch(setIsReviewModalSuccessActive(false));
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function handleOverlayClick() {
    closeModal();
    // dispatch(setIsReviewModalSuccessActive(false));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      closeModal();
      // dispatch(setIsReviewModalSuccessActive(false));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    // if (isActive && ratingRef.current) {
    //   enableScrollLock();

    //   setTimeout(() => ratingRef.current?.focus(), DELAY);
    // }
    enableScrollLock();
    ratingRef.current?.focus();

    return () => {
      disableScrollLock();
    };
    // }, [isActive]);
  });


  return (
    <div
      // className={cn('modal modal--narrow', { 'is-active': isActive })}
      className="modal modal--narrow is-active"
      onKeyDown={handleModalWindowKeydown}
      data-testid="modalReviewSuccessDiv"
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleOverlayClick}
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={handleCloseButtonClick}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={ratingRef}
              data-testid="modalReviewSuccessReturnButton"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            onClick={handleCloseButtonClick}
            className="cross-btn" type="button" aria-label="Закрыть попап"
            data-testid="modalReviewCloseButton"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div >
  );
}

export { ModalReviewSuccess };
