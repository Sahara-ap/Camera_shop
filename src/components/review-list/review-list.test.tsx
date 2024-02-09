import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../utils/mocks';
import { ReviewList } from './review-list';

describe('Component: ReviewList', () => {

  it('should render correctly', () => {
    const mockReviews = makeFakeReviews();
    const mockReviewsLength = mockReviews.length;
    const expectedElement = 'reviewDiv';

    render(<ReviewList reviews={mockReviews}/>);

    expect(screen.getAllByTestId(expectedElement).length).toBe(mockReviewsLength);
  });

});
