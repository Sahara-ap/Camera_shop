import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { BasketPromocode } from './basket-promocode';

describe('Component: BasketPromocode', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'basketPromocodeDiv';

    const { withStoreComponent } = withStore(<BasketPromocode/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
