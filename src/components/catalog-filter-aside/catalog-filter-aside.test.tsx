import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { CatalogFilterAside } from './catalog-filter-aside';
import { makeFakeState } from '../../utils/mocks';

describe('Component: CatalogFilterAside', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElementId = 'catalogFilterAsideDivElement';

    const { withStoreComponent } = withStore(<CatalogFilterAside/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElementId)).toBeInTheDocument();
  });

});
