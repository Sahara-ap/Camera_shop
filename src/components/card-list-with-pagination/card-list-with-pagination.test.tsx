import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { CardListWithPagination } from './card-list-with-pagination';
import { makeFakeState } from '../../utils/mocks';

describe('Component: CardListWithPagination', () => {

  it('should render correctly', () => {
    const expectedElement = 'divElement';

    const mockState = makeFakeState();
    const { withStoreComponent } = withStore(<CardListWithPagination />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedElement)).toBeInTheDocument();
  });

});
