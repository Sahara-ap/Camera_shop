import { useState } from 'react';

import { ReviewList } from '../review-list/review-list';
import { TReview } from '../../types/generalTypes';

const STEP = 3;
const FIRST_REVIEW = 0;

type TSelectedProductReviewsProps = {
  reviews: TReview[];
}
function SelectedProductReviews({ reviews }: TSelectedProductReviewsProps): JSX.Element | null {

  const initialShownReviews = reviews.slice(FIRST_REVIEW, STEP);
  const initialClicks = 2;

  const [shownReviews, setShownReviews] = useState(initialShownReviews);
  const [clickCount, setClickCount] = useState(initialClicks);

  function handleMoreButtonClick() {
    setClickCount((prev) => prev + 1);
    const updatedReviews = reviews.slice(FIRST_REVIEW, clickCount * STEP);
    setShownReviews(updatedReviews);

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
