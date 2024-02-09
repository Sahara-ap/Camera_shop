import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-components';
import { makeFakeState } from '../../utils/mocks';
import { ModalReview } from './modal-review';

describe('Component: ModalReview', () => {

  it('should render correctly', () => {
    const expectedText = /Ваше имя/;
    const mockState = makeFakeState();
    mockState.MODALS.isReviewModalActive = true;

    const { withStoreComponent } = withStore(<ModalReview />, mockState);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
