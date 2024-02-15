type TRatingProps = {
  rating: number;
}

const MAX_NUMBER_OF_STARS = 5;

function RatingStars({ rating }: TRatingProps): JSX.Element {
  const relevantIndexForRatingValue = rating - 1;

  return (
    <>
      {
        new Array(MAX_NUMBER_OF_STARS).fill(null).map((_, index) => (
          <svg key={crypto.randomUUID()} width="17" height="16" aria-hidden="true" data-testid="ratingStarsSvg">
            <use xlinkHref={index <= relevantIndexForRatingValue ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))
      }
    </>
  );
}


export { RatingStars };
