import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { extractActionTypes, makeFakeReviewSlice } from '../../utils/mocks';
import { SelectedProductReviews } from './selected-product-reviews';
import userEvent from '@testing-library/user-event';
import { setIsReviewModalActive } from '../../store/modal-windows-store/modal-windows-slice';

describe('Component: SelectedProductReviews', () => {
  const mockState = makeFakeReviewSlice();
  const { withStoreComponent, mockStore } = withStore(<SelectedProductReviews />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {

    const expectedText = /Отзывы/;
    const expectedPostReviewButtonId = 'PostReviewButton';
    const expectedShowMoreButtonId = 'ShowMoreReviewsButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedPostReviewButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedShowMoreButtonId)).toBeInTheDocument();
  });

  it('should dispatch "setIsReviewModalActive" action when push PostReviewButton',
    async () => {
      const expectedPostReviewButtonId = 'PostReviewButton';

      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedPostReviewButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsReviewModalActive.type,
      ]);

    });

});
