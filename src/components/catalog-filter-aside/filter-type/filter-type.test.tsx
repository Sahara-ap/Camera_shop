import { render, screen } from '@testing-library/react';
import { FilterType } from './filter-type';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';

describe('Component: FilterType', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'filterTypeElement';

    const { withStoreComponent } = withStore(<FilterType/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
