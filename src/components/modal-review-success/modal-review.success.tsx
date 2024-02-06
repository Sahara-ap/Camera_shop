import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { useEffect, useRef } from 'react';
import { setIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-slice';

function ModalReviewSuccess(): JSX.Element {
  const isActive = useAppSelector(getIsReviewModalSuccessActive);

  const dispatch = useAppDispatch();
  const ratingRef = useRef<HTMLButtonElement | null>(null);

  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      dispatch(setIsReviewModalSuccessActive(false));
    }
  }

  useEffect(() => {
    if (isActive && ratingRef.current) {
      document.body.classList.add('scroll-lock');

      setTimeout(() => {
        ratingRef.current?.focus();
      }, 100);
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  });


  return (
    <div
      className={cn('modal modal--narrow', { 'is-active': isActive })}
      onKeyDown={ handleModalWindowKeydown}
    >
      <div className="modal__wrapper">
        <div
          onClick={() => dispatch(setIsReviewModalSuccessActive(false))}
          className="modal__overlay"
        >
        </div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={() => dispatch(setIsReviewModalSuccessActive(false))}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              ref={ratingRef}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            onClick={() => dispatch(setIsReviewModalSuccessActive(false))}
            className="cross-btn" type="button" aria-label="Закрыть попап"
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

export { ModalReviewSuccess };
