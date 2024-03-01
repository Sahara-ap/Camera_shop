import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { FilterPrice } from './filter-price';

describe('Component: FilterPrice', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'filterPriceElement';

    const { withStoreComponent } = withStore(<FilterPrice />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
