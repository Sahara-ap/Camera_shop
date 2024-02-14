import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { extractActionTypes, makeFakeState } from '../../utils/mocks';
import { ModalReviewSuccess } from './modal-review-success';
import { setIsReviewModalSuccessActive } from '../../store/modal-windows-store/modal-windows-slice';

describe('Component: ModalReviewSuccess', () => {
  const mockState = makeFakeState();
  mockState.MODALS.isReviewModalSuccessActive = true;
  const { withStoreComponent, mockStore } = withStore(<ModalReviewSuccess />, mockState);
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

  it('should dispatch "setIsReviewModalSuccessActive" when push returnButton',

    async () => {
      const expectedReturnButtonId = 'modalReviewSuccessReturnButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedReturnButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsReviewModalSuccessActive.type,
      ]);

    });

  it('should dispatch "setIsReviewModalSuccessActive" when push closeButton',
    async () => {
      const expectedCloseButtonId = 'modalReviewCloseButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedCloseButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsReviewModalSuccessActive.type,
      ]);

    });

});
