import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-components';
import { makeFakeCardsAndProductSlice } from '../../utils/mocks';
import { Loading } from './loading';

describe('Component: Loading', () => {

  it('should render correctly', () => {
    const expectedAltText = /Preloader/;

    const mockState = makeFakeCardsAndProductSlice();
    const {withStoreComponent} = withStore(<Loading />, mockState);
    mockState.CARDS.isCamerasLoading = true;

    render(withStoreComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });

});
