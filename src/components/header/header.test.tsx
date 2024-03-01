import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { Header } from './header';
import { AppRoute } from '../../consts';
import { makeFakeState } from '../../utils/mocks';

describe('Component: Header', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const mockPage = AppRoute.Catalog;
    const expectedElement = 'headerDivElement';
    const expectedText = /Каталог/;

    const {withStoreComponent} = withStore(<Header page={mockPage} />, mockState);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
