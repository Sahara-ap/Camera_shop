import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { BasketOrder } from './basket-order';

describe('Component: BasketOrder', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'basketOrderDiv';

    const { withStoreComponent } = withStore(<BasketOrder/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
