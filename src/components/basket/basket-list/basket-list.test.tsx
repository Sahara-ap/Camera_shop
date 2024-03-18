import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeBasketList, makeFakeState } from '../../../utils/mocks';
import { BasketList } from './basket-list';

describe('Component: BasketList', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const mockProps = makeFakeBasketList();
    const expectedElementId = 'basketListDiv';

    const { withStoreComponent } = withStore(<BasketList basketList={mockProps} />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
