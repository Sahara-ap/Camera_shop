import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-components';
import { makeFakeState } from '../../../utils/mocks';
import { SearchMain } from './search-main';

describe('Component: SearchMain', () => {

  it('should render correctly', () => {
    const mockState = makeFakeState();
    const {withStoreComponent} = withStore(<SearchMain />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    const expectedDivElementId = 'searchMainDiv';

    render(preparedComponent);

    expect(screen.getByTestId(expectedDivElementId)).toBeInTheDocument();
  });

});
