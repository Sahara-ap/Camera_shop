import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { FilterLevel } from './filter-level';

describe('Component: FilterLevel', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'filterLevelElement';

    const { withStoreComponent } = withStore(<FilterLevel/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
