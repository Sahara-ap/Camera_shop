import { TReview } from '../../types/general-types';
import { Review } from '../review/review';

type TReviewListProps = {
  reviews: TReview[];
}
function ReviewList({ reviews }: TReviewListProps): JSX.Element {
  return (
    <>
      {
        reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
          />
        ))
      }
    </>
  );
}

export { ReviewList };
