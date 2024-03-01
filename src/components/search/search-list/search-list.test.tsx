import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-components';
import { makeFakeCards } from '../../../utils/mocks';
import { SearchList } from './search-list';

describe('Component: SearchList', () => {

  it('should render correctly', () => {
    const mockList = makeFakeCards();
    const mockSearchLineIndex = 1;
    const preparedComponent = withHistory(<SearchList list={mockList} searchLineIndex={mockSearchLineIndex}/>);

    const expectedUlElementId = 'searchListUl';

    render(preparedComponent);

    expect(screen.getByTestId(expectedUlElementId)).toBeInTheDocument();
  });

});
