import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import { Header } from './header';
import { AppRoute } from '../../consts';

describe('Component: Header', () => {

  it('should render correctly', () => {
    const mockPage = AppRoute.Catalog;
    const expectedElement = 'headerDivElement';
    const expectedText = /Каталог/;

    const preparedComponent = withHistory(<Header page={mockPage}/>);
    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
