import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeSimilarAndAppSlice } from '../../utils/mocks';
import { SelectedProductSimilar } from './selected-product-similar';

describe('Component: SelectedProductSimilar', () => {
  const mockState = makeFakeSimilarAndAppSlice();
  const { withStoreComponent } = withStore(<SelectedProductSimilar />, mockState);
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {

    const expectedText = /Похожие товары/;

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();

  });

});
