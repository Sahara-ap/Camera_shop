import cn from 'classnames';
import { useAppSelector } from '../../hooks/store-hooks';
import { getIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-selectors';

function ModalReviewSuccess(): JSX.Element {
  const isActive = useAppSelector(getIsReviewModalSuccessActive);


  return (
    <div className={cn('modal modal--narrow', {'is-active': isActive})}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
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
