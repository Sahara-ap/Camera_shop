import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { makeFakeState } from '../../utils/mocks';
import { ModalReviewSuccess } from './modal-review-success';

describe('Component: ModalReviewSuccess', () => {
  const mockState = makeFakeState();
  const mockHandleClick = vi.fn();
  mockState.MODALS.isReviewModalSuccessActive = true;
  const { withStoreComponent, mockStore } = withStore(<ModalReviewSuccess onLinkClick={mockHandleClick} />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it('should render correctly', () => {

    const expectedText = /Спасибо за отзыв/;
    const expectedDivId = 'modalReviewSuccessDiv';
    const expectedReturnButtonId = 'modalReviewSuccessReturnButton';
    const expectedCloseButtonId = 'modalReviewCloseButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedDivId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedReturnButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedCloseButtonId)).toBeInTheDocument();
  });


  it('should call "closeModal" when click returnButton',
    async () => {
      mockHandleClick.mockReset();
      const expectedReturnButtonId = 'modalReviewSuccessReturnButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedReturnButtonId));

      expect(mockHandleClick).toBeCalledTimes(1);

    });
  it('should call "closeModal" when click closeButton',
    async () => {
      mockHandleClick.mockReset();
      const expectedReturnButtonId = 'modalReviewCloseButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedReturnButtonId));

      expect(mockHandleClick).toBeCalledTimes(1);

    });

});
