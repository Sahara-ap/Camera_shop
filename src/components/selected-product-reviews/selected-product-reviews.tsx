import { useCallback, useEffect, useState } from 'react';

import { ReviewList } from '../review-list/review-list';
import { getIsReviewsLoading, getSortedReviews } from '../../store/reviews-store/reviews-selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { setIsReviewModalActive } from '../../store/modal-windows-store/modal-windows-slice';

const INITIAL_NUMBER_REVIEWS = 3;

function SelectedProductReviews(): JSX.Element | null {
  const reviews = useAppSelector(getSortedReviews);
  const isLoading = useAppSelector(getIsReviewsLoading);
  const dispatch = useAppDispatch();

  const [countReviews, setCountReviews] = useState(INITIAL_NUMBER_REVIEWS);
  const shownReviews = reviews.slice(0, countReviews);


  function handleMoreButtonClick() {
    setCountReviews(countReviews + INITIAL_NUMBER_REVIEWS);
  }

  function handleReviewButtonClick() {
    dispatch(setIsReviewModalActive(true));
  }


  const handleDocumentScroll = useCallback((event: Event) => {
    const target = event.target as Document;
    if (
      target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight) === 0) {
      setCountReviews(countReviews + INITIAL_NUMBER_REVIEWS);
    }
  }, [countReviews]);

  useEffect(() => {
    if (shownReviews.length < reviews.length) {
      document.addEventListener('scroll', handleDocumentScroll);
    }

    return () => document.removeEventListener('scroll', handleDocumentScroll);
  }, [shownReviews.length, reviews.length, handleDocumentScroll]);

  if (isLoading) {
    return null;
  }
  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              onClick={handleReviewButtonClick}
              className="btn"
              type="button"
              data-testid="PostReviewButton"
            >
              Оставить свой отзыв
            </button>
          </div>

          <ul className="review-block__list">
            <ReviewList reviews={shownReviews} />
          </ul>

          <div className="review-block__buttons">
            {shownReviews.length < reviews.length &&
              <button
                onClick={handleMoreButtonClick}
                className="btn btn--purple"
                type="button"
                data-testid="ShowMoreReviewsButton"

              >
                Показать больше отзывов
              </button>}
          </div>
        </div>
      </section>
    </div>
  );
}

export { SelectedProductReviews };
