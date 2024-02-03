import { useAppSelector } from '../../hooks/store-hooks';
import { getReviews } from '../../store/reviews-store/reviews-selectors';
import { ReviewList } from '../review-list/review-list';

function SelectedProductReviews(): JSX.Element {
  const reviews = useAppSelector(getReviews);

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>

          <ul className="review-block__list">
            <ReviewList reviews={reviews}/>
          </ul>

          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export { SelectedProductReviews };
