import { render, screen } from '@testing-library/react';
import { makeFakeState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-components';
import { ModalReviewWrapper } from './modal-review-wrapper';

describe('Component: ModalReviewWrapper', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    mockState.MODALS.isReviewModalActive = true;
    mockState.MODALS.isReviewModalSuccessActive = true;

    const expectedFirstText = /Ваше имя/;
    const expectedSecondText = 'Спасибо за отзыв';

    const { withStoreComponent } = withStore(<ModalReviewWrapper />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedFirstText)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondText)).toBeInTheDocument();
  });

});
