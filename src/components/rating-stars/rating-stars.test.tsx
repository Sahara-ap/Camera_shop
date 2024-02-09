import { render, screen } from '@testing-library/react';
import { RatingStars } from './rating-stars';

describe('Component: RatingStars', () => {

  it('should render correctly', () => {
    const mockRating = 1;
    const ratingListLength = 5;
    const expectedElementId = 'ratingStarsSvg';

    render(<RatingStars rating={mockRating}/>);

    expect(screen.getAllByTestId(expectedElementId).length).toBe(ratingListLength);
  });

});
