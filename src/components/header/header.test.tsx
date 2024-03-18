import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { Header } from './header';
import { makeFakeState } from '../../utils/mocks';

describe('Component: Header', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const expectedElement = 'headerDivElement';
    const expectedText = /Каталог/;

    const {withStoreComponent} = withStore(<Header />, mockState);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
