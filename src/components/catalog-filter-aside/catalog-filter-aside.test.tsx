import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { CatalogFilterAside } from './catalog-filter-aside';

describe('Component: CatalogFilterAside', () => {

  it('should render correctly', () => {
    const expectedText = 'Видеокамера';

    const { withStoreComponent } = withStore(<CatalogFilterAside />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
