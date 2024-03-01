import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { FilterCategory } from './filter-category';

describe('Component: FilterCategory', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'filterCategoryElement';

    const { withStoreComponent } = withStore(<FilterCategory/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
