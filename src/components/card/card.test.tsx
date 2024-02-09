import { withHistory, withStore } from '../../utils/mock-components';
import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { extractActionTypes, makeFakeCard } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { setSelectedCamera } from '../../store/selected-card-data-store/selected-card-data-slice';
import { setIsBuyProductActive } from '../../store/modal-windows-store/modal-windows-slice';

describe('Component: Card', () => {
  const mockPageProp = 'catalog';
  const mockCardProp = makeFakeCard();
  const { withStoreComponent, mockStore } = withStore(<Card cardData={mockCardProp} page={mockPageProp} />);
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {
    const expectedText = 'Купить';
    const buttonId = 'buttonElement';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(buttonId)).toBeInTheDocument();
  });

  it('should dispatch "setIsBuyProductActive" action and "setSelectedCamera" action  when push buy-button',
    async () => {
      const buttonId = 'buttonElement';

      render(preparedComponent);

      await userEvent.click(screen.getByTestId(buttonId));
      const actionTypes = extractActionTypes(mockStore.getActions());

      expect(actionTypes).toEqual([
        setIsBuyProductActive.type,
        setSelectedCamera.type,
      ]);

    });
});
