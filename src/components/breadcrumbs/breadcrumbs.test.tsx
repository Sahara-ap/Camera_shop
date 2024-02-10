import { withHistory } from '../../utils/mock-components';
import { Breadcrumbs } from './breadcrumbs';
import { render, screen } from '@testing-library/react';

describe('Component: breadcrumbs', () => {
  it('should render correctly', () => {
    const expectedDivId = 'brewadcrumbsDivElement';
    const expectedMainText = /Главная/;
    const expectedCatalogText = /Каталог/;
    const mockPageProp = 'catalog';
    const mockProductNameProp = 'name';


    const preparedComponent = withHistory(<Breadcrumbs page={mockPageProp} productName={mockProductNameProp}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedDivId)).toBeInTheDocument();
    expect(screen.getByText(expectedMainText)).toBeInTheDocument();
    expect(screen.getByText(expectedCatalogText)).toBeInTheDocument();

  });
});
