import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import userEvent from '@testing-library/user-event';
import { ModalBasketOrder } from './modal-basket-order';
import { LoadingDataStatus } from '../../consts';

describe('Component: ModalReviewSuccess', () => {
  const mockHandleClick = vi.fn();

  it('should render correctly SuccessText and buttons', () => {

    const mockSendingStatus = LoadingDataStatus.Success;
    const { withStoreComponent } = withStore(<ModalBasketOrder onClick={mockHandleClick} sendigOrderStatus={mockSendingStatus} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    const expectedText = /Спасибо за покупку/;
    const expectedReturnButtonId = 'returnModalButton';
    const expectedCloseButtonId = 'closeModalButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedReturnButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedCloseButtonId)).toBeInTheDocument();
  });

  it('should render MistakeText and buttons', () => {
    const mockSendingStatus = LoadingDataStatus.Error;
    const { withStoreComponent } = withStore(<ModalBasketOrder onClick={mockHandleClick} sendigOrderStatus={mockSendingStatus} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    const expectedText = /Ошибка/;
    const expectedReturnButtonId = 'returnModalButton';
    const expectedCloseButtonId = 'closeModalButton';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedReturnButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedCloseButtonId)).toBeInTheDocument();
  });


  it('should call "closeModal" when click closeModalButton',
    async () => {
      mockHandleClick.mockReset();

      const mockSendingStatus = LoadingDataStatus.Success;
      const { withStoreComponent } = withStore(<ModalBasketOrder onClick={mockHandleClick} sendigOrderStatus={mockSendingStatus} />, {});
      const preparedComponent = withHistory(withStoreComponent);

      const expectedReturnButtonId = 'closeModalButton';
      render(preparedComponent);

      await userEvent.click(screen.getByTestId(expectedReturnButtonId));

      expect(mockHandleClick).toBeCalledTimes(1);

    });


});
