import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { CatalogSort } from './catalog-sort';
import { makeFakeState } from '../../utils/mocks';

describe('Component: CatalogSort', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElement = 'catalogSortDiv';
    const expectedText = 'Сортировать:';


    const { withStoreComponent } = withStore(<CatalogSort/>, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
