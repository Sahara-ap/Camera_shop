type TRatingProps = {
  rating: number;
}


function RatingStars({ rating }: TRatingProps): JSX.Element {
  const ratingMap = [1, 2, 3, 4, 5];
  const score = rating - 1;

  return (
    <>
      {
        ratingMap.map((_, index) => (
          <svg key={crypto.randomUUID()} width="17" height="16" aria-hidden="true" data-testid="ratingStarsSvg">
            <use xlinkHref={index <= score ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))
      }
    </>
  );
}


export { RatingStars };
