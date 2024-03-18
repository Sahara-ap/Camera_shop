import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { BasketSummary } from './basket-summary';

describe('Component: BasketSummary', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'basketSummaryDiv';

    const { withStoreComponent } = withStore(<BasketSummary/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
