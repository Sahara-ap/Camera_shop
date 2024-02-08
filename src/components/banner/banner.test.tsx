import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-components';
import { makeFakeSelectedCard } from '../../utils/mocks';
import { Banner } from './banner';

describe('Component: banner', () => {
  it('should render correctly', () => {
    const expectedText = 'Новинка!';
    const expectedAltText = 'баннер';
    const mockProps = makeFakeSelectedCard();
    const preparedComponent = withHistory(<Banner card={mockProps}/>);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();

  });
});
