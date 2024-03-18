import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { extractActionTypes, makeFakeState } from '../../utils/mocks';
import { ModalBasketRemoveItem } from './modal-basket-remove-item';
import { setIsRemoveFromBasketActive } from '../../store/modal-windows-store/modal-windows-slice';
import { deleteBasketItem } from '../../store/basket-store/basket-slice';

describe('Component: ModalBasketRemoveItem', () => {
  const mockState = makeFakeState();
  const mockIsActiveProps = true;
  mockState.MODALS.isRemoveFromBasketActive = true;

  const { withStoreComponent, mockStore } = withStore(<ModalBasketRemoveItem isActive={mockIsActiveProps} />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  const mockHandleClick = vi.fn();

  beforeEach(() => {
    mockStore.clearActions();
    mockHandleClick.mockReset();
  });

  it('should render correctly', () => {
    const expectedText = /Удалить этот товар/;
    const expectedCloseButtonId = 'closeModalButton';
    const expectedDeleteButtonId = 'deleteButton';
    const expectedLinkId = 'goOnLink';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedCloseButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedDeleteButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedLinkId)).toBeInTheDocument();
  });


  it('should dispatch "setIsRemoveFromBasketActive" action when click closeButton',
    async () => {
      const expectedCloseButtonId = 'closeModalButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedCloseButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsRemoveFromBasketActive.type
      ]);
    });
  it('should dispatch "setIsRemoveFromBasketActive" action when click goOnLink',
    async () => {
      const expectedLinkId = 'goOnLink';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedLinkId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsRemoveFromBasketActive.type
      ]);
    });
  it('should dispatch "deleteBasketItem" and setIsRemoveFromBasketActive actions when click deleteButton',
    async () => {
      const expectedDeleteButtonId = 'deleteButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedDeleteButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        deleteBasketItem.type,
        setIsRemoveFromBasketActive.type
      ]);
    });

});
