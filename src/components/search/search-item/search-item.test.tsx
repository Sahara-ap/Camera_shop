import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-components';
import { makeFakeCard } from '../../../utils/mocks';
import { SearchItem } from './search-item';

describe('Component: SearchItem', () => {

  it('should render correctly', () => {
    const mockListItem = makeFakeCard();
    const mockIsSelected = true;
    const preparedComponent = withHistory(<SearchItem item={mockListItem} isSelected={mockIsSelected}/>);

    const expectedLiElementId = 'searchItemElement';

    render(preparedComponent);

    expect(screen.getByTestId(expectedLiElementId)).toBeInTheDocument();
  });

});
