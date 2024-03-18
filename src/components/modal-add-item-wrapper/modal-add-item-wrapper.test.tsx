import { render, screen } from '@testing-library/react';
import { makeFakeState } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-components';
import { ModalAddItemWrapper } from './modal-add-item-wrapper';

describe('Component: ModalAddItemWrapper', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    mockState.MODALS.isBuyProductActive = true;
    mockState.MODALS.isAddProductToCartSuccess = true;

    const expectedFirstText = /Добавить товар в корзину/;
    const expectedSecondText = /Товар успешно добавлен в корзину/;

    const { withStoreComponent } = withStore(<ModalAddItemWrapper />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedFirstText)).toBeInTheDocument();
    expect(screen.getByText(expectedSecondText)).toBeInTheDocument();
  });

});

