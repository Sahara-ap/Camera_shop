import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeState } from '../../utils/mocks';
import { BannerList } from './banner-list';

describe('Component: banner-list', () => {
  it('should render correctly', () => {
    const expectedDivId = 'bannerListDiv';

    const mockState = makeFakeState();
    const {withStoreComponent} = withStore(<BannerList />, mockState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedDivId)).toBeInTheDocument();

  });
});
