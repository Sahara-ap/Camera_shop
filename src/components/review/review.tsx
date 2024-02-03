import { TReview } from '../../types/generalTypes';
import { formatDate } from '../../utils/utils-functions';
import { RatingStars } from '../rating-stars/rating-stars';

type TReviewProps = {
  review: TReview;
}

function Review({review}: TReviewProps): JSX.Element {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13"> {formatDate(review.createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        <RatingStars rating={review.rating}/>
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>

      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export { Review };
