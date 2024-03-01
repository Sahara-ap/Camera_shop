import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { extractActionTypes, makeFakeState } from '../../utils/mocks';
import { SelectedProductInfo } from './selected-product-info';
import userEvent from '@testing-library/user-event';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';

describe('Component: SelectedProductInfo', () => {
  const mockState = makeFakeState();
  const { withStoreComponent, mockStore } = withStore(<SelectedProductInfo />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const expectedText = /Рейтинг/;
    const expectedAddButtonId = 'selectedProductInfoAddButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedAddButtonId)).toBeInTheDocument();
  });

  it('should dispatch "setIsBuyProductActive" action when push add-button',
    async () => {
      const expectedAddButtonId = 'selectedProductInfoAddButton';

      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedAddButtonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsBuyProductActive.type,
      ]);

    });

});
