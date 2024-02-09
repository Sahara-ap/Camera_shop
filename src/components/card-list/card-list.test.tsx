import { render, screen } from '@testing-library/react';
import { makeFakeCards } from '../../utils/mocks';
import { CardList } from './card-list';
import { withHistory, withStore } from '../../utils/mock-components';

describe('Component: CardList', () => {

  it('should render correctly', () => {
    const expectedDivId = 'divElement';

    const mockPageProp = 'catalog';
    const mockCardsProp = makeFakeCards();
    const { withStoreComponent } = withStore(<CardList cards={mockCardsProp} page={mockPageProp} />);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedDivId)).toBeInTheDocument();
  });

});
