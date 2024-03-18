import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeBasketItem } from '../../../utils/mocks';
import { BasketItem } from './basket-item';

describe('Component: BasketItem', () => {

  it('should render correctly', () => {
    const mockProps = makeFakeBasketItem();
    const expectedElementId = 'basketItemLi';

    const { withStoreComponent } = withStore(<BasketItem card={mockProps} />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
