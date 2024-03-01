import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-components';
import { extractActionTypes, makeFakeState } from '../../utils/mocks';
import { ModalReview } from './modal-review';
import userEvent from '@testing-library/user-event';
import { setIsReviewModalActive } from '../../store/modal-windows-store/modal-windows-slice';

describe('Component: ModalReview', () => {
  const mockState = makeFakeState();
  mockState.MODALS.isReviewModalActive = true;
  const { withStoreComponent, mockStore } = withStore(<ModalReview />, mockState);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it('should render correctly', () => {
    const expectedText = /Ваше имя/;
    const nameTestId = 'nameElement';
    const advantageTestId = 'advantageElement';
    const disadvantageTestId = 'disadvantageElement';
    const commentTestId = 'commentElement';
    const submitButtonTestId = 'submitButtonElement';
    const closeButtonTestId = 'closeButtonElement';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(nameTestId)).toBeInTheDocument();
    expect(screen.getByTestId(advantageTestId)).toBeInTheDocument();
    expect(screen.getByTestId(disadvantageTestId)).toBeInTheDocument();
    expect(screen.getByTestId(commentTestId)).toBeInTheDocument();
    expect(screen.getByTestId(submitButtonTestId)).toBeInTheDocument();
    expect(screen.getByTestId(closeButtonTestId)).toBeInTheDocument();
  });

  it('should render correctly when user type name, password, advantage, disadvantage and comment',
    async () => {
      const nameTestId = 'nameElement';
      const advantageTestId = 'advantageElement';
      const disadvantageTestId = 'disadvantageElement';
      const commentTestId = 'commentElement';

      const expectedNameValue = 'user';
      const expectedAdvantageValue = 'text1';
      const expectedDisadvantageValue = 'text2';
      const expectedCommentValue = 'alotoftext';

      render(withStoreComponent);

      await userEvent.type(
        screen.getByTestId(nameTestId),
        expectedNameValue
      );
      await userEvent.type(
        screen.getByTestId(advantageTestId),
        expectedAdvantageValue
      );
      await userEvent.type(
        screen.getByTestId(disadvantageTestId),
        expectedDisadvantageValue
      );
      await userEvent.type(
        screen.getByTestId(commentTestId),
        expectedCommentValue
      );

      expect(screen.getByDisplayValue(expectedNameValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedAdvantageValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedDisadvantageValue)).toBeInTheDocument();
      expect(screen.getByDisplayValue(expectedCommentValue)).toBeInTheDocument();
    });

  it('should dispatch "setIsReviewModalActive" action when push closeButton',
    async () => {
      const closeButtonTestId = 'closeButtonElement';

      render(withStoreComponent);

      await userEvent.click(screen.getByTestId(closeButtonTestId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsReviewModalActive.type,
      ]);

    });

});
