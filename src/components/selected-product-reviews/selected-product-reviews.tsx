import { useState } from 'react';

import { ReviewList } from '../review-list/review-list';
import { getIsReviewsLoading, getSortedReviews } from '../../store/reviews-store/reviews-selectors';
import { useAppSelector } from '../../hooks/store-hooks';

const INITIAL_NUMBER_REVIEWS = 3;

function SelectedProductReviews(): JSX.Element | null {
  const reviews = useAppSelector(getSortedReviews);
  const isLoading = useAppSelector(getIsReviewsLoading);

  const [countReviews, setCountReviews] = useState(INITIAL_NUMBER_REVIEWS);
  const shownReviews = reviews.slice(0, countReviews);

  function handleMoreButtonClick() {
    setCountReviews(countReviews + INITIAL_NUMBER_REVIEWS);
  }

  if (isLoading) {
    return null;
  }
  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
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
