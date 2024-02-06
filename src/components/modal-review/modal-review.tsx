import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { getIsReviewModalActive } from '../../store/modal-windows-store/modal-windows-selectors';
import { setIsReviewModalActive, setIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-slice';
import { getSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-selectors';
import { getReviewSendingStatus } from '../../store/reviews-store/reviews-selectors';
import { setReviewSendingStatus } from '../../store/reviews-store/reviews-slice';

import { postReview } from '../../store/api-actions/reviews-action';

import { LoadingDataStatus } from '../../consts';


function ModalReview(): JSX.Element {
  const isActive = useAppSelector(getIsReviewModalActive);
  const cameraId = useAppSelector(getSelectedCamera)?.id;
  const sendingStatus = useAppSelector(getReviewSendingStatus);

  const dispatch = useAppDispatch();


  function handleCloseButtonClick() {
    dispatch(setIsReviewModalActive(false));
  }
  function handleOverlayClick() {
    dispatch(setIsReviewModalActive(false));
  }
  function handleModalWindowKeydown(event: React.KeyboardEvent) {
    if (event.key.startsWith('Esc')) {
      dispatch(setIsReviewModalActive(false));
    }
  }


  type FormInputs = {
    rate: number;
    'user-name': string;
    'user-plus': string;
    'user-minus': string;
    'user-comment': string;
  }

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange'
  });

  const handleFormSubmit: SubmitHandler<FormInputs> = (formData, event) => {
    event?.preventDefault();
    if (cameraId) {
      const body = {
        cameraId: cameraId,
        userName: formData['user-name'],
        advantage: formData['user-plus'],
        disadvantage: formData['user-minus'],
        review: formData['user-comment'],
        rating: Number(formData.rate),
      };

      dispatch(postReview(body));
    }
  };


  useEffect(() => {
    if (isActive) {
      document.body.classList.add('scroll-lock');
      setTimeout(() => {
        setFocus('user-name');
      }, 100);
    }

    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, [isActive, setFocus]);

  useEffect(() => {
    switch (sendingStatus) {
      case LoadingDataStatus.Success:
        reset();
        dispatch(setIsReviewModalActive(false));
        dispatch(setIsReviewModalSuccessActive(true));
        dispatch(setReviewSendingStatus(LoadingDataStatus.Unsent));
        break;
      case LoadingDataStatus.Error:
        toast.warn('Данные не отправлены, попробуйте снова');
        dispatch(setReviewSendingStatus(LoadingDataStatus.Unsent));
    }

  }, [sendingStatus, reset, dispatch]);

  const ratingValue = watch('rate');

  const errorRating = errors.rate;
  const errorName = errors['user-name'];
  const errorAdvantage = errors['user-plus'];
  const errorDisadvantage = errors['user-minus'];
  const errorComment = errors['user-comment'];


  return (
    <div
      className={cn('modal', { 'is-active': isActive })}
      onKeyDown={handleModalWindowKeydown}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={handleOverlayClick}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form
              method="post"
              onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}
            >

              <div className="form-review__rate">
                <fieldset className={cn('rate form-review__item', { 'is-invalid': errorRating })} >
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>

                  <div className="rate__bar">
                    <div className="rate__group">
                      <input
                        {...register('rate', { required: 'Нужно оценить товар' })}
                        className="visually-hidden" id="star-5" type="radio" value="5"

                      />
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input
                        {...register('rate', { required: 'Нужно оценить товар' })}
                        className="visually-hidden" id="star-4" type="radio" value="4"
                      />
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input
                        {...register('rate', { required: 'Нужно оценить товар' })}
                        className="visually-hidden" id="star-3" type="radio" value="3"
                      />
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input
                        {...register('rate', { required: 'Нужно оценить товар' })}
                        className="visually-hidden" id="star-2" type="radio" value="2"
                      />
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input
                        {...register('rate', { required: 'Нужно оценить товар' })}
                        className="visually-hidden" id="star-1" type="radio" value="1"
                      />
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>

                    <div className="rate__progress">
                      <span className="rate__stars">
                        {ratingValue ?? 0}
                      </span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  {errorRating ? <p className="rate__message ">{errorRating.message}</p> : null}
                </fieldset>

                <div className={cn('custom-input form-review__item', { 'is-invalid': errorName })}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('user-name', {
                        required: 'Нужно указать имя',
                        minLength: {
                          value: 2,
                          message: 'Количество символов от 2 до 15'
                        },
                        maxLength: {
                          value: 15,
                          message: 'Количество символов от 2 до 15'
                        }
                      })}
                      type="text"
                      placeholder="Введите ваше имя"
                    />
                  </label>
                  {errorName ? <p className="custom-input__error">{errorName.message}</p> : null}
                </div>

                <div className={cn('custom-input form-review__item', { 'is-invalid': errorAdvantage })}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('user-plus', {
                        required: 'Нужно указать достоинства',
                        minLength: {
                          value: 10,
                          message: 'Количество символов от 10 до 160'
                        },
                        maxLength: {
                          value: 160,
                          message: 'Количество символов от 10 до 160'
                        }
                      })}
                      type="text"
                      placeholder="Основные преимущества товара"
                    />
                  </label>
                  {errorAdvantage ? <p className="custom-input__error">{errorAdvantage.message}</p> : null}
                </div>

                <div className={cn('custom-input form-review__item', { 'is-invalid': errorDisadvantage })}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register('user-minus', {
                        required: 'Нужно указать недостатки',
                        minLength: {
                          value: 10,
                          message: 'Количество символов от 10 до 160'
                        },
                        maxLength: {
                          value: 160,
                          message: 'Количество символов от 10 до 160'
                        }
                      })}
                      type="text"
                      placeholder="Главные недостатки товара"
                    />
                  </label>
                  {errorDisadvantage ? <p className="custom-input__error">{errorDisadvantage.message}</p> : null}
                </div>

                <div className={cn('custom-textarea form-review__item', { 'is-invalid': errorComment })}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea
                      {...register('user-comment', {
                        required: 'Нужно добавить комментарий',
                        minLength: {
                          value: 10,
                          message: 'Количество символов от 10 до 160'
                        },
                        maxLength: {
                          value: 160,
                          message: 'Количество символов от 10 до 160'
                        }
                      })}
                      placeholder="Поделитесь своим опытом покупки"
                    />
                  </label>
                  {errorComment ? <div className="custom-input__error">{errorComment.message}</div> : null}
                </div>

              </div>

              <button
                disabled={isSubmitting || !isValid}
                className="btn btn--purple form-review__btn"
                type="submit"
              >
                Отправить отзыв
              </button>
            </form>
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

export { ModalReview };
