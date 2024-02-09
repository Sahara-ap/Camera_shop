import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { CatalogPagination } from './catalog-pagination';

describe('Component: CatalogPagination', () => {

  it('should render correctly', () => {
    const expectedElement = 'catalogPaginationDiv';
    const mockTotalPages = 1;
    const mockpageNumber = 1;
    const mockCb = vi.fn();

    const { withStoreComponent } = withStore(<CatalogPagination totalPages={mockTotalPages} pageNumber={mockpageNumber} onPaginationClick={mockCb}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
  });

});
