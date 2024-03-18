import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { makeFakeState } from '../../utils/mocks';
import { ModalAddItemSuccess } from './modal-add-item-success';

describe('Component: ModalAddItemSuccess', () => {
  const mockState = makeFakeState();
  const mockHandleClick = vi.fn();
  mockState.MODALS.isReviewModalSuccessActive = true;
  const { withStoreComponent, mockStore } = withStore(<ModalAddItemSuccess onLinkClick={mockHandleClick} />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  beforeEach(() => {
    mockStore.clearActions();
  });

  it('should render correctly', () => {

    const expectedText = /Товар успешно добавлен в корзину/;
    const expectedGoOnLinkId = 'goOnLink';
    const expectedCloseButtonId = 'closeModalButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedGoOnLinkId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedCloseButtonId)).toBeInTheDocument();
  });


  it('should call "closeModal" when click goOnLink',
    async () => {
      mockHandleClick.mockReset();
      const expectedGoOnLinkId = 'goOnLink';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedGoOnLinkId));

      expect(mockHandleClick).toBeCalledTimes(1);

    });
  it('should call "closeModal" when click closeButton',
    async () => {
      mockHandleClick.mockReset();
      const expectedCloseButtonId = 'closeModalButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedCloseButtonId));

      expect(mockHandleClick).toBeCalledTimes(1);

    });

});
