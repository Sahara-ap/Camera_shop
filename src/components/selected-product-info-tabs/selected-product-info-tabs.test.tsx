import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-components';
import { makeFakeSelectedCard } from '../../utils/mocks';
import { SelectedProductInfoTabs } from './selected-product-info-tabs';

describe('Component: SelectedProductInfoTabs', () => {
  const mockSelectedCard = makeFakeSelectedCard();
  const { withStoreComponent, } = withStore(<SelectedProductInfoTabs info={mockSelectedCard}/>);
  const preparedComponent = withHistory(withStoreComponent);

  it('should render correctly', () => {

    const expectedTextList = /Характеристики/;
    const expectedText = /Описание/;
    const expectedListButtonId = 'infoTabListButton';
    const expectedTextButtonId = 'infoTabTextButton';

    render(preparedComponent);

    expect(screen.getByText(expectedTextList)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedListButtonId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedTextButtonId)).toBeInTheDocument();
  });


});
